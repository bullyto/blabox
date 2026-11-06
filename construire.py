#!/usr/bin/env python3
"""Réassembler les sources après modification. Inutile pour lancer la démo livrée."""
from pathlib import Path
import re,json
root=Path(__file__).resolve().parent
version=json.loads((root/'build/configuration.json').read_text())['version']
html=(root/'build/entree.html.in').read_text()
style=[]
for m in re.finditer(r'<link rel="stylesheet" href="([^"?]+)[^"]*">|<style>(.*?)</style>',html,re.S):
    style.append((root/m.group(1)).read_text() if m.group(1) else m.group(2))
css_name=f'css/blabox-{version}.css'
(root/css_name).write_text('\n'.join(style))
html=re.sub(r'<link rel="stylesheet"[^>]+>|<style>.*?</style>','',html,flags=re.S)
html=html.replace('</head>',f'<link rel="stylesheet" href="{css_name}"></head>')
scripts=[p for p in re.findall(r'<script src="([^"?]+)[^"]*"></script>',html) if p!='js/porte.js']
js_name=f'js/blabox-{version}.js'
content='\n;\n'.join('// Source intégrée : '+p+'\n'+(root/p).read_text() for p in scripts)
content+=f'\nwindow.BLABOX_READY=true;document.documentElement.dataset.blaboxReady="{version}";window.dispatchEvent(new Event("blabox-ready"));\n'
(root/js_name).write_text(content)
for p in scripts:
    html=re.sub(r'<script src="'+re.escape(p)+r'(?:\?[^"]*)?"></script>','',html)
html=html.replace('</body>',f'<script src="js/stockage0327.js"></script><script>BlaboxStorage.ready.then(function(){{var s=document.createElement("script");s.src="{js_name}";document.body.append(s);}});</script></body>')
(root/'index.html').write_text(html)
print('Démo assemblée : '+version)
