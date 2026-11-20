/* Paramètres d’essai 0.33.1, communs au jeu local et aux contrôles. */
(function (root) {
  'use strict';
  const spells = {
    heal: {throne:1, costs:[6,9,12,16]},
    bubble: {throne:3, costs:[7,10,12,16]},
    fire: {throne:5, costs:[8,11,13,16]},
    crystal: {throne:6, costs:[10,14,18,28]},
    eye: {throne:7, costs:[16,24]},
    disarm: {throne:9, costs:[28]},
  };
  const direct = [200.97,203,205.03,208.075,211.12,234.465,258.825,282.17,305.515,307.545,310.59,312.62,314.65,316.68,318.71,320.74,328.86,344.085,360.325,375.55];
  const side = [0,168.49,172.55,176.61,181.685,200.97,221.27,241.57,261.87,263.9,267.96,272.02,276.08,280.14,284.2,288.26,292.32,295.365,308.56,321.755];
  const level = n => Math.max(1, Math.min(20, Math.floor(n) || 1));
  const cost = (id,n,uses=0) => {
    const base=spells[id]?.costs[uses];
    return base === undefined ? null : base-Math.floor(level(n)/5);
  };
  const mana = n => {
    n=level(n);
    const [x,y,nx,ny]=n<=5?[1,6,5,19]:n<=9?[5,19,9,28]:[9,28,20,40];
    return y+Math.floor((n-x)*(ny-y)/(nx-x));
  };
  const area = (id,n,width) => ({heal:n>=15?3:n>=10?2:1,fire:n>=7?3:n>=2?2:1,
    eye:1+Math.floor((width-1)*(level(n)-1)/19),disarm:n>=15?3:n>=10?2:1})[id]||1;
  function cells(target, count, width) {
    const first=Math.max(0,Math.min(width-count,target-Math.floor((count-1)/2)));
    return Array.from({length:Math.min(count,width)},(_,i)=>first+i);
  }
  const ranks=[
    ['Bronze I',0,1,4500],['Bronze II',1475,2,8000],['Bronze III',1700,3,15000],
    ['Argent I',1875,4,20000],['Argent II',2000,5,25000],['Argent III',2125,6,30000],
    ['Or I',2275,7,40000],['Or II',2425,8,50000],['Or III',2650,9,60000]
  ];
  const stars=(destruction,throneDown=false)=>throneDown?4:[50,75,90,100].filter(n=>destruction>=n).length;
  function transfer(attacker,defender,s) {
    const e=1/(1+10**((defender-attacker)/400));
    const raw=s>0?24*(1-e)*s/4:-24*e*(.4375+.4125*e);
    return Math.sign(raw)*Math.round(Math.abs(raw)+1e-9);
  }
  const day=86400000;
  const week=7*day;
  const parisClock=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Paris',weekday:'short',hour:'2-digit',hourCycle:'h23'});
  const windowCache=new Map();
  function eventWindow(now,event,forced) {
    const cacheKey=event+':'+Math.floor(now/3600000)+':'+forced;
    if(windowCache.has(cacheKey))return windowCache.get(cacheKey);
    const hideout=event==='repaire';
    const dayName=hideout?'Fri':'Sat',hour=hideout?'20':'18';
    const candidates=[];
    const base=Math.floor(now/3600000)*3600000;
    for(let delta=-8*24;delta<=8*24;delta++){
      const timestamp=base+delta*3600000;
      const parts=parisClock.formatToParts(timestamp);
      if(parts.find(p=>p.type==='weekday').value===dayName&&parts.find(p=>p.type==='hour').value===hour)candidates.push(timestamp);
    }
    const start=candidates.filter(t=>t<=now).at(-1),upcoming=candidates.find(t=>t>now);
    let end=start+day;
    if(hideout){
      end=start+9*3600000;
      while(parisClock.formatToParts(end).find(p=>p.type==='hour').value!=='06')end+=3600000;
    }
    const natural=now<end;
    const value={key:String(start),open:forced??natural,next:natural?end:upcoming,visible:forced??(natural||upcoming-now<=day)};
    if(windowCache.size>24)windowCache.clear();
    windowCache.set(cacheKey,value);
    return value;
  }
  const topScores=(scores,score)=>[...scores,Math.max(0,Math.floor(score))].sort((a,b)=>b-a).slice(0,5);
  const dropChance=(...multipliers)=>Math.min(1,.12*multipliers.reduce((a,b)=>a*b,1));
  function attackDrops({attack,stars:earned,vip=0,scrollCount=0,eligible=[],bonus=1},loot,random=Math.random){
    const result={potions:[],scroll:null,crystal:0};
    const factor=Number.isInteger(earned)&&earned>=1&&earned<=4?earned/4:0;
    if(!factor||!Number.isSafeInteger(attack)||attack<1)return result;
    const rolls=Array.from({length:6},()=>random());
    const vipBonus=Math.max(0,Math.min(20,vip)-4)*.05;
    for(const roll of rolls.slice(0,2)){
      let remaining=roll*100;
      for(const [item,rate] of loot){
        remaining-=(rate+vipBonus)*factor;
        if(remaining>=0)continue;
        if(attack>20||!['xp-large','skill-large'].includes(item))result.potions.push(item);
        break;
      }
    }
    if(attack>20&&rolls[2]<Math.min(1,.055*factor/2**Math.max(0,scrollCount||0))){
      const pool=eligible.filter(hero=>hero.tier==='Commun'||hero.tier==='Épique');
      const tier=rolls[3]<.8?'Commun':'Épique';
      const selected=pool.filter(hero=>hero.tier===tier);
      const available=selected;
      if(available.length)result.scroll=available[Math.floor(rolls[4]*available.length)].id;
    }
    result.crystal=Number(rolls[5]<Math.min(1,.09*bonus)*factor);
    return result;
  }
  root.Blabox0330={spells,cost,mana,area,cells,direct,side,ranks,stars,transfer,day,eventWindow,topScores,dropChance,attackDrops};
})(typeof module==='object'&&module.exports?module.exports:globalThis);
