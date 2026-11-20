// Tests hors navigateur, sans dépendance npm. Ne certifie pas la mise en page.
const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert');
const root=path.resolve(__dirname,'..');const html=fs.readFileSync(path.join(root,'build/index.html.in'),'utf8');
const context={document:{baseURI:'http://localhost/'},console,Intl,Date,Math,JSON,Set,Map,structuredClone,URL,URLSearchParams,setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},localStorage:{getItem:()=>null,setItem(){}},location:{search:'',href:'http://localhost/'}};
context.window=context;context.globalThis=context;vm.createContext(context);
const executed=[];
for(const f of [...html.matchAll(/<script src="([^"?]+)/g)].map(x=>x[1]).filter(f=>!f.includes('/ui/')&&!f.includes('/system/loading'))){vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),context,{filename:f});executed.push(f);}
fs.mkdirSync(path.join(root,'docs/audit'),{recursive:true});const B=context.Blabox0330;let checks=0;
function check(name,f){f();checks++;}
const roll=values=>{let i=0;return()=>values[i++]??.99;};
const pool=[{id:'a',tier:'Commun'},{id:'b',tier:'Épique'}];
check('Aucun drop à zéro étoile',()=>{const d=B.attackDrops({attack:50,stars:0,eligible:pool},[['xp-large',100]],()=>0);assert.equal(d.potions.length,0);assert.equal(d.scroll,null);assert.equal(d.crystal,0);});
for(const attack of [1,20])check('Protection initiale '+attack,()=>{const d=B.attackDrops({attack,stars:4,eligible:pool},[['xp-large',100]],()=>0);assert.equal(d.potions.length,0);assert.equal(d.scroll,null);assert.equal(d.crystal,1);});
check('Attaque 21 : deux potions, parchemin et cristal ensemble',()=>{const d=B.attackDrops({attack:21,stars:4,eligible:pool},[['xp-large',100]],()=>0);assert.equal(d.potions.length,2);assert.equal(d.scroll,'a');assert.equal(d.crystal,1);});
for(const stars of [1,2,3,4])check('Seuil cristal '+stars,()=>{const rate=.09*stars/4;assert.equal(B.attackDrops({attack:50,stars},[],roll([1,1,1,1,1,rate-.000001])).crystal,1);assert.equal(B.attackDrops({attack:50,stars},[],roll([1,1,1,1,1,rate])).crystal,0);});
check('Cristal maximum 72 %',()=>{assert.equal(B.attackDrops({attack:50,stars:4,bonus:8},[],roll([1,1,1,1,1,.71999])).crystal,1);assert.equal(B.attackDrops({attack:50,stars:4,bonus:8},[],roll([1,1,1,1,1,.72])).crystal,0);});
check('VIP 20 augmente la potion de 0,8 point',()=>{let f=vip=>B.attackDrops({attack:21,stars:4,vip},[['xp-small',1]],roll([.015,1,1,1,1,1])).potions.length;assert.equal(f(0),0);assert.equal(f(20),1);});
check('Division du parchemin et catégorie vide',()=>{assert.equal(B.attackDrops({attack:21,stars:4,scrollCount:1,eligible:pool},[],roll([1,1,.03,0,0,1])).scroll,null);assert.equal(B.attackDrops({attack:21,stars:4,eligible:[pool[0]]},[],roll([1,1,0,.9,0,1])).scroll,null);});
check('Rareté épique indépendante',()=>assert.equal(B.attackDrops({attack:21,stars:4,eligible:pool},[],roll([1,1,0,.9,0,1])).scroll,'b'));
check('Top cinq Carnage',()=>assert.equal(JSON.stringify(B.topScores([70,60,50,40,30],80)),'[80,70,60,50,40]'));
check('Repaire vendredi 20 h Paris puis fermeture samedi 6 h',()=>{assert.equal(B.eventWindow(Date.parse('2026-11-13T18:00:00Z'),'repaire').open,false);assert.equal(B.eventWindow(Date.parse('2026-11-13T19:00:00Z'),'repaire').open,true);assert.equal(B.eventWindow(Date.parse('2026-11-14T05:00:00Z'),'repaire').open,false);});
const game=fs.readFileSync(path.join(root,'js/ui/game-interface.js'),'utf8');
const approved=game.match(/function approvedPromoArt0330\(o\)\{[\s\S]*?\n\}/)[0];
vm.runInContext(approved,context);
const kinds=['first','monthly','builders','drac','morghul','xp','rare3','speed30','speed48','xp40','castillet','xp50048','skillhalf315','epic2'];
for(const kind of kinds)check('Bannière '+kind,()=>{const p=context.approvedPromoArt0330({kind});assert(p.startsWith('assets/offres/promotions/'));assert(fs.existsSync(path.join(root,p)));});
check('Aucun ancien rendu de promotion',()=>{assert(!game.includes('const artOffer332='));assert(!game.includes('const promo333='));assert(!game.includes('drawPromoStage0330'));assert.equal((game.match(/offerArtStage0305=function/g)||[]).length,0);});
const report={status:'PASS',checks,modules_executed:executed,promotions:kinds.length,limitations:'Modules et fonctions exécutés sous Node ; interface, console navigateur, rendu et interactions non certifiés.'};
fs.writeFileSync(path.join(root,'docs/audit/tests_regles.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
