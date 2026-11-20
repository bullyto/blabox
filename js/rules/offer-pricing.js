/* Promotions de la démo : valeurs estimées, dates d'éligibilité et durées d'affichage. */
const RULES0305=(()=>{'use strict';
const DAY=86400000, SPEED={'speed-86400':5,'speed-3600':430,'speed-900':400,'speed-300':840};
Object.assign(RULES0304.OFFERS,{
 rare3:{title:'Trois héros rares',days:7,price:14.99,heroCount:3,tier:'Rare'},
 xp40:{title:'La réserve des champions',days:15,price:19.99,reference:39.98,xp:40},
 epic2:{title:'Un héros acheté, un héros offert',days:30,heroCount:2,tier:'Épique'},
 speed30:{title:'Trente jours d’avance',days:15,price:29.99,reference:382.14,items:SPEED},
 morghul:{title:'Le pacte de Morghul',days:15,price:49.99,hero:'morghul',xp:15},
 speed48:{title:'48 heures d’avance',days:5,price:.99,reference:19.01,items:{'speed-3600':48}},
 xp50048:{title:'48 potions d’expérience',days:5,price:1.99,reference:21.38,xpMedium:48},
 castillet:{title:'Le Castillet et son jardin',days:15,price:1.99,reference:15.39,cosmetic:'skin-castillet',decor:'decor-planter'}
});
const estimate=diamonds=>Math.round(diamonds*.99);
function price(actualMinor,referenceMinor){return {actualMinor,referenceMinor,saving:referenceMinor>0?Math.max(0,Math.round((1-actualMinor/referenceMinor)*10000)/100):0};}
function monthsAfter(time,n){const d=new Date(time),day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+n);const last=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate();d.setUTCDate(Math.min(day,last));return d.getTime();}
function update(input,f,now=Date.now()){
 const s=JSON.parse(JSON.stringify(input||{offers:[],test:null}));s.offers??=[];
 const add=(kind,key,at,extra={})=>{if(Number.isFinite(at)&&!s.offers.some(o=>o.key===key))s.offers.push({...extra,kind,key,status:'pending',eligibleAt:at,startedAt:null,endsAt:null});};
 const eligibleHero=kind=>!f.owned.includes(RULES0304.OFFERS[kind].hero);
 for(const o of s.offers)if(['active','pending'].includes(o.status)&&RULES0304.OFFERS[o.kind]?.hero&&!eligibleHero(o.kind)){o.status='unavailable';o.unavailableAt=now;}
 if(f.firstHero&&f.rareAvailable>=3)add('rare3','rare3',f.firstHero);
 const trio=s.offers.find(o=>o.key==='rare3'&&o.status==='purchased');if(trio)add('xp40','xp40',trio.purchasedAt+2*DAY);
 if(f.firstPaid){if(f.epicAvailable>=2)add('epic2','epic2:1',monthsAfter(f.firstPaid,2));add('speed48','speed48',f.firstPaid+14*DAY);add('xp50048','xp50048',f.firstPaid+14*DAY);}
 const pair=s.offers.find(o=>o.key==='epic2:1');if(pair?.endsAt&&['expired','purchased'].includes(pair.status)&&f.epicAvailable>=2)add('epic2','epic2:2',pair.endsAt+45*DAY);
 if(f.level>=8&&!f.castilletOwned)add('castillet','castillet',now);
 if(f.createdAt&&now>=f.createdAt+110*DAY)for(const kind of ['drac','morghul'])if(eligibleHero(kind))add(kind,kind,f.createdAt+110*DAY);
 for(const age of [85,160])if(f.accelerators?.[age])add('speed30','speed30:'+age,f.accelerators[age]);
 return RULES0304.schedule(s,now);
}
function missing(wallet,cost){return Object.entries(cost).filter(([k,v])=>['gold','elixir','diamonds'].includes(k)&&v>(wallet[k]||0)).map(([resource,required])=>({resource,required,available:Math.floor(wallet[resource]||0),missing:Math.ceil(required-(wallet[resource]||0))}));}
return {DAY,SPEED,estimate,price,monthsAfter,update,missing};})();
