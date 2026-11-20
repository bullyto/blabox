/* 0.30.6 — durée globale : 300 jours avec six ouvriers, scénario sans bonus. */
const CONSTRUCTION_BALANCE_0306=(()=>{'use strict';
 const FACTOR=1.3795971274375916,FIRST_TARGET=14,DAY=86400;
 const baseSeconds=PreviewGame.constructionSeconds023;
 function seconds(type,to){const original=baseSeconds(type,to);return to>=FIRST_TARGET&&to<=20&&!type.startsWith('decor-')?Math.max(1,Math.round(original*FACTOR)):original;}
 // Toutes les confirmations du jeu passent par v06BuildQuote ; le tarif et
 // la durée reçus par les bonus Tiko/clan partagent ainsi le même barème.
 for(const key of ['constructionQuote','v06BuildQuote']){const quote=PreviewGame[key];PreviewGame[key]=function(type,from){const q=quote(type,from);return type.startsWith('decor-')?q:{...q,durationSeconds:seconds(type,q.to)};};}
 PreviewGame.constructionSeconds023=seconds;
 function simulate(workerCount=2,scale=PreviewGame.CONSTRUCTION_SCALE_023){
  if(!Number.isFinite(scale)||scale<=0)throw Error('Échelle de construction invalide.');
  const duration=(type,to)=>{if(scale===PreviewGame.CONSTRUCTION_SCALE_023)return seconds(type,to);const w=PreviewGame.CONSTRUCTION_WEIGHTS_023,early=to<=4,base=early?Math.round([0,1800,1800,8271,20181][to]/4):Math.round(3600*1.34**(to-5)*(w[type]??1)*scale),m=PreviewGame.constructionLevelMultiplier026(to);let old;if(['centre-bataille','batiment-alliance'].includes(type)){const fastest=early?base:Math.round(3600*1.34**(to-5)*.75*scale);old=Math.max(1,Math.round(fastest*m*.65));}else old=type!=='barricade'&&!type.startsWith('trap-')?Math.max(1,Math.round(base*m)):base;return Math.max(1,Math.round(old*(to>=FIRST_TARGET&&to<=20?FACTOR:1)));};
  if(!Number.isInteger(workerCount)||workerCount<1||workerCount>20)throw Error('Nombre d’ouvriers invalide.');
  const types=[...PreviewGame.BUILDINGS,...PreviewGame.DEFENSES,...PreviewGame.TRAPS,PreviewGame.BARRICADE];
  const instances=Object.fromEntries(types.map(t=>[t.id,[]]));let now=0,floors=3;const rows=[];
  const floorTime=floor=>{const unlock=PreviewGame.PROGRESSION_V06.extraFloorUnlocks[floor-1];return unlock<=4?450:Math.round(3600*1.34**(unlock-5)*1.5*scale);};
  for(let target=1;target<=20;target++){
   const started=now,core=instances.core[0]||{level:0};instances.core=[core];
   if(core.level<target){now+=duration('core',target);core.level=target;}
   const priority=['academie','atelier-monstres','forge'];
   for(const group of [types.filter(t=>priority.includes(t.id)),types.filter(t=>t.id!=='core'&&!priority.includes(t.id))]){
    const chains=[];
    for(const t of group){const unlock=PreviewGame.PROGRESSION_V06.unlocks[t.id]??t.unlock??1;if(unlock>target)continue;
     const count=PreviewGame.v06InstanceLimit(t.id,target);while(instances[t.id].length<count)instances[t.id].push({level:0});
     for(const unit of instances[t.id]){const jobs=[];for(let n=unit.level+1;n<=target;n++)jobs.push(duration(t.id,n));if(jobs.length)chains.push({type:t.id,unit,jobs});}
    }
    const ends=Array(workerCount).fill(now);
    while(chains.some(c=>c.jobs.length)){const worker=ends.indexOf(Math.min(...ends));const next=chains.filter(c=>c.jobs.length).sort((a,b)=>b.jobs.reduce((s,n)=>s+n,0)-a.jobs.reduce((s,n)=>s+n,0))[0];ends[worker]=Math.max(ends[worker],next.ready||now)+next.jobs.shift();next.ready=ends[worker];if(!next.jobs.length)next.unit.level=target;}
    now=Math.max(...ends);
   }
   while(floors<10&&target>=PreviewGame.PROGRESSION_V06.extraFloorUnlocks[floors-1]){now+=floorTime(floors);floors++;}
   rows.push({level:target,seconds:now-started,days:(now-started)/DAY,cumulativeDays:now/DAY});
  }
  return {workers:workerCount,rows,totalSeconds:now,totalDays:now/DAY,total:rows.filter(r=>r.level>=5).reduce((s,r)=>s+r.seconds,0)};
 }
 // Signature historique conservée ; son résultat reste basé sur deux ouvriers.
 PreviewGame.simulateConstructionPlan023=function(scale=PreviewGame.CONSTRUCTION_SCALE_023){return simulate(2,scale);};
 PreviewGame.simulateProgression=(scale=PreviewGame.CONSTRUCTION_SCALE_023)=>simulate(2,scale).total;
 function means(){return Array.from({length:19},(_,i)=>{const to=i+2,meanSeconds=PreviewGame.BUILDINGS.reduce((s,b)=>s+seconds(b.id,to),0)/PreviewGame.BUILDINGS.length;return {from:to-1,to,meanSeconds,meanDays:meanSeconds/DAY};});}
 return Object.freeze({version:'0.30.6',factor:FACTOR,firstTarget:FIRST_TARGET,targetWorkers:6,targetDays:300,seconds,simulate,means});
})();
