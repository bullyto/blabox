/* Règles de la mise à jour 0.32.8, sans stockage ni interface. */
(function(root){'use strict';
const DAY=86400000,DURATIONS={small:10,medium:25,large:60};
function potionJob(recipe,count,inventory,now=Date.now()){if(!recipe||!DURATIONS[recipe.id])throw Error('Potion inconnue.');if(!Number.isInteger(count)||count<1||count>999)throw Error('Choisis une quantité entre 1 et 999.');if((inventory[recipe.life]||0)<count||(inventory[recipe.mana]||0)<count)throw Error('Potions de vie ou de mana insuffisantes.');const seconds=DURATIONS[recipe.id];return {...recipe,seconds,count,claimed:0,startedAt:now,endsAt:now+seconds*count*1000};}
function completed(job,now=Date.now()){if(!job.count)return now>=job.endsAt?1:0;return Math.max(0,Math.min(job.count,Math.floor((now-job.startedAt)/(job.seconds*1000))));}
function size(id){return {small:'Petite potion',medium:'Potion moyenne',large:'Grande potion'}[id]||'Potion';}
function wall(text,limit){if([...String(text)].length>limit)throw Error(limit+' caractères maximum.');return String(text).trim();}
function quota(ledger,key,day,max){const old=ledger[key],used=old?.day===day?old.used:0;if(used>=max)throw Error('Limite de '+max+' modifications atteinte pour aujourd’hui.');return {day,used:used+1};}
function validShare(row,now=Date.now()){return !!row&&row.expiresAt>now;}
function emptyPairs(layout,widthOf){const out=[];for(let floor=0;floor<layout.floors;floor++){const occupied=new Set();for(const o of [...(layout.buildings||[]),...(layout.defenses||[]),...(layout.barricades||[]),...(layout.garrisons||[]),...(layout.decorations||[])])if(o.floor===floor){const w=widthOf(o);for(let x=Math.floor(o.x);x<Math.ceil(o.x+w);x++)occupied.add(x)}for(let x=0;x<layout.slots-1;x++)if(!occupied.has(x)&&!occupied.has(x+1))out.push({floor,x,width:2});}return out;}
const api={DAY,DURATIONS,potionJob,completed,size,wall,quota,validShare,emptyPairs,shareLimit:5,shareTTL:DAY,defenseInterval:2*DAY};if(typeof module!=='undefined')module.exports=api;root.Blabox0328=api;
})(typeof window==='undefined'?globalThis:window);
