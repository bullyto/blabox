#!/usr/bin/env python3
"""Contrôles reproductibles hors navigateur : python tools/verify.py. Nécessite Pillow et Node."""
from pathlib import Path
import json,re,subprocess,hashlib,collections,csv,mimetypes,sys
from PIL import Image
root=Path(__file__).resolve().parent.parent
out=root/'docs/audit';out.mkdir(parents=True,exist_ok=True)
errors=[];warnings=[];sizes={};hashes=collections.defaultdict(list);rows=[]
active=[p for p in root.rglob('*') if p.is_file() and 'corbeil' not in p.relative_to(root).parts and 'audit' not in p.relative_to(root).parts]
source=[p for p in active if p.suffix in ['.js','.css','.html','.in','.json','.py','.bat'] and not p.name.startswith('blabox-') and p.name not in ['game.js','game.css'] and 'docs' not in p.relative_to(root).parts]
texts={str(p.relative_to(root)):p.read_text() for p in source}
for p in active:
 rel=str(p.relative_to(root))
 if p.suffix=='.js':
  t=subprocess.run(['node','--check',str(p)],capture_output=True,text=True)
  if t.returncode:errors.append({'file':rel,'syntax':t.stderr})
 if p.suffix=='.json':
  try:json.loads(p.read_text())
  except Exception as e:errors.append({'file':rel,'json':str(e)})
 if p.suffix=='.webp':
  try:
   with Image.open(p) as im:im.load();sizes[rel]=im.size
  except Exception as e:errors.append({'file':rel,'image':str(e)})
 if p.suffix in ['.png','.jpg','.jpeg','.svg','.gif']:warnings.append({'file':rel,'format':'Image non WebP'})
 digest=hashlib.sha256(p.read_bytes()).hexdigest();hashes[digest].append(rel)
 refs=[f for f,t in texts.items() if rel in t]
 status='source ou ressource référencée' if refs else 'entrée, outil ou document autonome'
 if rel.startswith('assets/') and refs and all(Path(f).name in ['player-catalog.js','catalog.js','asset-paths.js','troop-animations.js'] for f in refs):status='catalogue/animation/alias ; usage dépendant du parcours'
 rows.append([rel,p.stat().st_size,mimetypes.guess_type(p.name)[0] or p.suffix,digest,'x'.join(map(str,sizes.get(rel,()))),status,' | '.join(refs)])
# Physical literals, excluding documents and historical records.
for f,t in texts.items():
 if f.endswith('asset-paths.js'):continue
 for ref in set(re.findall(r'assets/[a-zA-Z0-9_/.-]+\.(?:webp|mp3|json)',t)):
  if not (root/ref).is_file():errors.append({'file':f,'missing':ref})
# Dynamic identifiers resolved through the explicit registry.
s=(root/'js/system/asset-paths.js').read_text();aliases=json.JSONDecoder().raw_decode(s.split(' = ',1)[1])[0]
for k,v in aliases.items():
 if not (root/v).is_file():errors.append({'alias':k,'missing':v})
# Entry pages, including management consoles and construction template.
for rel in ['index.html','build/index.html.in','pages/createur.html','pages/administration.html']:
 t=(root/rel).read_text();base=root if '<base href="../">' in t or rel.startswith('build/') else (root/rel).parent
 for ref in re.findall(r'(?:src|href)="([^"?#]+)',t):
  if ref.startswith(('http:','https:','data:','../')) or not re.search(r'\.(js|css|webp|html)$',ref):continue
  if not (base/ref).is_file():errors.append({'entry':rel,'missing':ref})
for p in [*root.glob('css/**/*.css')]:
 for ref in re.findall(r'url\([\'"]?([^\'"\)]+)',p.read_text()):
  if ref.startswith(('http:','https:','data:','#','/')):continue
  if not (p.parent/ref).is_file():errors.append({'stylesheet':str(p.relative_to(root)),'missing':ref})
# Runtime animation frame bounds and consistent dimensions.
def constant(file,name):return json.JSONDecoder().raw_decode((root/file).read_text().split('const '+name+'=',1)[1])[0]
classes=constant('js/data/troop-animations.js','CLASSES029');models=constant('js/data/player-catalog.js','MODELS');frames=0
for cid,c in classes.items():
 missing_levels=[n for n in range(1,21) if str(n) not in c['levels']]
 if missing_levels:warnings.append({'class':cid,'missing_animation_levels':missing_levels,'note':'Absence dans la base fournie ; aucune restauration.'})
 for level,item in c['levels'].items():
  if item['file'] not in sizes:errors.append({'class':cid,'level':level,'missing':item['file']});continue
  w,h=sizes[item['file']];dims=set()
  for f in item['frames']:
   frames+=1;dims.add((f['width'],f['height']))
   if min(f['x'],f['y'])<0 or f['x']+f['width']>w or f['y']+f['height']>h:errors.append({'class':cid,'level':level,'frame':f['index'],'bounds':False})
  if len(dims)>1:errors.append({'class':cid,'level':level,'frame_dimensions':list(dims)})
for hero,h in models['HERO_ANIMATIONS_024']['heroes'].items():
 for motion,m in h['motions'].items():
  if m['file'] not in sizes:errors.append({'hero':hero,'motion':motion,'missing':m['file']});continue
  w,hh=sizes[m['file']];frames+=len(m['frames'])
  if w!=m['columns']*m['cellWidth'] or hh!=m['rows']*m['cellHeight']:errors.append({'hero':hero,'motion':motion,'atlas_size':(w,hh)})
  if len(m['frames'])>m['columns']*m['rows']:errors.append({'hero':hero,'motion':motion,'overflow':True})
# Keep levels explicitly grouped even where base art is identical.
levels={str(p.parent.relative_to(root)):len(list(p.parent.glob('niveau_*.webp'))) for p in root.glob('assets/batiments/**/niveau_01.webp')}
for f,n in levels.items():
 if n!=20:warnings.append({'building':f,'levels':n})
with (out/'inventaire.csv').open('w') as f:
 w=csv.writer(f);w.writerow(['chemin','octets','type','sha256','dimensions','statut','references']);w.writerows(sorted(rows))
duplicates=[v for v in hashes.values() if len(v)>1 and any(x.startswith('assets/') for x in v)]
(out/'doublons_exacts.json').write_text(json.dumps(duplicates,ensure_ascii=False,indent=2))
report={'errors':errors,'warnings':warnings,'files':len(active),'images_decoded':len(sizes),'dynamic_aliases':len(aliases),'frames_checked':frames,'building_families':levels,'duplicate_groups':len(duplicates),'chromium':'Voir le rapport de validation Chromium livré séparément. Ce script contrôle uniquement les fichiers et les règles.'}
(out/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2));sys.exit(bool(errors))
