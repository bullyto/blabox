/* Fonctions pures : progression, limites et publication défensive. */
(function(root){'use strict';
const speedMax=(remaining,other,seconds,stock)=>Math.max(0,Math.min(stock,Math.ceil(Math.max(0,remaining-other)/seconds)));
const aids=level=>({energy:level>=2&&level<=5,reserves:level>=2&&level<=6,speedups:level>=2&&level<=5?10:0});
function defense(saved,live,heroLevels,context){const out=structuredClone(saved);const byId=new Map(['buildings','defenses','traps','barricades','decorations'].flatMap(k=>(live[k]||[]).map(o=>[o.id,o])));for(const k of ['buildings','defenses','traps','barricades','decorations'])for(const o of out[k]||[]){const current=byId.get(o.id);if(current)o.level=current.level;delete o.underConstruction;}for(const g of out.garrisons||[]){g.level=heroLevels[g.hero]||g.level;delete g.underConstruction;}out.bonusContext326=structuredClone(context);return out;}
const api={speedMax,aids,defense,mineBoost:l=>l>=1&&l<=4,tutorialAllowed:l=>l<7};if(typeof module!=='undefined')module.exports=api;root.Blabox0329=api;
})(typeof window==='undefined'?globalThis:window);
