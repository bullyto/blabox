/* Droits applicatifs de la démo. Le créateur conserve seul les actions sensibles. */
RULES0291.PERMISSIONS.admin=[...RULES030.ADMIN_PERMISSIONS];
(()=>{const baseRead=DEMOOPS0291.read,baseCommand=DEMOOPS0291.command;DEMOOPS0291.read=function(){let s=baseRead();if(!s.rolePolicy0301){for(let a of s.admins)a.permissions=[...RULES030.ADMIN_PERMISSIONS];s.rolePolicy0301=true;DEMOOPS0291.write(s);}return s;};
DEMOOPS0291.command=function(role,kind,p={}){if(role==='admin'&&!['sanction','referral-qualify','referral-settle'].includes(kind))throw Error('Seul le créateur peut effectuer cette opération.');if(kind==='gift'){if(role!=='creator')throw Error('Les cadeaux sont réservés au créateur.');p=structuredClone(p);if(p.audience==='all'){delete p.playerId;delete p.clan;}else if(p.audience==='clan'){delete p.playerId;if(!p.clan?.trim())throw Error('Choisis une alliance.');}else{p.audience='player';delete p.clan;}}if(kind==='code'&&(!Number.isFinite(p.expiresAt)||p.expiresAt<=Date.now()||!Number.isInteger(p.limit)||p.limit<1))throw Error('Date ou nombre d’utilisations invalide.');return baseCommand(role,kind,p);};
})();

const referralBonusBefore030=RULES0291.referralBonus;RULES0291.referralBonus=function(order,links,now){const link=links.find(l=>l.parent===order.playerId||l.child===order.playerId);if(!link?.qualified)return null;return referralBonusBefore030(order,links,now);};
