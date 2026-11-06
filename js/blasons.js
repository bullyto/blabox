/* Dix silhouettes et dix insignes en relief, utilisables à 24 px comme à 240 px. */
const BLAZON030=(()=>{const shapes=[
'M16 12 Q50 3 84 12 L82 53 Q79 77 50 94 Q21 77 18 53Z',
'M24 9 H76 L90 25 L84 65 L50 94 L16 65 L10 25Z',
'M50 5 L91 48 L50 95 L9 48Z',
'M50 6 A43 43 0 1 1 49.9 6Z',
'M18 8 H82 V53 Q82 82 50 95 Q18 82 18 53Z',
'M31 5 H69 L90 27 V72 L69 94 H31 L10 72 V27Z',
'M12 12 L30 18 L50 7 L70 18 L88 12 L86 58 Q80 80 50 94 Q20 80 14 58Z',
'M20 6 H80 V23 L89 32 V67 L72 87 L50 95 L28 87 L11 67 V32 L20 23Z',
'M50 5 L84 20 L91 56 L73 83 L50 95 L27 83 L9 56 L16 20Z',
'M15 8 H85 L88 60 L73 82 L50 95 L27 82 L12 60Z'];
const names=['Écu royal','Écu octogonal','Losange','Médaillon','Rempart','Octogone','Couronne','Forteresse','Cristal','Bannière'];
const signs=[
['Épée','<path d="M48 22L54 16L58 22L55 55L64 61L59 66L53 62L51 78H45L47 62L40 65L36 60L46 55Z"/>'],
['Tour','<path d="M29 27H39V36H45V23H55V36H61V27H71V44L65 50V77H35V50L29 44Z"/><path d="M46 77V63Q50 56 54 63V77" fill="#483624"/>'],
['Étoile','<path d="M50 19L59 38L80 41L65 56L69 77L50 67L31 77L35 56L20 41L41 38Z"/>'],
['Aigle','<path d="M50 34L59 24L57 41L80 29L74 50L63 56L74 62L58 65L50 79L42 65L26 62L37 56L26 50L20 29L43 41L41 24Z"/>'],
['Lion','<path d="M34 24L43 19L50 24L57 19L66 24L75 40L71 61L61 73L50 81L39 73L29 61L25 40Z"/><path d="M36 40L43 44M64 40L57 44M44 57L50 61L56 57M50 62V68" fill="none" stroke="#5a3620" stroke-width="4"/>'],
['Enclume','<path d="M25 33H77L69 45H59L55 58L64 66V74H35V66L44 58L40 46H29L18 37Z"/>'],
['Chêne','<path d="M44 77V59Q24 64 24 48Q14 38 28 31Q27 16 43 22Q50 11 57 22Q73 16 72 31Q86 38 76 48Q76 64 56 59V77Z"/>'],
['Éclair','<path d="M50 18H69L56 42H72L37 82L46 56H29Z"/>'],
['Loup','<path d="M26 22L43 33L50 29L57 33L74 22L69 56L58 72L50 80L42 72L31 56Z"/><path d="M35 44L43 47M65 44L57 47M44 61L50 65L56 61" stroke="#51331d" stroke-width="4" fill="none"/>'],
['Cristal','<path d="M36 25H64L76 42L50 79L24 42Z"/><path d="M24 42H76M36 25L42 42L50 79L58 42L64 25M42 42H58" stroke="#80612d" stroke-width="2.5" fill="none"/>']];let serial=0;
function svg(e={},colors=RULES030.COLORS,{symbolOnly=false}={}){let s=Math.max(0,Math.min(9,Number(e.shape)||0)),i=Math.max(0,Math.min(9,Number(e.insignia)||0)),color=colors[Math.max(0,Math.min(9,Number(e.color)||0))]||colors[0],id='blz'+(++serial),d=shapes[s];return '<svg class="blazon030" viewBox="0 0 100 100" role="img" aria-label="'+names[s]+' · '+signs[i][0]+'" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="'+id+'g" x2=".25" y2="1"><stop stop-color="#fff4b4"/><stop offset=".2" stop-color="#f5cb65"/><stop offset=".48" stop-color="#ad6721"/><stop offset=".65" stop-color="#f9d67d"/><stop offset="1" stop-color="#8b4b1a"/></linearGradient><linearGradient id="'+id+'l" x2=".3" y2="1"><stop stop-color="#fff" stop-opacity=".4"/><stop offset=".48" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#00141f" stop-opacity=".65"/></linearGradient></defs>'+(!symbolOnly?'<path d="'+d+'" fill="#152b34" stroke="#142b35" stroke-width="4" transform="translate(0 2)"/><path d="'+d+'" fill="url(#'+id+'g)" stroke="#623b1b" stroke-width="1.5"/><path d="'+d+'" fill="'+color+'" transform="translate(50 50) scale(.82) translate(-50 -50)" stroke="#6d441c" stroke-width="2"/><path d="'+d+'" fill="url(#'+id+'l)" transform="translate(50 50) scale(.82) translate(-50 -50)"/><path d="'+d+'" fill="none" stroke="#fff3b7" stroke-width="1.2" transform="translate(50 50) scale(.94) translate(-50 -50)"/>':'')+'<g fill="#4c321d" stroke="#3e2d21" stroke-width="3" stroke-linejoin="round" transform="translate(1 2)">'+signs[i][1]+'</g><g fill="url(#'+id+'g)" stroke="#7c4c22" stroke-width="1.5" stroke-linejoin="round">'+signs[i][1]+'</g></svg>';}
return {shapes,names,signs,svg};})();
