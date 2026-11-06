/* Économie et pillage 0.30.9 : règles déterministes partagées par la démo et les tests. */
const PILLAGE0308=(()=>{'use strict';
const PRODUCTION=[32,46,65,89,122,162,219,284,356,421,518,632,761,907,1069,1247,1442,1652,1879,2106],CAPACITY=[520,728,1040,1430,1950,2600,3510,4550,5720,6760,8320,10140,12220,14560,17160,20020,23140,26520,30160,33800],keys=['gold','elixir'],producer=t=>['mine','extracteur'].includes(t),reserve=t=>['reserve','reservoir'].includes(t),resource=t=>['mine','reserve'].includes(t)?'gold':'elixir',clone=x=>structuredClone(x),level=n=>Math.max(1,Math.min(20,Math.floor(Number(n)||1))),isBot=o=>o.bot===true;
function limits(n){return n<5?1:n<10?2:3;}
function rates(attackerLevel,defenderLevel){const below=Math.max(0,level(attackerLevel)-level(defenderLevel)),stronger=level(defenderLevel)-level(attackerLevel)>=3;return{mine:Math.max(0,1-below*.1),reserveGain:stronger?.30:Math.max(0,(25-2*below)/100),reserveLoss:stronger?.15:.10};}
function shieldMs(attackerLevel,defenderLevel,bot=false){return bot?300000:(Math.min(10,Math.max(5,level(attackerLevel)-level(defenderLevel)+4)))*3600000;}
function quote(node,owner={},now=Date.now()){
 const l=level(node.level),layout=owner.layout||owner,b=PreviewGame.defenseHeroBonuses(layout,node),storage=b.storage||0,speed=b.productionSpeed||0,clan=Math.max(0,Math.min(10,owner.clanYield??owner.clanTech?.yield??0)),help=node.helpUntil>now?1.2:1,index=(layout.buildings||[]).filter(x=>x.type===node.type).findIndex(x=>x.id===node.id),allowed=index<limits(level(owner.level||layout.castleLevel||20)),capacity=Math.round(CAPACITY[l-1]*((1+storage)*help+(owner.vipMineStorage||0))),base=PRODUCTION[l-1];
 return{base,capacity,storageBonus:storage,speedBonus:speed,clanBonus:clan*.02,help,allowed,total:node.underConstruction||!allowed?0:base*(1+speed)*(1+clan*.02)*help*(isBot(owner)?3:1)};
}
function settle(owner,now=Date.now()){
 const o=clone(owner);o.wallet??={gold:0,elixir:0};const elapsed=Math.max(0,now-(o.updatedAt??now))/3600000;
 for(const n of (o.layout?.buildings||[]).filter(x=>producer(x.type))){const q=quote(n,o,now);n.stored=Math.min(q.capacity,Math.max(0,Number(n.stored)||0)+elapsed*q.total);n.producedAt=now;}
 if(isBot(o))for(const k of keys){const type=k==='gold'?'reserve':'reservoir',n=o.layout.buildings.find(x=>x.type===type),cap=PreviewGame.v06ResourceCap(level(n?.level||1));o.wallet[k]=Math.min(cap,Math.max(0,o.wallet[k]||0)+elapsed*6000);}
 o.updatedAt=now;return o;
}
function begin(b,owner,attackerLevel,{id=b.id,now=Date.now()}={}){
 if(b.loot0308)return b;b.defenseSkills31=clone(owner.skills0310||{});if(owner.vipXP0310>=135300&&!b.layout.bonusContext326?.vipHP)for(const t of b.structures.filter(t=>!t.hero&&!t.troop&&t.solid!==false)){t.hp*=1.04;t.maxHp*=1.04;}const tanuki=(b.units||[]).find(u=>u.side==='attack'&&u.hero==='tanuki'&&!u.summoned),tanukiLevel=tanuki?level(tanuki.level):0,r=rates(attackerLevel,owner.level||owner.layout.castleLevel),nodes=[];
 for(const type of ['mine','extracteur','reserve','reservoir']){const list=b.structures.filter(x=>x.type===type),k=resource(type);for(const t of list){const original=owner.layout.buildings.find(n=>n.id===(t.itemId||t.id));const stock=producer(type)?Math.floor(Math.max(0,original?.stored||0)):Math.floor((owner.wallet[k]||0)/Math.max(1,list.length));nodes.push({id:t.id,itemId:t.itemId||t.id,type,resource:k,stock,maxHp:t.maxHp,startHp:t.hp,damage:0});}}
 b.loot0308={id:id||('raid-'+now),ownerId:owner.id,ownerLevel:level(owner.level||owner.layout.castleLevel),attackerLevel:level(attackerLevel),bot:isBot(owner),tanukiLevel,rates:r,nodes,startedAt:now,finalized:false};b.defenderStock=clone(owner.wallet);b.raid=reward(b);return b;
}
function recordHit(b,target,before){if(!b.loot0308||target.side==='attack')return;let n=b.loot0308.nodes.find(n=>n.id===target.id);if(n)n.damage=Math.min(n.maxHp,n.damage+Math.max(0,before-target.hp));}
function reward(b,raw=false){
 const l=b.loot0308;if(!l)return{gain:{gold:0,elixir:0},loss:{gold:0,elixir:0},minted:{gold:0,elixir:0},nodes:[]};const gain={gold:0,elixir:0},loss={gold:0,elixir:0},nodes=[];
 for(const n of l.nodes){const live=b.structures.find(t=>t.id===n.id),d=Math.min(1,Math.max(n.damage,n.startHp-(live?.hp??n.startHp))/Math.max(1,n.maxHp)),mine=producer(n.type),extra=(l.tanukiLevel||0)/100,gr=(mine?l.rates.mine:l.rates.reserveGain)+extra,lr=mine?l.rates.mine:l.rates.reserveLoss+(l.tanukiLevel||0)*.0025,g=Math.floor(n.stock*gr*d+1e-8),v=gr>0?Math.floor(n.stock*lr*d+1e-8):0;gain[n.resource]+=g;loss[n.resource]+=v;nodes.push({...n,fraction:d,gain:g,loss:v});}
 // Les vols spécifiques déjà définis pour Nyra/Tanuki restent séparés du pillage des structures.
 if(b.heroTheft)for(const k of keys){let g=Math.floor(b.heroTheft[k]||0),v=Math.floor(b.heroTheft.loss?.[k]||0),remaining=Math.max(0,(b.defenderStock[k]||0)-nodes.filter(n=>reserve(n.type)&&n.resource===k).reduce((s,n)=>s+n.loss,0));v=Math.min(v,remaining);gain[k]+=g;loss[k]+=v;nodes.push({id:'hero-theft-'+k,itemId:null,type:k==='gold'?'reserve':'reservoir',resource:k,gain:g,loss:v,heroTheft:true});}
 if(l.accepted316&&!raw){gain.gold=gain.elixir=loss.gold=loss.elixir=0;for(const n of nodes){const a=l.accepted316[n.id];n.gain=a?.gain||0;n.loss=a?.loss||0;gain[n.resource]+=n.gain;loss[n.resource]+=n.loss;}}
 return{gain,loss,minted:Object.fromEntries(keys.map(k=>[k,gain[k]-loss[k]])),nodes};
}
function apply(owner,b,now=Date.now()){
 const o=clone(owner),r=reward(b),id=b.loot0308.id;o.raidLedger??={};const prior=o.raidLedger[id]||{gain:{gold:0,elixir:0},lossByNode:{},gainByNode:{},restored:false},delta={gold:0,elixir:0},changes=[];
 for(const n of r.nodes){const lost=Math.max(0,n.loss-(prior.lossByNode[n.id]||0)),gain=Math.max(0,n.gain-(prior.gainByNode[n.id]||0));prior.lossByNode[n.id]=Math.max(n.loss,prior.lossByNode[n.id]||0);prior.gainByNode[n.id]=Math.max(n.gain,prior.gainByNode[n.id]||0);delta[n.resource]+=gain;if(producer(n.type)){const item=o.layout.buildings.find(t=>t.id===n.itemId);if(item)item.stored=Math.max(0,(item.stored||0)-lost);}else o.wallet[n.resource]=Math.max(0,(o.wallet[n.resource]||0)-lost);if(lost||gain)changes.push({id:n.id,itemId:n.itemId,type:n.type,resource:n.resource,gain,loss:lost});}
 prior.gain=clone(r.gain);prior.loss=clone(r.loss);if(delta.gold+delta.elixir>0)o.shieldUntil=Math.max(o.shieldUntil||0,now+shieldMs(b.loot0308.attackerLevel,b.loot0308.ownerLevel,o.bot));o.raidLedger[id]=prior;return{owner:o,reward:r,delta,changes};
}
function finish(owner,b,now=Date.now()){
 let out=apply(owner,b,now),o=out.owner,l=o.raidLedger[b.loot0308.id];if(!l.restored){if(o.bot)for(const n of out.reward.nodes){const amount=(l.lossByNode[n.id]||0)*.55;if(producer(n.type)){let item=o.layout.buildings.find(t=>t.id===n.itemId);if(item)item.stored=Math.min(quote(item,o,now).capacity,(item.stored||0)+amount);}else{const key=n.resource,storage=o.layout.buildings.find(t=>t.type===(key==='gold'?'reserve':'reservoir'));o.wallet[key]=Math.min(PreviewGame.v06ResourceCap(level(storage?.level||1)),(o.wallet[key]||0)+amount);}}l.restored=true;if((l.gain.gold||0)+(l.gain.elixir||0)>0)o.shieldUntil=Math.max(o.shieldUntil||0,now+shieldMs(b.loot0308.attackerLevel,b.loot0308.ownerLevel,o.bot));}b.loot0308.finalized=true;return{...out,owner:o};
}
return Object.freeze({version:'0.31.6',PRODUCTION,CAPACITY,limits,rates,shieldMs,quote,settle,begin,recordHit,reward,apply,finish});})();
if(typeof module!=='undefined')module.exports=PILLAGE0308;
