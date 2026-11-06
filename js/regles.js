const PreviewGame=(()=>{// Catalogue consolidé v9 ; corrections explicites de la 0.24.
const HERO_PROFILES=[
  {
    "id": "aegis",
    "name": "Aegis",
    "role": "Paladin protecteur",
    "tier": "Épique",
    "price": 2800,
    "hp": 650,
    "atk": 58.11,
    "speed": 1,
    "style": "Protection",
    "passive": "Serment du rempart",
    "skill": "Bulle protectrice",
    "desc": "Aegis enveloppe les alliés situés à une case ou moins dans une bulle qui bloque les attaques pendant 2 secondes au niveau 1, puis gagne 0,3 seconde par niveau.",
    "atkText": "Frappe de paladin",
    "radius": "1 case pour le sort",
    "tag": "Sa bulle offre aux alliés un court instant pour contre-attaquer.",
    "mechanic": "aegis",
    "notes": "En duel solo, la bulle d’Aegis ne se déclenche pas : sa fonction est de protéger les alliés proches. Attaque de base recalée par le simulateur pour rapprocher les héros de même rareté; les progressions propres à chaque niveau restent appliquées."
  },
  {
    "id": "aigle",
    "name": "Aigle patriotique",
    "role": "Sentinelle ailée",
    "tier": "Rare",
    "price": 1500,
    "hp": 560,
    "atk": 50.02,
    "speed": 1,
    "style": "Sentinelle",
    "passive": "Œil du faucon",
    "skill": "Repérage des pièges",
    "desc": "Son œil révèle les pièges dans les quatre cases devant lui. Il les désactive une fois pendant le combat.",
    "atkText": "Serres et frappe aérienne",
    "radius": "4 cases devant lui",
    "tag": "Les pièges n’ont qu’une chance : l’Aigle les repère avant qu’ils ne se déclenchent.",
    "mechanic": "trap",
    "notes": "Le désamorçage n’a pas de cible en duel pur. Attaque de base recalée par le simulateur pour rapprocher les héros de même rareté; les progressions propres à chaque niveau restent appliquées."
  },
  {
    "id": "brakk",
    "name": "Brakk",
    "role": "Minotaure guerrier",
    "tier": "Rare",
    "price": 1500,
    "hp": 500,
    "atk": 52.16,
    "speed": 1,
    "style": "Briseur",
    "passive": "Brise-forteresse",
    "skill": "Double de guerre",
    "desc": "Brakk inflige 10 % de dégâts supplémentaires aux structures. Son sort crée un double sur son étage pendant 3 secondes au niveau 1, puis 0,2 seconde de plus par niveau. Le double possède 10 % de la vie de Brakk.",
    "atkText": "Coup de minotaure",
    "radius": "Corps à corps",
    "tag": "Deux Brakk sur le même étage : la ligne adverse vacille.",
    "mechanic": "brakk",
    "notes": "Hypothèse de test : le double inflige 35 % des dégâts de Brakk. Sa cible prioritaire et ses dégâts restent à valider. Attaque de base recalée par le simulateur pour rapprocher les héros de même rareté; les progressions propres à chaque niveau restent appliquées."
  },
  {
    "id": "chacal",
    "name": "Chacal des sables",
    "role": "Gardien solaire",
    "tier": "Rare",
    "price": 2100,
    "hp": 550,
    "atk": 48.07,
    "speed": 1,
    "style": "Invocation",
    "passive": "Frappe solaire",
    "skill": "Armée des morts",
    "desc": "Ses attaques touchent les ennemis dans une zone de deux cases, puis trois à partir du niveau 12. Il invoque deux créatures faibles pendant 3 secondes au niveau 1, puis 0,3 seconde de plus par niveau. Au niveau 12, il en invoque trois.",
    "atkText": "Frappe solaire de zone",
    "radius": "Zone : 2 cases; 3 au niveau 12",
    "tag": "Le sable se soulève et l’armée avance à ses côtés.",
    "mechanic": "chacal",
    "notes": "Nouvel équilibrage : attaque réduite de 30 % et vie réduite de 5 % à chacun des niveaux. Cela remplace l’ancien réglage de dégâts par niveau. En duel, la zone ne peut toucher qu’un seul adversaire présent."
  },
  {
    "id": "drac",
    "name": "Drac catalan",
    "role": "Dragon de la Saint-Jean",
    "tier": "Légendaire",
    "price": 13500,
    "hp": 820,
    "atk": 54.3,
    "speed": 1,
    "style": "Dragon",
    "passive": "Sang robuste",
    "skill": "Double flamboyant",
    "desc": "Drac souffle une boule de feu sur quatre cases. Son double saute à l’étage supérieur, y combat pendant 8 secondes après son arrivée puis disparaît.",
    "atkText": "Boule de feu traversante · 2 cibles",
    "radius": "4 cases en avant",
    "tag": "Il frappe depuis son étage pendant que son double gagne le niveau supérieur.",
    "mechanic": "drac",
    "notes": "Réglage : +13 PV par niveau. Le gain d’attaque de chaque niveau est réduit de 7 % par rapport à la progression standard; cela remplace l’ancien réglage de −1 dégât par niveau. Sa résistance permanente de 5 % reste active. Double : saut de 0,85 s, puis présence de 8 s ; dégâts limités aux cases réellement traversées."
  },
  {
    "id": "elyra",
    "name": "Elyra",
    "role": "Prêtresse guérisseuse féerique",
    "tier": "Épique",
    "price": 2800,
    "hp": 680,
    "atk": 0,
    "speed": 1,
    "style": "Soigneuse",
    "passive": "Soin continu",
    "skill": "Lueur bienveillante",
    "desc": "Elyra vole au-dessus des pièges et soigne en continu les alliés blessés. Elle privilégie les héros; s’il n’y a aucun héros blessé, elle soigne les monstres. Elle soigne un monstre à la fois, puis deux à partir du niveau 12. Son sort spécial soigne tous les alliés blessés de l’étage à hauteur de 7 % de leurs PV max.",
    "atkText": "Ne frappe pas · vole · immunisée aux pièges · esquive 3 % des attaques",
    "radius": "Soins aux alliés blessés de son étage",
    "tag": "Une aile protectrice qui maintient les héros debout pendant que le château se bat.",
    "mechanic": "healer",
    "notes": "Elle récupère 2 PV/s par niveau (40 PV/s au niveau 20). Un héros ressuscité par Morghul peut être soigné jusqu’à ses PV max. Elyra ne se juge pas en duel direct; mesure sa valeur avec une équipe."
  },
  {
    "id": "gargouille",
    "name": "Gargouille de Rouen",
    "role": "Héros des flots",
    "tier": "Légendaire",
    "price": 12400,
    "hp": 780,
    "atk": 60,
    "speed": 1,
    "style": "Gardienne des défenses",
    "passive": "Sentinelle des remparts",
    "skill": "Veille des flots",
    "desc": "Augmente l’attaque des structures défensives hors pièges de 10 % et leur vie de 5 %.",
    "atkText": "Frappe de gargouille",
    "radius": "Toutes les structures défensives hors pièges",
    "tag": "Les remparts frappent plus fort et tiennent plus longtemps.",
    "mechanic": "support",
    "notes": "Le bonus des structures est la compétence définie; aucune deuxième capacité de combat n’est ajoutée."
  },
  {
    "id": "gorvak",
    "name": "Gorvak",
    "role": "Guerrier sanglier",
    "tier": "Commun",
    "price": 700,
    "hp": 650,
    "atk": 29.99,
    "speed": 1,
    "style": "Polyvalent",
    "passive": "Combattant équilibré",
    "skill": "Onde sauvage",
    "desc": "Gorvak combat une cible à la fois. Son sort frappe en zone devant lui. En défense, la chute d’une mine le met en rage : attaque +15 % pendant 8 s ; il poursuit les ennemis par les portes puis revient à sa caserne.",
    "atkText": "Coup de hache",
    "radius": "Sort : 2 cases devant lui",
    "tag": "Il tient la ligne et frappe tout ennemi qui s’approche.",
    "mechanic": "gorvak",
    "notes": "En duel, l’attaque de zone ne touche qu’un adversaire; aucun dégât additionnel n’est supposé. Attaque de base recalée par le simulateur pour rapprocher les héros de même rareté; les progressions propres à chaque niveau restent appliquées."
  },
  {
    "id": "ignara",
    "name": "Ignara",
    "role": "Mage de feu",
    "tier": "Commun",
    "price": 700,
    "hp": 430,
    "atk": 44.87,
    "speed": 1,
    "style": "Magie",
    "passive": "Boule de feu continue",
    "skill": "Explosion de braises",
    "desc": "Ignara lance de faibles boules de feu qui ciblent un ennemi à la fois, à deux cases de portée. Une fois par combat, elle déclenche une explosion de zone qui inflige quelques dégâts supplémentaires.",
    "atkText": "Boule de feu légère · cible unique",
    "radius": "Portée : 2 cases",
    "tag": "Un feu continu qui use les assaillants avant l’explosion.",
    "mechanic": "mage",
    "notes": "Nouvel équilibrage : statistique d’attaque réduite de 30 % à chacun des niveaux. L’attaque normale reste ciblée sur un ennemi; le sort spécial conserve son explosion de zone."
  },
  {
    "id": "jiangshi",
    "name": "Jiangshi",
    "role": "Vampire mort-vivant",
    "tier": "Épique",
    "price": 2800,
    "hp": 400,
    "atk": 62.35,
    "speed": 1,
    "style": "Vampire",
    "passive": "Vol de vitalité",
    "skill": "Régénération funeste",
    "desc": "Chaque attaque lui rend l’équivalent de 5 % de ses dégâts contre un monstre ou un bâtiment, et de 10 % contre un héros. Une fois par combat, il récupère 10 % de sa vie maximale. Il frappe fort, mais possède une vie moyenne.",
    "atkText": "Frappe vampirique puissante",
    "radius": "Corps à corps",
    "tag": "Il transforme chaque frappe en énergie pour prolonger le combat.",
    "mechanic": "jiangshi",
    "notes": "Progression d’attaque ajoutée au profil de base : +2 par niveau jusqu’au niveau 6, +3 par niveau du 7 au 12, puis +4 par niveau du 13 au 20. Il gagne aussi +3 PV par niveau. Attaque de base recalée par le simulateur pour rapprocher les héros de même rareté; les progressions propres à chaque niveau restent appliquées."
  },
  {
    "id": "kryos",
    "name": "Kryoss",
    "role": "Archimage bleu",
    "tier": "Commun",
    "price": 700,
    "hp": 520,
    "atk": 37.41,
    "speed": 1,
    "style": "Magie",
    "passive": "Projectiles magiques",
    "skill": "Explosion glacée",
    "desc": "Kryoss projette de faibles attaques magiques sur une portée de deux cases et cible un ennemi à la fois. Une fois par combat, il déclenche une attaque de zone.",
    "atkText": "Projectile magique léger · cible unique",
    "radius": "Portée : 2 cases",
    "tag": "Une pression constante, puis une décharge magique au bon moment.",
    "mechanic": "mage",
    "notes": "Nouvel équilibrage : statistique d’attaque réduite de 30 % à chacun des niveaux. L’attaque normale reste ciblée sur un ennemi; le sort spécial conserve son explosion de zone.",
    "sourceId": "kryoss"
  },
  {
    "id": "morghul",
    "name": "Morghul",
    "role": "Nécromancien itinérant",
    "tier": "Légendaire",
    "price": 12400,
    "hp": 620,
    "atk": 75.5,
    "speed": 1,
    "style": "Renaissance",
    "passive": "Dernier retour",
    "skill": "Dernier souffle",
    "desc": "Morghul peut ressusciter uniquement le dernier héros mort pendant ce combat. Le héros revient avec 15 % de sa vie maximale. Son attaque normale peut toucher deux ennemis simultanément.",
    "atkText": "Attaque magique à distance · 2 cibles",
    "radius": "Portée : 2 cases; 2 cibles simultanées",
    "tag": "Le dernier héros tombé revient dans la bataille.",
    "mechanic": "revive",
    "notes": "En duel 1 contre 1 sans allié, la résurrection ne peut pas s’activer; la seconde cible n’existe pas non plus dans ce duel."
  },
  {
    "id": "nian",
    "name": "Nian",
    "role": "Monstre des fêtes",
    "tier": "Commun",
    "price": 700,
    "hp": 480,
    "atk": 38.95,
    "speed": 1,
    "style": "Attaquant léger",
    "passive": "Pétards de fête",
    "skill": "Feu d’artifice",
    "desc": "Nian harcèle les ennemis avec de petits pétards. Son feu d’artifice frappe plusieurs ennemis proches avec des dégâts légers et interrompt brièvement leurs attaques.",
    "atkText": "Pétard rapide et peu puissant",
    "radius": "Petite zone autour de la cible",
    "tag": "Pas le plus puissant, mais assez bruyant pour casser le rythme adverse.",
    "mechanic": "nian",
    "notes": "Pouvoir proposé : l’interruption est simulée comme un retard de 0,4 seconde sur la prochaine attaque. Attaque de base recalée par le simulateur pour rapprocher les héros de même rareté; les progressions propres à chaque niveau restent appliquées."
  },
  {
    "id": "nyra",
    "name": "Nyra",
    "role": "Voleuse violette",
    "tier": "Épique",
    "price": 2800,
    "hp": 360,
    "atk": 70.87,
    "speed": 1,
    "style": "Assassine",
    "passive": "Vol d’élixir",
    "skill": "Voile invisible",
    "desc": "Nyra devient invisible pendant 6 secondes après la libération du sort. Sa marche reste transparente pendant toute cette durée. Le vol d’élixir suit les règles de sa fiche.",
    "atkText": "Frappe rapide",
    "radius": "Invisibilité : durée évolutive",
    "tag": "Elle disparaît, laisse l’ennemi frapper dans le vide, puis revient à l’attaque.",
    "mechanic": "nyra",
    "notes": "Progression d’attaque : +3 dégâts supplémentaires par niveau. Attaque de base recalée par le simulateur pour rapprocher les héros de même rareté; les progressions propres à chaque niveau restent appliquées."
  },
  {
    "id": "tanuki",
    "name": "Tanuki",
    "role": "Voyageur et voleur de pièces",
    "tier": "Épique",
    "price": 2800,
    "hp": 650,
    "atk": 53.35,
    "speed": 0.98,
    "style": "Pilleur",
    "passive": "Pillage rusé",
    "skill": "Pièce trouvée et rangée (passif)",
    "desc": "Chaque frappe réussie sur une structure rapporte 30 pièces d’or supplémentaires. Dans l’armée de pillage, Tanuki ajoute 1 point de pourcentage de butin par niveau aux mines et réserves. Le supplément des mines ne coûte rien au défenseur ; les réserves perdent 0,25 point de plus par niveau de Tanuki. Au niveau 20 : mines 120 %, réserves 45 % gagnés et 15 % perdus, à niveaux de château égaux.",
    "atkText": "Frappe de voyageur",
    "radius": "Pillage en combat",
    "tag": "Un clin d’œil, une pirouette… et les pièces changent de poche.",
    "mechanic": "tanuki",
    "notes": "Ses PV restent inchangés et ses dégâts par frappe sont légèrement réduits. Son rythme de frappe un peu plus rapide lui permet de battre les héros rares tout en restant sous les héros épiques dans le duel simulé. La séquence de la grosse pièce illustre son butin ; elle ne lance aucune pièce et ne provoque pas de dégâts de zone."
  },
  {
    "id": "tarasque",
    "name": "Tarasque",
    "role": "Gardienne à carapace verte",
    "tier": "Rare",
    "price": 1500,
    "hp": 800,
    "atk": 32.53,
    "speed": 1,
    "style": "Défense",
    "passive": "Écailles du bastion",
    "skill": "Carapace du bastion",
    "desc": "Créature légendaire de Provence. Les structures de son étage subissent 5 % de dégâts en moins. La Tarasque protège la structure défensive la plus affaiblie de son étage avec un bouclier égal à 20 % de sa vie maximale pendant 3 secondes.",
    "atkText": "Frappe lourde · cible unique",
    "radius": "Attaque ciblée; structures protégées sur son étage",
    "tag": "Quand une défense vacille, la Tarasque dresse sa carapace autour d’elle.",
    "mechanic": "tarasque",
    "notes": "Réglage : sa vie est légèrement augmentée. Le bouclier reste une hypothèse de test à confirmer. Attaque de base recalée par le simulateur pour rapprocher les héros de même rareté; les progressions propres à chaque niveau restent appliquées."
  },
  {
    "id": "tharos",
    "name": "Tharos",
    "role": "Golem de pierre",
    "tier": "Commun",
    "price": 700,
    "hp": 780,
    "atk": 28.97,
    "speed": 1,
    "style": "Gardien",
    "passive": "Rempart des Porte-bouclier",
    "skill": "Onde de choc",
    "desc": "Tharos augmente de 5 % la vie des Porte-bouclier. Une fois par combat, son coup fait trembler le sol et empêche les ennemis proches d’attaquer pendant une seconde. Héros conçu pour les premières heures : son bonus devient moins utile lorsque les Porte-bouclier sont dépassés.",
    "atkText": "Frappe de pierre",
    "radius": "Onde de choc : portée à préciser",
    "tag": "Un seul coup de poing peut interrompre toute une attaque.",
    "mechanic": "tharos",
    "notes": "Réglage : sa vie est légèrement augmentée; sa progression d’attaque perd 1,5 dégât par niveau par rapport à la courbe de base. Attaque de base recalée par le simulateur pour rapprocher les héros de même rareté; les progressions propres à chaque niveau restent appliquées."
  },
  {
    "id": "tiko",
    "name": "Tiko",
    "role": "Gobelin constructeur",
    "tier": "Rare",
    "price": 1500,
    "hp": 600,
    "atk": 45,
    "speed": 1,
    "style": "Constructeur",
    "passive": "Ingénieur du château",
    "skill": "Plans malins",
    "desc": "En garnison, Tiko réduit le coût des bâtiments de 0,5 % et la durée de construction de 1 % par niveau. Il apporte un constructeur supplémentaire. Il ne peut pas quitter sa garnison tant que tous les constructeurs sont occupés.",
    "atkText": "Attaque légère de gobelin",
    "radius": "Bonus économique du château",
    "tag": "Chaque amélioration coûte moins cher et se termine plus vite avec Tiko.",
    "mechanic": "support",
    "notes": "Réglage individuel conservé : le modèle vise environ 40 % de victoires contre les héros communs sur les niveaux 8 à 20."
  },
  {
    "id": "tortue",
    "name": "Esprit tortue",
    "role": "Gardien de longévité",
    "tier": "Épique",
    "price": 2800,
    "hp": 650,
    "atk": 51.8,
    "speed": 1,
    "style": "Gardien",
    "passive": "Bénédiction de longévité",
    "skill": "Carapace ancestrale",
    "desc": "Il donne 5 % de vitalité supplémentaire aux héros, monstres et bâtiments du château. À 50 % de sa vie, il s’enferme dans sa carapace pendant 3 secondes au niveau 1, puis 0,3 seconde de plus par niveau. Il subit alors 20 % de dégâts en moins, ne bouge plus et devient la cible prioritaire.",
    "atkText": "Frappe lente · cible unique",
    "radius": "Cible unique; carapace à 50 % PV",
    "tag": "Il encaisse l’assaut pour laisser aux alliés le temps de riposter.",
    "mechanic": "turtle",
    "notes": "En duel, la cible prioritaire n’a pas d’effet; la réduction de dégâts reste simulée. Attaque de base recalée par le simulateur pour rapprocher les héros de même rareté; les progressions propres à chaque niveau restent appliquées."
  },
  {
    "id": "valdorn",
    "name": "Valdorn",
    "role": "Paladin nain doré",
    "tier": "Épique",
    "price": 2800,
    "hp": 750,
    "atk": 50.4,
    "speed": 1,
    "style": "Économie et défense",
    "passive": "Maître des mines de son étage",
    "skill": "Barricades renforcées",
    "desc": "Valdorn augmente de 50 % la capacité de stockage et la vitesse de production de toutes les mines et extracteurs de son étage, puis gagne 2 points de bonus par niveau (90 % au niveau 20). Il augmente de 15 % les PV des barricades de son étage. Sa cadence d’attaque descend jusqu’à 1,70 s au niveau 20.",
    "atkText": "Frappe de paladin",
    "radius": "Mines et barricades de son étage",
    "tag": "Il accélère les mines de son étage et renforce ses barricades.",
    "mechanic": "support",
    "notes": "Les mines et barricades ne sont pas simulées dans un duel pur. Attaque de base recalée par le simulateur pour rapprocher les héros de même rareté; les progressions propres à chaque niveau restent appliquées."
  },
  {
    "id": "vexa",
    "name": "Vexa",
    "role": "Sorcière violette",
    "tier": "Rare",
    "price": 1500,
    "hp": 470,
    "atk": 40.23,
    "speed": 1,
    "style": "Magie",
    "passive": "Projectiles ensorcelés",
    "skill": "Explosion violette",
    "desc": "Vexa attaque à distance avec de faibles projectiles qui ciblent un ennemi à la fois, sur deux cases de portée. Une fois par combat, elle lance une explosion de zone.",
    "atkText": "Projectile magique léger · cible unique",
    "radius": "Portée : 2 cases",
    "tag": "Ses maléfices usent l’ennemi avant une dernière décharge.",
    "mechanic": "mage",
    "notes": "Nouvel équilibrage : statistique d’attaque réduite de 30 % à chacun des niveaux. L’attaque normale reste ciblée sur un ennemi; le sort spécial conserve son explosion de zone."
  }
];

// Timings calculés depuis les frames validées ; les statistiques restent dans heroes.mjs.
const HERO_ANIMATION_TIMINGS_024={"aegis":{"strike":{"totalMs":770,"releaseMs":412,"framesMs":[280,150,340]},"cast":{"totalMs":2380,"releaseMs":1740,"framesMs":[420,1500,460]}},"aigle":{"strike":{"totalMs":710,"releaseMs":374.4,"framesMs":[260,130,320]},"cast":{"totalMs":2250,"releaseMs":1632,"framesMs":[400,1400,450]}},"brakk":{"strike":{"totalMs":790,"releaseMs":432,"framesMs":[300,150,340]},"cast":{"totalMs":3950,"releaseMs":3090,"framesMs":[450,3000,500]}},"chacal":{"strike":{"totalMs":770,"releaseMs":412,"framesMs":[280,150,340]},"cast":{"totalMs":2480,"releaseMs":1828,"framesMs":[420,1600,460]}},"drac":{"strike":{"totalMs":900,"releaseMs":478.4,"framesMs":[320,180,400]},"cast":{"totalMs":4000,"releaseMs":3140,"framesMs":[500,3000,500]},"clone":{"totalMs":8850,"releaseMs":null,"framesMs":[180,500,170,8000]}},"elyra":{"strike":{"totalMs":770,"releaseMs":412,"framesMs":[280,150,340]},"cast":{"totalMs":2380,"releaseMs":1740,"framesMs":[420,1500,460]}},"gargouille":{"strike":{"totalMs":800,"releaseMs":432,"framesMs":[300,150,350]},"cast":{"totalMs":2250,"releaseMs":1556,"framesMs":[500,1200,550]}},"gorvak":{"strike":{"totalMs":810,"releaseMs":452,"framesMs":[320,150,340]},"cast":{"totalMs":1650,"releaseMs":1104,"framesMs":[400,800,450]}},"ignara":{"strike":{"totalMs":710,"releaseMs":374.4,"framesMs":[260,130,320]},"cast":{"totalMs":1850,"releaseMs":1280,"framesMs":[400,1000,450]}},"jiangshi":{"strike":{"totalMs":770,"releaseMs":412,"framesMs":[280,150,340]},"cast":{"totalMs":2380,"releaseMs":1740,"framesMs":[420,1500,460]}},"kryos":{"strike":{"totalMs":710,"releaseMs":374.4,"framesMs":[260,130,320]},"cast":{"totalMs":1850,"releaseMs":1280,"framesMs":[400,1000,450]}},"morghul":{"strike":{"totalMs":770,"releaseMs":412,"framesMs":[280,150,340]},"cast":{"totalMs":2380,"releaseMs":1740,"framesMs":[420,1500,460]}},"nian":{"strike":{"totalMs":730,"releaseMs":392,"framesMs":[260,150,320]},"cast":{"totalMs":1950,"releaseMs":1368,"framesMs":[400,1100,450]}},"nyra":{"strike":{"totalMs":710,"releaseMs":374.4,"framesMs":[260,130,320]},"cast":{"totalMs":2850,"releaseMs":2160,"framesMs":[400,2000,450]}},"tanuki":{"strike":{"totalMs":730,"releaseMs":392,"framesMs":[260,150,320]},"cast":{"totalMs":2770,"releaseMs":2303.6,"framesMs":[420,600,650,720,380]}},"tarasque":{"strike":{"totalMs":720,"releaseMs":383.2,"framesMs":[260,140,320]},"cast":{"totalMs":4750,"releaseMs":750,"framesMs":[400,350,3000,300,350,350]}},"tharos":{"strike":{"totalMs":790,"releaseMs":432,"framesMs":[300,150,340]},"cast":{"totalMs":1800,"releaseMs":1154,"framesMs":[450,800,550]}},"tiko":{"strike":{"totalMs":770,"releaseMs":412,"framesMs":[280,150,340]},"cast":{"totalMs":2150,"releaseMs":1506,"framesMs":[450,1200,500]}},"tortue":{"strike":{"totalMs":710,"releaseMs":374.4,"framesMs":[260,130,320]},"cast":{"totalMs":4750,"releaseMs":750,"framesMs":[400,350,3000,300,350,350]}},"valdorn":{"strike":{"totalMs":880,"releaseMs":499.6,"framesMs":[350,170,360]},"cast":{"totalMs":2100,"releaseMs":1456,"framesMs":[400,1200,500]}},"vexa":{"strike":{"totalMs":710,"releaseMs":374.4,"framesMs":[260,130,320]},"cast":{"totalMs":1850,"releaseMs":1280,"framesMs":[400,1000,450]}}};

const VISUAL_HITBOXES_023={"academie":[{"width":1.3535,"offset":-0.0051},{"width":1.4242,"offset":0.0},{"width":1.5606,"offset":-0.0025},{"width":1.6667,"offset":0.0},{"width":1.7071,"offset":0.0},{"width":1.4343,"offset":0.0},{"width":1.6919,"offset":-0.0025},{"width":1.7626,"offset":-0.0025},{"width":1.7071,"offset":0.0},{"width":1.7172,"offset":0.0},{"width":1.4747,"offset":-0.0051},{"width":1.7475,"offset":0.0},{"width":1.6414,"offset":-0.0025},{"width":1.8131,"offset":-0.0025},{"width":1.7475,"offset":0.0},{"width":1.6414,"offset":0.0025},{"width":1.7879,"offset":-0.0051},{"width":1.8939,"offset":-0.0025},{"width":1.9596,"offset":0.0},{"width":1.9949,"offset":0.0025}],"atelier-monstres":[{"width":1.5152,"offset":0.0},{"width":1.7172,"offset":0.0},{"width":1.7323,"offset":-0.0025},{"width":1.7424,"offset":-0.0025},{"width":1.7576,"offset":0.0},{"width":1.7172,"offset":0.0},{"width":1.7525,"offset":0.0025},{"width":1.8081,"offset":0.0},{"width":1.7626,"offset":0.0025},{"width":1.8434,"offset":-0.0025},{"width":1.7273,"offset":0.0},{"width":1.798,"offset":0.0},{"width":1.8889,"offset":0.0},{"width":1.8586,"offset":0.0},{"width":1.9747,"offset":0.0025},{"width":1.8636,"offset":-0.0025},{"width":1.7828,"offset":-0.0025},{"width":1.9848,"offset":-0.0025},{"width":1.8636,"offset":-0.0025},{"width":2.0,"offset":0.0}],"barricade":[{"width":0.6768,"offset":-0.0038},{"width":0.7529,"offset":-0.0038},{"width":0.7452,"offset":-0.0038},{"width":0.7414,"offset":-0.0019},{"width":0.8327,"offset":0.0019},{"width":0.8441,"offset":0.0},{"width":0.8365,"offset":0.0},{"width":0.8555,"offset":-0.0019},{"width":0.8517,"offset":-0.0038},{"width":0.8593,"offset":0.0},{"width":0.8479,"offset":-0.0019},{"width":0.8441,"offset":-0.0038},{"width":0.8555,"offset":-0.0019},{"width":0.8897,"offset":0.0},{"width":0.9087,"offset":0.0019},{"width":0.8517,"offset":0.0},{"width":0.8745,"offset":0.0},{"width":0.8745,"offset":0.0},{"width":0.943,"offset":0.0},{"width":1.0,"offset":-0.0019}],"caserne-heros":[{"width":1.7828,"offset":-0.0025},{"width":1.8131,"offset":0.0025},{"width":1.7828,"offset":-0.0025},{"width":1.8081,"offset":-0.0051},{"width":1.7727,"offset":0.0025},{"width":1.8232,"offset":-0.0025},{"width":1.904,"offset":-0.0025},{"width":1.899,"offset":0.0},{"width":1.8737,"offset":-0.0025},{"width":1.8384,"offset":-0.0051},{"width":1.8485,"offset":0.0},{"width":1.9091,"offset":0.0},{"width":1.9091,"offset":0.0},{"width":1.9495,"offset":0.0},{"width":1.9141,"offset":-0.0025},{"width":1.8838,"offset":-0.0025},{"width":1.9545,"offset":-0.0025},{"width":1.9747,"offset":-0.0025},{"width":1.9293,"offset":0.0},{"width":1.9949,"offset":0.0025}],"core":[{"width":1.5704,"offset":-0.0031},{"width":1.8454,"offset":0.0},{"width":2.0165,"offset":0.0},{"width":2.0776,"offset":-0.0061},{"width":1.992,"offset":0.0},{"width":2.0287,"offset":0.0},{"width":2.0165,"offset":0.0},{"width":2.0592,"offset":-0.0031},{"width":2.1631,"offset":0.0},{"width":2.1815,"offset":-0.0031},{"width":2.1448,"offset":-0.0031},{"width":2.1081,"offset":-0.0031},{"width":2.1203,"offset":-0.0031},{"width":2.1509,"offset":0.0},{"width":2.2914,"offset":-0.0031},{"width":2.267,"offset":-0.0031},{"width":2.1203,"offset":0.0031},{"width":2.212,"offset":0.0},{"width":2.2364,"offset":0.0},{"width":2.3892,"offset":-0.0031}],"extracteur":[{"width":1.4242,"offset":-0.0051},{"width":1.5707,"offset":-0.0025},{"width":1.6263,"offset":-0.0051},{"width":1.6111,"offset":0.0025},{"width":1.7727,"offset":-0.0025},{"width":1.7525,"offset":0.0025},{"width":1.7475,"offset":0.0},{"width":1.7576,"offset":0.0},{"width":1.7121,"offset":-0.0025},{"width":1.8232,"offset":-0.0025},{"width":1.803,"offset":-0.0025},{"width":1.8434,"offset":-0.0025},{"width":1.8838,"offset":0.0025},{"width":1.8939,"offset":-0.0025},{"width":1.899,"offset":0.0},{"width":1.904,"offset":-0.0025},{"width":1.9596,"offset":0.0},{"width":2.0,"offset":0.0},{"width":1.9192,"offset":0.0},{"width":1.9242,"offset":-0.0025}],"forge":[{"width":1.399,"offset":-0.0025},{"width":1.5657,"offset":0.0},{"width":1.6616,"offset":-0.0025},{"width":1.8081,"offset":0.0},{"width":1.697,"offset":0.0},{"width":1.6667,"offset":-0.0051},{"width":1.7071,"offset":0.0},{"width":1.8081,"offset":0.0},{"width":1.8485,"offset":0.0},{"width":1.7778,"offset":0.0},{"width":1.7778,"offset":0.0},{"width":1.8384,"offset":0.0},{"width":1.8939,"offset":0.0025},{"width":1.9747,"offset":-0.0025},{"width":1.8434,"offset":-0.0025},{"width":1.8889,"offset":0.0},{"width":1.904,"offset":-0.0025},{"width":1.8889,"offset":0.0},{"width":1.9949,"offset":0.0025},{"width":1.8939,"offset":-0.0025}],"garde-monstres":[{"width":0.9274,"offset":-0.0024},{"width":0.8756,"offset":-0.0047},{"width":0.8615,"offset":-0.0024},{"width":0.8851,"offset":0.0},{"width":0.9321,"offset":-0.0047},{"width":0.918,"offset":0.0024},{"width":0.9227,"offset":0.0},{"width":0.9416,"offset":0.0},{"width":0.9274,"offset":0.0024},{"width":0.951,"offset":0.0},{"width":0.9557,"offset":-0.0024},{"width":0.9651,"offset":-0.0024},{"width":0.9886,"offset":0.0},{"width":1.0498,"offset":-0.0024},{"width":1.0969,"offset":0.0024},{"width":1.1346,"offset":-0.0024},{"width":1.1534,"offset":0.0024},{"width":1.1864,"offset":0.0},{"width":1.1911,"offset":-0.0024},{"width":1.2617,"offset":0.0}],"garnison":[{"width":1.7323,"offset":-0.0025},{"width":1.6566,"offset":0.0},{"width":1.6263,"offset":0.0},{"width":1.6465,"offset":0.0},{"width":1.7576,"offset":0.0},{"width":1.7576,"offset":0.0},{"width":1.8081,"offset":0.0},{"width":1.6717,"offset":-0.0025},{"width":1.7475,"offset":0.0},{"width":1.7879,"offset":0.0},{"width":1.8485,"offset":-0.0051},{"width":1.8737,"offset":-0.0025},{"width":1.8333,"offset":-0.0025},{"width":1.8737,"offset":-0.0025},{"width":1.9899,"offset":0.0},{"width":1.9747,"offset":0.0025},{"width":1.9343,"offset":-0.0025},{"width":1.899,"offset":-0.0051},{"width":1.9899,"offset":0.0},{"width":1.9848,"offset":-0.0025}],"mana":[{"width":1.2172,"offset":0.0025},{"width":1.2525,"offset":0.0},{"width":1.2525,"offset":0.0},{"width":1.4545,"offset":-0.0051},{"width":1.3838,"offset":0.0},{"width":1.5455,"offset":0.0},{"width":1.5505,"offset":-0.0025},{"width":1.6667,"offset":-0.0051},{"width":1.6616,"offset":0.0025},{"width":1.702,"offset":-0.0025},{"width":1.7626,"offset":-0.0025},{"width":1.7879,"offset":0.0},{"width":1.8838,"offset":0.0025},{"width":1.8586,"offset":0.0},{"width":1.9747,"offset":0.0025},{"width":1.8434,"offset":0.0025},{"width":1.8131,"offset":-0.0025},{"width":1.9242,"offset":-0.0025},{"width":1.9293,"offset":0.0},{"width":2.0,"offset":0.0}],"mine":[{"width":1.7273,"offset":0.0},{"width":1.7273,"offset":-0.0051},{"width":1.8384,"offset":0.0},{"width":1.8586,"offset":0.0},{"width":1.7626,"offset":-0.0025},{"width":1.8182,"offset":-0.0051},{"width":1.8535,"offset":-0.0025},{"width":1.8636,"offset":0.0025},{"width":1.7727,"offset":-0.0025},{"width":1.7525,"offset":-0.0025},{"width":1.7273,"offset":-0.0051},{"width":1.7273,"offset":-0.0051},{"width":1.7626,"offset":-0.0025},{"width":1.8232,"offset":-0.0025},{"width":1.8535,"offset":0.0025},{"width":1.8182,"offset":0.0},{"width":1.8687,"offset":-0.0051},{"width":1.8889,"offset":0.0},{"width":1.9899,"offset":0.0},{"width":1.9343,"offset":-0.0025}],"reserve":[{"width":1.5565,"offset":0.0},{"width":1.5387,"offset":-0.003},{"width":2.008,"offset":-0.0059},{"width":2.0139,"offset":0.003},{"width":2.1684,"offset":-0.003},{"width":2.1268,"offset":0.0},{"width":2.21,"offset":0.0},{"width":2.1862,"offset":-0.0059},{"width":2.1803,"offset":-0.003},{"width":2.1684,"offset":-0.003},{"width":2.1862,"offset":-0.0059},{"width":2.1981,"offset":-0.0059},{"width":2.2397,"offset":-0.003},{"width":2.2278,"offset":-0.003},{"width":2.2931,"offset":0.0},{"width":2.2813,"offset":0.0},{"width":2.2991,"offset":-0.003},{"width":2.3466,"offset":-0.003},{"width":2.2931,"offset":0.0},{"width":2.3407,"offset":0.0}],"reservoir":[{"width":1.6756,"offset":-0.0069},{"width":1.758,"offset":0.0},{"width":1.758,"offset":0.0},{"width":1.8473,"offset":-0.0034},{"width":1.9022,"offset":-0.0034},{"width":2.0259,"offset":-0.0034},{"width":2.0739,"offset":0.0},{"width":2.0671,"offset":0.0034},{"width":2.0877,"offset":0.0},{"width":2.2181,"offset":-0.0034},{"width":2.2044,"offset":-0.0034},{"width":2.2593,"offset":-0.0034},{"width":2.28,"offset":0.0},{"width":2.2113,"offset":-0.0069},{"width":2.3555,"offset":-0.0034},{"width":2.4173,"offset":-0.0069},{"width":2.486,"offset":0.0},{"width":2.4104,"offset":-0.0034},{"width":2.4516,"offset":-0.0034},{"width":2.7126,"offset":0.0034}],"antimagie":[{"width":0.7464,"offset":0.0},{"width":0.7065,"offset":-0.0018},{"width":0.779,"offset":-0.0018},{"width":0.8116,"offset":0.0},{"width":0.9022,"offset":-0.0018},{"width":0.8986,"offset":0.0},{"width":0.837,"offset":-0.0018},{"width":0.8913,"offset":0.0},{"width":0.8659,"offset":0.0018},{"width":0.9275,"offset":0.0},{"width":0.8841,"offset":0.0},{"width":0.8877,"offset":0.0018},{"width":0.9022,"offset":-0.0018},{"width":0.8913,"offset":0.0},{"width":1.0,"offset":0.0},{"width":0.9275,"offset":0.0},{"width":0.9203,"offset":0.0},{"width":0.913,"offset":0.0},{"width":0.9022,"offset":-0.0018},{"width":0.9819,"offset":-0.0018}],"archers":[{"width":1.6717,"offset":0.0025},{"width":1.697,"offset":0.0},{"width":1.7374,"offset":0.0},{"width":1.7475,"offset":0.0},{"width":1.7677,"offset":0.0},{"width":1.7626,"offset":-0.0025},{"width":1.7475,"offset":0.0},{"width":1.7475,"offset":0.0},{"width":1.7475,"offset":-0.0051},{"width":1.7626,"offset":0.0025},{"width":1.7222,"offset":-0.0025},{"width":1.7525,"offset":-0.0025},{"width":1.7374,"offset":0.0},{"width":1.7525,"offset":0.0025},{"width":1.904,"offset":-0.0025},{"width":1.8384,"offset":0.0},{"width":1.7626,"offset":0.0025},{"width":1.8283,"offset":0.0},{"width":1.7677,"offset":0.0},{"width":1.9899,"offset":0.0}],"baliste":[{"width":0.864,"offset":0.0018},{"width":0.8787,"offset":-0.0018},{"width":0.9118,"offset":0.0},{"width":0.9338,"offset":0.0},{"width":0.9007,"offset":-0.0018},{"width":0.9265,"offset":0.0},{"width":0.9375,"offset":0.0018},{"width":0.9007,"offset":-0.0018},{"width":0.9412,"offset":0.0},{"width":0.9449,"offset":0.0018},{"width":0.9081,"offset":-0.0018},{"width":0.9265,"offset":0.0},{"width":0.9449,"offset":0.0018},{"width":0.9375,"offset":-0.0018},{"width":0.9853,"offset":0.0},{"width":0.9743,"offset":0.0018},{"width":0.9301,"offset":0.0018},{"width":0.9301,"offset":-0.0018},{"width":0.9228,"offset":0.0018},{"width":0.9963,"offset":0.0018}],"electricite":[{"width":0.5149,"offset":0.0},{"width":0.6007,"offset":-0.0019},{"width":0.6828,"offset":0.0019},{"width":0.6978,"offset":-0.0019},{"width":0.7612,"offset":0.0},{"width":0.8843,"offset":-0.0019},{"width":0.8619,"offset":-0.0019},{"width":0.8955,"offset":0.0},{"width":0.8545,"offset":-0.0019},{"width":0.8955,"offset":0.0},{"width":0.9067,"offset":-0.0019},{"width":0.9142,"offset":-0.0019},{"width":0.9739,"offset":-0.0019},{"width":0.9366,"offset":-0.0019},{"width":0.9478,"offset":0.0},{"width":0.959,"offset":-0.0019},{"width":0.9925,"offset":0.0},{"width":0.9291,"offset":0.0019},{"width":0.8806,"offset":-0.0037},{"width":0.9104,"offset":-0.0037}],"gardien":[{"width":0.8659,"offset":0.0018},{"width":0.8804,"offset":-0.0018},{"width":0.8986,"offset":0.0},{"width":0.9058,"offset":0.0},{"width":0.913,"offset":0.0},{"width":0.8949,"offset":0.0018},{"width":0.9022,"offset":-0.0018},{"width":0.9203,"offset":0.0},{"width":0.8986,"offset":-0.0036},{"width":0.9094,"offset":-0.0018},{"width":0.9167,"offset":-0.0018},{"width":0.913,"offset":-0.0036},{"width":0.9094,"offset":-0.0018},{"width":0.9167,"offset":0.0018},{"width":0.9601,"offset":0.0018},{"width":0.9493,"offset":0.0},{"width":0.9457,"offset":-0.0018},{"width":0.9058,"offset":0.0},{"width":0.942,"offset":0.0},{"width":0.9964,"offset":0.0018}],"glace":[{"width":0.6813,"offset":-0.002},{"width":0.7211,"offset":-0.002},{"width":0.7769,"offset":-0.002},{"width":0.8167,"offset":0.002},{"width":0.8207,"offset":-0.004},{"width":0.8924,"offset":0.0},{"width":0.8725,"offset":-0.002},{"width":0.8765,"offset":0.0},{"width":0.9044,"offset":-0.002},{"width":0.8725,"offset":0.002},{"width":0.8167,"offset":-0.002},{"width":0.8446,"offset":-0.004},{"width":0.8606,"offset":0.0},{"width":0.8725,"offset":-0.002},{"width":0.8964,"offset":-0.002},{"width":0.8845,"offset":0.0},{"width":0.9323,"offset":0.0},{"width":0.9243,"offset":-0.004},{"width":0.9841,"offset":-0.002},{"width":0.996,"offset":0.0}],"infernale":[{"width":0.5441,"offset":0.0},{"width":0.6654,"offset":-0.0018},{"width":0.7904,"offset":-0.0018},{"width":0.8787,"offset":-0.0018},{"width":0.8603,"offset":0.0},{"width":0.8493,"offset":-0.0018},{"width":0.9044,"offset":0.0},{"width":0.9191,"offset":0.0},{"width":0.9301,"offset":-0.0018},{"width":0.9154,"offset":-0.0018},{"width":0.9412,"offset":0.0},{"width":0.9301,"offset":-0.0018},{"width":0.9412,"offset":0.0},{"width":0.9375,"offset":-0.0018},{"width":0.989,"offset":-0.0018},{"width":0.9669,"offset":-0.0018},{"width":0.9669,"offset":-0.0018},{"width":0.9669,"offset":-0.0018},{"width":0.9926,"offset":0.0},{"width":0.9926,"offset":0.0}],"mortier":[{"width":0.8551,"offset":-0.0036},{"width":0.8152,"offset":-0.0018},{"width":0.913,"offset":0.0},{"width":0.8587,"offset":-0.0018},{"width":0.9094,"offset":-0.0018},{"width":0.913,"offset":0.0},{"width":0.913,"offset":0.0},{"width":0.9493,"offset":-0.0036},{"width":0.9058,"offset":0.0},{"width":0.9529,"offset":0.0018},{"width":0.9493,"offset":0.0},{"width":0.9493,"offset":-0.0036},{"width":0.9638,"offset":-0.0036},{"width":0.9457,"offset":0.0018},{"width":0.9674,"offset":-0.0018},{"width":0.9565,"offset":0.0},{"width":0.9565,"offset":0.0},{"width":0.9783,"offset":0.0},{"width":0.9674,"offset":-0.0018},{"width":1.0,"offset":0.0}],"necropole":[{"width":1.7632,"offset":0.0033},{"width":1.9163,"offset":-0.0067},{"width":1.883,"offset":0.0033},{"width":2.1491,"offset":0.0033},{"width":2.2622,"offset":-0.0067},{"width":2.1092,"offset":-0.0033},{"width":2.1491,"offset":-0.0033},{"width":2.5217,"offset":0.0033},{"width":2.2689,"offset":-0.0033},{"width":2.2889,"offset":0.0},{"width":2.1891,"offset":-0.0033},{"width":2.2689,"offset":-0.0033},{"width":2.3487,"offset":-0.0033},{"width":2.3421,"offset":0.0},{"width":2.2223,"offset":0.0},{"width":2.2622,"offset":0.0},{"width":2.3687,"offset":0.0},{"width":2.2622,"offset":0.0},{"width":2.3354,"offset":0.0033},{"width":2.6215,"offset":0.0}],"obelisque":[{"width":0.6324,"offset":0.0},{"width":0.6949,"offset":0.0018},{"width":0.75,"offset":0.0},{"width":0.7831,"offset":-0.0018},{"width":0.7794,"offset":0.0},{"width":0.7904,"offset":-0.0018},{"width":0.8199,"offset":-0.0018},{"width":0.8493,"offset":-0.0018},{"width":0.8456,"offset":0.0},{"width":0.8346,"offset":-0.0018},{"width":0.8934,"offset":-0.0018},{"width":0.9007,"offset":0.0018},{"width":0.9118,"offset":0.0},{"width":0.875,"offset":-0.0037},{"width":0.9191,"offset":-0.0037},{"width":0.9669,"offset":0.0018},{"width":0.9301,"offset":0.0018},{"width":0.9632,"offset":0.0},{"width":0.9485,"offset":0.0},{"width":0.9963,"offset":-0.0018}],"poison":[{"width":0.8193,"offset":0.0},{"width":0.8219,"offset":-0.0013},{"width":0.9008,"offset":-0.0025},{"width":0.8804,"offset":0.0},{"width":0.9059,"offset":0.0},{"width":0.9109,"offset":0.0},{"width":0.8957,"offset":0.0},{"width":0.944,"offset":-0.0013},{"width":0.9109,"offset":0.0},{"width":0.9033,"offset":-0.0013},{"width":0.9313,"offset":0.0},{"width":0.9186,"offset":-0.0013},{"width":0.9567,"offset":-0.0025},{"width":0.9415,"offset":0.0},{"width":0.9618,"offset":0.0},{"width":0.9644,"offset":-0.0013},{"width":0.9389,"offset":0.0013},{"width":0.9567,"offset":-0.0025},{"width":0.9949,"offset":-0.0038},{"width":0.972,"offset":-0.0025}],"soin":[{"width":0.5259,"offset":0.0},{"width":0.6074,"offset":0.0},{"width":0.6519,"offset":0.0},{"width":0.6963,"offset":0.0},{"width":0.7074,"offset":-0.0019},{"width":0.7407,"offset":0.0},{"width":0.7556,"offset":0.0},{"width":0.7778,"offset":0.0},{"width":0.7778,"offset":0.0},{"width":0.7667,"offset":-0.0019},{"width":0.7444,"offset":-0.0019},{"width":0.7815,"offset":-0.0019},{"width":0.8259,"offset":-0.0019},{"width":0.8444,"offset":0.0},{"width":0.937,"offset":-0.0019},{"width":0.8296,"offset":0.0},{"width":0.8259,"offset":-0.0019},{"width":0.9185,"offset":0.0},{"width":0.9889,"offset":-0.0019},{"width":1.0,"offset":0.0}],"arbalete":[{"width":0.8804,"offset":0.0018},{"width":0.8768,"offset":0.0},{"width":0.8986,"offset":0.0},{"width":0.8949,"offset":0.0018},{"width":0.9022,"offset":-0.0018},{"width":0.8841,"offset":0.0},{"width":0.8913,"offset":0.0},{"width":0.8877,"offset":-0.0018},{"width":0.9022,"offset":0.0018},{"width":0.9239,"offset":-0.0018},{"width":0.9203,"offset":0.0},{"width":0.8949,"offset":-0.0018},{"width":0.9094,"offset":-0.0018},{"width":0.9348,"offset":0.0},{"width":0.9529,"offset":-0.0018},{"width":0.9457,"offset":-0.0018},{"width":0.9384,"offset":-0.0018},{"width":0.9819,"offset":-0.0018},{"width":0.9493,"offset":0.0},{"width":0.9964,"offset":0.0018}]};

// Calibration à deux ouvriers, sans accélérateurs ni bonus, ressources disponibles.
const STORAGE_CAPS_023=[15000,23000,35000,52000,80000,115000,165000,235000,330000,460000,640000,880000,1200000,1600000,2150000,2850000,3750000,4900000,6300000,8000000];
const CONSTRUCTION_SCALE_023=1.0724553732667417;
const CONSTRUCTION_WEIGHTS_023={"core":2.2,"mine":0.75,"extracteur":0.75,"forge":1.2,"academie":1.2,"reserve":1.5,"reservoir":1.5,"garnison":1,"caserne-heros":1,"atelier-monstres":1.2,"mana":1,"garde-monstres":1,"archers":1,"arbalete":1,"baliste":1,"poison":1,"glace":1,"mortier":1,"soin":1,"necropole":1,"electricite":1,"obelisque":1,"antimagie":1,"infernale":1,"gardien":1,"trap-6":0.4,"trap-8":0.4,"trap-36":0.4,"trap-9":0.4,"trap-17":0.4,"trap-34":0.4,"trap-14":0.4,"trap-16":0.4,"trap-3":0.4,"trap-24":0.4,"barricade":0.6};
// Révision ciblée : réduction de 10 % pour l'arrivée aux niveaux 2–7,
// 12 % aux niveaux 8–11, et majorations pour les niveaux 13–20.
// Les pièges, barricades, étages et héros restent au barème 0.25 précédent.
function constructionLevelMultiplier026(to){return to>=2&&to<=7?.90:to>=8&&to<=11?.88:to===13?1.10:to===14?1.15:to===15?1.20:to===16?1.30:to===17?1.40:to>=18&&to<=20?1.50:1;}
function constructionSeconds023(type,to){
 const base=to<=4?Math.round([0,1800,1800,8271,20181][to]/4):Math.round(3600*1.34**(to-5)*(CONSTRUCTION_WEIGHTS_023[type]||1)*CONSTRUCTION_SCALE_023);
 if(type==='centre-bataille'||type==='batiment-alliance'){const fastest=to<=4?base:Math.round(3600*1.34**(to-5)*.75*CONSTRUCTION_SCALE_023);return Math.max(1,Math.round(fastest*constructionLevelMultiplier026(to)*.65));}
 const eligible=Object.hasOwn(CONSTRUCTION_WEIGHTS_023,type)&&type!=='barricade'&&!type.startsWith('trap-');
 return eligible?Math.max(1,Math.round(base*constructionLevelMultiplier026(to))):base;
}
function floorSeconds023(floor,level){const unlock=[1,1,3,5,7,10,13,16,20][floor-1]||level;return unlock<=4?450:Math.round(3600*1.34**(unlock-5)*1.5*CONSTRUCTION_SCALE_023);}


// Version de l’application distincte du format des sauvegardes.
const APPLICATION_VERSION='0.30.9';
const VERSION='0.5.1';
const DAY=86400000;
// Dimensions de secours ; le château réel utilise castleSize(niveau).
const GRID={w:12,h:3};
// Quotas et portées sont deux réglages indépendants : antimagie = ±2 étages.
const DEFENSE_PROFILES=Object.freeze({
 archers:{levels:[1,8,15],damage:22,interval:[3.2,1.3],range:[1,2.5],floors:[1,2],description:'Flèches sur une cible. La portée part des bords de la structure.'},
 arbalete:{levels:[2,9,16],damage:18,interval:[3,1.15],range:[1,1],floors:[1,1],description:'Arbalète pivotante : une case de portée dans toutes les directions.'},
 baliste:{levels:[3,12],damage:10,interval:[4.5,1.8],range:[3,6],floors:[0,0],description:'Traverse les cibles de sa ligne, vers la porte, sur son étage.'},
 poison:{levels:[5,12],damage:1,interval:[4,1.8],range:[1.25,2.5],floors:[1,1],description:'Alterne ses cibles. Poison léger, prolongé avec le niveau ; ne se cumule pas.'},
 glace:{levels:[6,14],damage:0,interval:[2.8,1.2],range:[1,2.5],floors:[1,1],description:'Aucun dégât. Gèle une cible 0,1 seconde ; protège contre le gel en chaîne.'},
 mortier:{levels:[7,15],damage:5,interval:[5.5,2.8],range:[2,3.5],floors:[0,0],description:'Tir vertical en sous-munitions : deux cases de largeur totale sur son étage.'},
 soin:{levels:[8],damage:0,interval:[6,3],range:[1,2.5],floors:[0,0],description:'Soigne les structures alliées de son étage.'},
 necropole:{levels:[10],damage:13,interval:[4.5,2],range:[1,2.5],floors:[1,1],description:'Défense spectrale ; aucune résurrection payante.'},
 electricite:{levels:[11,17],damage:28,interval:[4.4,1.7],range:[2,3.5],floors:[1,3],description:'Boule de magie électrique puissante sur une seule cible.'},
 obelisque:{levels:[12],damage:0,interval:[5,2.5],range:[1,2.5],floors:[0,0],description:'Protège les alliés de son étage.'},
 antimagie:{levels:[14],damage:1,interval:[4.5,1.9],range:[3,4.2],floors:[2,2],description:'Très faibles dégâts. Les héros ennemis à portée, jusqu’à deux étages au-dessus et en dessous, ne peuvent lancer de sort.'},
 infernale:{levels:[16],damage:30,interval:[4.2,1.5],range:[2,3.5],floors:[1,2],description:'Projectiles de feu sur une seule cible.'},
 gardien:{levels:[18],damage:45,interval:[3.5,1.5],range:[.65,.65],floors:[0,0],description:'Patrouille uniquement son étage. Ne cohabite pas avec un héros en garnison.'}
});
const DEFENSES=Object.entries(DEFENSE_PROFILES).map(([id,p])=>({id,name:({archers:'Tour d’archers',arbalete:'Arbalète',baliste:'Baliste',canon:'Canon lourd',poison:'Tour empoisonnée',glace:'Tour de glace',mortier:'Mortier',soin:'Tour de soin',necropole:'Nécropole',electricite:'Tour électrique',obelisque:'Obélisque protecteur',antimagie:'Tour antimagie',infernale:'Tour infernale',gardien:'Gardien mécanique'})[id],icon:'✦',damage:p.damage,interval:p.interval[0],range:p.range[0],effect:({baliste:'pierce',canon:'area',poison:'poison',glace:'microfreeze',mortier:'mortar',soin:'heal',obelisque:'shield',antimagie:'antimagic'})[id]||'single',hp:id==='gardien'?640:220,cost:250+p.damage*9,description:p.description,unlock:p.levels[0]}));
const RETIRED_DEFENSE_IDS=Object.freeze(['flammes','statue','caserne','canon']);
const LEGACY_HEROES=[['gorvak','Gorvak','Berserker','rage',800,52],['tharos','Tharos','Gardien','shield',1000,18],['brakk','Brakk','Destructeur','siege',760,65],['nyra','Nyra','Assassine','assassin',350,76],['ignara','Ignara','Pyromancienne','fire',330,48],['sylvara','Sylvara','Chasseuse','pierce',380,60],['kryos','Kryos','Maître du Givre','freeze',460,20],['voltra','Voltra','Tempête','disable',440,45],['morghul','Morghul','Nécromancien','summon',430,24],['elyra','Elyra','Guérisseuse','heal',420,9],['tiko','Tiko','Héros constructeur','disarm',180,5],['vexa','Vexa','Illusionniste','decoy',350,33],['aegis','Aegis','Automate de guerre légendaire','legend-shield',1100,35],['lyrion','Lyrion','Mage fantôme légendaire','legend-command',620,65],['vitalis','Vitalis','Colosse de cristal légendaire','legend-life',850,24],['valdorn','Valdorn','Bastion légendaire','legend-tank',1500,28]].map(([id,name,role,power,hp,damage],i)=>({id,name,role,power,hp,damage,abilities:i>=12?3:2,legendary:i>=12,priceDiamonds:([2400,3600,4800,6000,7200,8400,9600,10800,12000][Math.min(i,8)]),icon:['⚔','⛨','⚒','⌁','♨','➶','❄','ϟ','☠','✚','⚙','◇','⛨','⚔','✦','♜'][i]}));
const HEROES=HERO_PROFILES.map(p=>({...p,damage:p.atk,priceDiamonds:p.price,power:p.mechanic,legendary:p.tier==='Légendaire',abilities:p.mechanic==='support'||p.id==='tanuki'?0:1,active:true,color:({morghul:'#bc76ee',chacal:'#ffe275',drac:'#ff8544',ignara:'#ff7955',kryos:'#86dcff',vexa:'#d797ff',elyra:'#85f3ba'})[p.id]||'#ffce62',range:['mage','revive','chacal'].includes(p.mechanic)?2:p.mechanic==='drac'?4:.55}));
for(const h of LEGACY_HEROES)if(!HEROES.some(p=>p.id===h.id))HEROES.push({...h,active:false,tier:'Archive',description:'Héros conservé pour les récompenses et sauvegardes existantes.'});
const TROOPS=[['fantassin','Fantassin',180,24,1.15],['bouclier','Porte-bouclier',340,13,.85],['archer','Archer',110,30,1.1],['mage','Mage',100,36,1.05],['berserker','Berserker',220,40,1.25],['eclaireur','Éclaireur',90,18,1.7],['sapeur','Sapeur',120,65,1],['pretre','Prêtre',120,8,1],['brise-mur','Brise-mur',360,43,.75]].map(([id,name,hp,damage,speed])=>({id,name,hp,damage,speed,shortcut:id==='eclaireur'}));
const RETIRED_TRAP_IDS=Object.freeze([0,1,2,4,5,7,10,11,12,13,15,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,35].map(n=>'trap-'+n));
const TRAP_UNLOCKS=Object.freeze({'trap-6':[2,6,12],'trap-8':[3],'trap-36':[4,9],'trap-9':[5,11],'trap-17':[6,13],'trap-34':[7],'trap-14':[8],'trap-16':[10,16],'trap-3':[12],'trap-24':[14]});
const TRAPS=[
 ['trap-6','Boue collante','slow',0,3],['trap-8','Piques dissimulées','damage',35,0],['trap-36','Bombe à retardement','bomb',12,.3],['trap-9','Trappe de chute','fall',0,0],['trap-17','Roue dentée','damage',28,0],['trap-34','Marteau suspendu','damage',45,0],['trap-14','Brume toxique','poison',2,5],['trap-16','Chaînes spectrales','freeze',0,1],['trap-3','Sceau runique','freeze',0,1.2],['trap-24','Siphon magique','mana-drain',0,0]
].map(([id,name,effect,damage,duration])=>({id,name,effect,damage,duration,slow:.45,icon:'✦',cost:180+TRAP_UNLOCKS[id][0]*90,unlock:TRAP_UNLOCKS[id][0],surface:id==='trap-36'}));
const BUILDINGS=[
 ['core','Cœur de la forteresse','♜',3,900,'Déverrouille les niveaux, les étages et les cases du château.',1],
 ['mine','Mine d’or','◈',2,320,'Produit de l’or à récolter.',1],
 ['extracteur','Extracteur d’élixir','⚗',2,320,'Produit de l’élixir à récolter.',1],
 ['forge','Forge','⚒',2,420,'Permet la progression des structures.',1],
 ['academie','Académie','✦',2,420,'Étudie les monstres et améliore leurs niveaux.',1],
 ['reserve','Réserve d’or','▣',3,500,'Augmente la capacité de stockage de l’or.',1],
 ['reservoir','Réservoir d’élixir','⬡',3,500,'Augmente la capacité de stockage de l’élixir.',1],
 ['garnison','Caserne de monstres','⚑',2,600,'Recrute les monstres de ton armée. Ils ne défendent pas le château.',1],
 ['caserne-heros','Garnison de héros','♛',2,600,'Accueille un héros qui défend cet étage et participe aux attaques. Autorise un héros jusqu’à deux niveaux au-dessus de la garnison.',1],
 ['atelier-monstres','Académie','⚙',2,420,'Accès compatible à l’Académie : déblocages et Level up des monstres.',2],
 ['mana','Réservoir de mana','✧',2,420,'Stocke le mana des compétences. Se régénère après le combat ; jamais pillable.',3],
 ['garde-monstres','Garnison de monstres','⛨',2,600,'Réserve jusqu’à quatre monstres à la défense de cet étage.',3],
 ['centre-bataille','Centre de bataille','⚔',2,500,'Débloque les fonctions de combat. Bâtiment provisoire niveau 1 pour les 20 niveaux.',3],
 ['batiment-alliance','Bâtiment d’alliance','⚑',2,500,'Obligatoire pour accéder au clan. Apparence niveau 1 provisoire pour tous les niveaux.',5]
].map(([id,name,icon,width,hp,description,unlock])=>({id,name,icon,width,hp,description,unlock}));
const BARRICADE={id:'barricade',name:'Barricade renforcée',icon:'⛨',width:1,hp:2200,cost:650,description:'Bloque le passage jusqu’à sa destruction. Quatre barricades au maximum.'};
const CASTLE_TIERS=[
 {min:1,max:1,floors:3,slots:12},{min:2,max:2,floors:4,slots:12},{min:3,max:6,floors:4,slots:14},
 {min:7,max:9,floors:5,slots:14},{min:10,max:12,floors:6,slots:16},
 {min:13,max:16,floors:7,slots:16},{min:17,max:20,floors:8,slots:18}
];
const SPEEDUPS=[60,300,900,1800,3600,10800,86400,259200,604800];
const RULES={maxLevel:20,clanMinLevel:5,clanPrice:500,clanCapacity:30,weeklyClose:'Monday 00:00 UTC',prototype:true};
const CHALLENGES=['Lancer une attaque','Gagner un combat','Collecter de l’or','Collecter de l’élixir','Améliorer une structure','Placer une défense','Placer un piège','Publier sa défense','Utiliser un accélérateur','Ouvrir le calendrier','Terminer 2 aventures','Terminer 3 aventures','Améliorer un héros','Former une armée','Atteindre le niveau 2','Améliorer la mine','Améliorer l’extracteur','Détruire 5 structures','Gagner 3 combats','Ouvrir une fiche de héros'];

// Calibration 0.5 : presque la même marche, mais des cadences distinctes.
for(const t of TROOPS){t.speed=({bouclier:.95,'brise-mur':.9,eclaireur:1.2})[t.id]||1.05;t.attackInterval=({berserker:.65,eclaireur:.7,archer:.85,mage:1.2,sapeur:1.5,'brise-mur':1.6})[t.id]||1;}
Object.assign(TROOPS.find(t=>t.id==='eclaireur'),{name:'Pilleur',hp:95,damage:22,speed:1.08,attackInterval:.8,role:'pillage',carry:200});
const DECORATIONS=['lantern','planter','fountain','banner','brazier'].map((id,i)=>({id:'decor-'+id,name:['Lanterne','Jardinière','Fontaine','Bannière','Brasero'][i],asset:'decor:'+id,width:1,hp:40+i*5,cost:40+i*15,maxInstances:id==='fountain'?1:2,requiresClan:id==='banner',description:id==='banner'?'Bannière portant le blason de ton clan.':'Décoration de sol destructible. Deux au maximum par étage.'}));
const COSMETICS=[
 {id:'background-astral',kind:'background',name:'Val d’Astral',asset:'scene:landscape',price:0},
 {id:'background-forest',kind:'background',name:'Forêt enchantée',asset:'cosmetic:background-forest',price:1500},
 {id:'background-aurora',kind:'background',name:'Vallée des aurores',asset:'cosmetic:background-aurora',price:1500},
 {id:'background-embers',kind:'background',name:'Terres de braise',asset:'cosmetic:background-embers',price:1500},
 {id:'background-meadow',kind:'background',name:'Prairie des géants',asset:'cosmetic:background-meadow',price:1500},
 {id:'background-desert',kind:'background',name:'Oasis des deux soleils',asset:'cosmetic:background-desert',price:1500},
 {id:'skin-astral',kind:'skin',name:'Citadelle d’Astral',asset:'castle:skin-astral:5',price:0},
 {id:'skin-frost',kind:'skin',name:'Cour royale',asset:'castle:skin-frost:5',price:320,bonus:{production:.005},bonusLabel:'+0,5 % de production des mines'},
 {id:'skin-obsidian',kind:'skin',name:'Citadelle d’obsidienne',asset:'castle:skin-obsidian:5',price:400,bonus:{defenseAttack:.005},bonusLabel:'+0,5 % de dégâts des défenses'},
 {id:'skin-castillet',kind:'skin',name:'Castillet',asset:'castle:skin-castillet:5',price:1500,bonus:{buildingHP:.01},bonusLabel:'+1 % de vie des bâtiments'},
 {id:'background-campagne-terre',kind:'background',name:'Paysage de Terre',asset:'cosmetic:background-campagne-terre',price:0,campaignReward:true,zoneName:'Terre'},
 {id:'skin-campagne-terre',kind:'skin',name:'Citadelle de Terre',asset:'castle:skin-campagne-terre:5',price:0,campaignReward:true,zoneName:'Terre'},
 {id:'background-campagne-bois',kind:'background',name:'Paysage de Bois',asset:'cosmetic:background-campagne-bois',price:0,campaignReward:true,zoneName:'Bois'},
 {id:'skin-campagne-bois',kind:'skin',name:'Citadelle de Bois',asset:'castle:skin-campagne-bois:5',price:0,campaignReward:true,zoneName:'Bois'},
 {id:'background-campagne-braise',kind:'background',name:'Paysage de Braise',asset:'cosmetic:background-campagne-braise',price:0,campaignReward:true,zoneName:'Braise'},
 {id:'skin-campagne-braise',kind:'skin',name:'Citadelle de Braise',asset:'castle:skin-campagne-braise:5',price:0,campaignReward:true,zoneName:'Braise'},
 {id:'background-campagne-givre',kind:'background',name:'Paysage de Givre',asset:'cosmetic:background-campagne-givre',price:0,campaignReward:true,zoneName:'Givre'},
 {id:'skin-campagne-givre',kind:'skin',name:'Citadelle de Givre',asset:'castle:skin-campagne-givre:5',price:0,campaignReward:true,zoneName:'Givre'},
];
const LEGEND_SPELL_ICONS={aegis:['spell:tharos-1'],aigle:['spell:tiko-1'],chacal:['spell:morghul-1'],drac:['spell:ignara-1'],jiangshi:['spell:morghul-2'],nian:['spell:gorvak-1'],tanuki:['spell:nyra-2'],tarasque:['spell:tharos-1'],tortue:['spell:tharos-2'],lyrion:['spell:gorvak-2','spell:brakk-1','spell:tiko-1'],vitalis:['spell:elyra-1','spell:tharos-1','spell:vexa-2'],valdorn:[]};
const COMMERCIAL_RULES={doorDelay:.3,replayTTL:48*3600000,shareDailyLimit:10,reportRetention:30*DAY,decorationsPerFloor:2,maxBanMinutes:2880,shareTimezone:'Europe/Paris'};
const EMBLEM_COLORS=['#21799d','#b84343','#7853a6','#3e8156','#d0a340','#d97337','#3c455f','#e4dcc0'];
const EMBLEM_SIGNS=['✦','♜','⚔','☽','◇'];

const TROOP_UNLOCKS=Object.freeze({fantassin:1,bouclier:1,archer:3,mage:4,berserker:5,eclaireur:6,sapeur:7,pretre:8,'brise-mur':10});
const HERO_HOUSING_UNLOCKS=Object.freeze([1,5,9,14]);
const HERO_REWARDS=Object.freeze({starter:'gorvak',campaign:[{stage:8,hero:'tharos'},{stage:16,hero:'brakk'}],loyalty:['nyra','aigle',['tiko','morghul','kryos']]});
for(const t of TROOPS)t.unlock=TROOP_UNLOCKS[t.id];
Object.assign(TROOPS.find(t=>t.id==='brise-mur'),{hp:560,speed:.7,attackInterval:2.2,structurePercent:.15,barricadePercent:.35,role:'siege'});

const DIAMOND_PACKS=Object.freeze([[100,.99],[500,4.49],[1200,9.99],[2500,19.99],[6500,49.99],[14000,99.99]].map(([diamonds,euros])=>Object.freeze({id:'pack-'+diamonds,diamonds,euros,savingsPercent:Math.max(0,Math.round((1-(euros/diamonds)/(.99/100))*100))})));
const CASTLE_SKIN_FRAMES=Object.freeze(Object.fromEntries(['skin-astral','skin-frost','skin-obsidian','skin-castillet','skin-campagne-terre','skin-campagne-bois','skin-campagne-braise','skin-campagne-givre'].map(id=>[id,Object.freeze(Object.fromEntries(((id==='skin-castillet'||id.startsWith('skin-campagne-'))?[3,4,5,6,7,8,9,10,11]:[5,6,7,8,9]).map(f=>[f,'castle:'+id+':'+f])))])));





// Castillet : façade dédiée pour chacune des hauteurs réellement constructibles.
const CASTILLET_HEIGHT_ASSETS=Object.freeze(Object.fromEntries(Array.from({length:9},(_,i)=>[i+3,'castle:skin-castillet:'+(i+3)])));

// Rules shared by the local preview and the API foundation.
const REPLAY_HISTORY_LIMIT_025=15;
const CHAT_COLORS_025=Object.freeze(['#ff9292','#89c7ff','#a1e69c','#ffd879','#d7aeff','#82e2dd']);
const CHAT_PRESENCE_LEASE_MS_025=90000;
function joinChatPresence025(rows,{sessionId,playerId,now=Date.now()}){
 if(!sessionId||!playerId)throw Error('Session de discussion invalide.');
 const active=rows.filter(r=>r.expiresAt>now),same=active.find(r=>r.sessionId===sessionId),player=active.find(r=>r.playerId===playerId),counts=Array(6).fill(0),seen=new Set();
 for(const r of active)if(!seen.has(r.playerId)){seen.add(r.playerId);counts[r.color]++;}
 const color=same?.color??player?.color??counts.indexOf(Math.min(...counts)),entry={sessionId,playerId,color,expiresAt:now+CHAT_PRESENCE_LEASE_MS_025};
 return {entry,rows:[...active.filter(r=>r.sessionId!==sessionId),entry]};
}
function recentBattles025(rows){return rows.map((row,index)=>({row,index})).sort((a,b)=>(b.row.completedAt||b.row.createdAt||b.row.at||0)-(a.row.completedAt||a.row.createdAt||a.row.at||0)||a.index-b.index).slice(0,REPLAY_HISTORY_LIMIT_025).map(x=>x.row);}
function validClanEmblem025(e){return !!e&&Number.isInteger(e.shape)&&e.shape>=0&&e.shape<6&&Number.isInteger(e.insignia)&&e.insignia>=0&&e.insignia<6&&Number.isInteger(e.color)&&e.color>=0&&e.color<8;}
function homePatrolRoster025(layout,roster,levels={}){
 const result=(layout.garrisons||[]).map((g,i)=>({id:'patrol:'+g.id,hero:g.hero,floor:g.floor,homeX:g.x,slot:i,level:g.level,side:'home'}));
 const monsters=roster.filter(r=>r.count>0),counts=Array(layout.floors).fill(0);for(const g of layout.monsterGarrisons||[]){const house=layout.buildings.find(h=>h.id===g.houseId),floor=house?.floor??g.floor;if(floor>=0&&floor<layout.floors&&counts[floor]<5){counts[floor]++;result.push({id:'patrol:guard:'+g.id,troop:g.troop,level:g.level||1,floor,slot:result.length,guard:true,side:'home'});}}let cursor=0;
 for(let n=0;n<layout.floors*5;n++){
  const group=monsters[cursor%Math.max(1,monsters.length)];if(!group)break;
  const represented=result.filter(a=>a.troop===group.troop&&!a.guard).length;if(represented>=group.count){if(monsters.every(r=>result.filter(a=>a.troop===r.troop&&!a.guard).length>=r.count))break;cursor++;n--;continue;}
  const floor=counts.indexOf(Math.min(...counts));if(counts[floor]>=5)break;counts[floor]++;result.push({id:'patrol:'+group.troop+':'+represented,troop:group.troop,level:levels[group.troop]||group.level||1,floor,slot:result.length,side:'home'});cursor++;
 }
 return result;
}
function homePatrolPosition025(a,time,slots){
 const min=.55,max=Math.max(min,slots-1.15),span=max-min,speed=a.hero?.65:.8,offset=(a.slot*2.731+(a.homeX||0))%(span*2),p=((time*speed+offset)%(span*2)+span*2)%(span*2);
 return {x:min+(p<span?p:span*2-p),direction:p<span?1:-1,floor:a.floor};
}

const HERO_XP_RULES=Object.freeze({status:'calibration-provisoire',referenceDiamondEuros:149.98/20500,potionXP:500,potionDiamonds:45,budgets:{Commun:30,Rare:45,'Épique':55,'Légendaire':70},curveExponent:1.65});
function heroCombatStats(id,n){
 if(!Number.isInteger(n)||n<1||n>20)throw Error('Niveau de héros invalide.');
 const h=HERO_PROFILES.find(h=>h.id===id);if(!h)return null;
 const g=n-1,power={Commun:2.05,Rare:1.52,'Épique':1.22,'Légendaire':1.03}[h.tier]||1;
 let hp=h.hp*(1+.12*g),atk=h.atk*(1+.13*g),interval=(h.id==='valdorn'?2.8-1.1*g/19:2.8-1.6*g/19)*h.speed;
 if(id==='tiko'){hp*=.85;atk*=.85;}
 if(id==='tanuki')atk*=.98;
 if(id==='tharos'){hp*=1.08;atk-=1.5*g;}
 if(id==='tarasque')hp*=1.08;
 if(id==='jiangshi'){hp+=3*g;atk+=Math.min(g,5)*2+Math.max(0,Math.min(g,11)-5)*3+Math.max(0,g-11)*4;}
 if(id==='nyra')atk+=3*g;
 if(id==='drac'){hp+=13*g;atk-=h.atk*.13*.07*g;}
 if(['chacal','ignara','kryos','vexa'].includes(id))atk*=.7;
 if(id==='chacal')hp*=.95;
 if(['ignara','kryos','vexa'].includes(id)){atk*=.85;hp*=.93;}
 hp*=Math.sqrt(power);atk*=Math.sqrt(power);
 if(id==='tiko'){hp*=Math.sqrt(1.36);atk*=Math.sqrt(1.26);}
 if(h.mechanic==='healer')interval=Math.floor(Math.max(1.5,interval)*100)/100;
 const heal=[25,29,33,37,41,45,49,80,93,105,118,130,135,140,145,150,155,160,165,170][g];
 return {level:n,hp:Math.round(hp),damage:h.atk?Math.max(1,Math.round(atk)):0,interval:Math.round(interval*100)/100,attackInterval:Math.round(interval*100)/100,heal:h.mechanic==='healer'?heal:0,selfHeal:h.mechanic==='healer'?2*n:0,range:h.mechanic==='chacal'&&n>=12?3:['mage','revive','chacal'].includes(h.mechanic)?2:h.mechanic==='drac'?4:.55,mechanic:h.mechanic,trapImmune:h.mechanic==='healer',dodge:h.mechanic==='healer'?.03:0};
}
function heroXPTable(tier='Commun'){
 const budget=HERO_XP_RULES.budgets[tier]||30,total=Math.round(budget/HERO_XP_RULES.referenceDiamondEuros*500/45),weights=Array.from({length:19},(_,i)=>(i+1)**1.65),sum=weights.reduce((n,v)=>n+v,0),rows=weights.map((w,i)=>({from:i+1,to:i+2,xp:Math.floor(total*w/sum)}));
 let remainder=total-rows.reduce((n,r)=>n+r.xp,0);for(let i=18;remainder>0;i=(i+18)%19){rows[i].xp++;remainder--;}
 for(const row of rows)row.xp=Math.round(row.xp*(row.to<=3?2.3:row.to<=7?2.5:row.to<=14?3:3.4));
 return {tier,total:rows.reduce((n,r)=>n+r.xp,0),budget,rows,balanceVersion:'0.30.7',multiplierBasis:'target-level'};
}
function heroXPRequirement(id,from){if(!Number.isInteger(from)||from<1||from>=20)throw Error('Niveau maximum ou invalide.');return heroXPTable(HERO_PROFILES.find(h=>h.id===id)?.tier||'Commun').rows[from-1].xp;}
function heroSkillStats(id,n){
 const h=HERO_PROFILES.find(h=>h.id===id);if(!h)return [];const g=n-1,rows=[];
 const durations={aegis:2+.3*g,brakk:3+.2*g,drac:8,chacal:3+.3*g,tortue:3+.3*g,nyra:6};
 if(durations[id])rows.push({label:'Durée du sort',value:Math.round(durations[id]*10)/10,unit:'s'});
 if(id==='valdorn')rows.push({label:'Stockage et vitesse · cet étage',value:50+2*n,unit:'%'});
 if(id==='tanuki')rows.push({label:'Or par frappe sur une structure',value:30,unit:'or'},{label:'Supplément de pillage sur le stock',value:n,unit:'points de %'},{label:'Perte supplémentaire des réserves adverses',value:n*.25,unit:'points de %'});
 if(id==='chacal')rows.push({label:'Créatures invoquées',value:n>=12?3:2,unit:''});
 if(id==='elyra'){const s=heroCombatStats(id,n);rows.push({label:'Soin par impulsion',value:s.heal,unit:'PV'},{label:'Régénération propre',value:s.selfHeal,unit:'PV/s'});}
 if(id==='jiangshi')rows.push({label:'Soin du sort',value:10,unit:'% de PV max'});
 if(id==='tarasque')rows.push({label:'Barrière · 3 secondes',value:20,unit:'% de PV max'});
 if(id==='tiko')rows.push({label:'Réduction du coût',value:n*.5,unit:'%'},{label:'Réduction de durée',value:n,unit:'%'},{label:'Constructeur supplémentaire',value:1,unit:''});
 if(id==='aigle')rows.push({label:'Pièges repérés en avant',value:4,unit:'cases'});
 return rows;
}
function garrisonBonuses(layout,subject=null){
 const gs=(layout.garrisons||[]).filter(g=>!g.caserneId||Boolean(layout.buildings.find(h=>h.id===g.caserneId&&!h.underConstruction))),has=id=>gs.some(g=>g.hero===id),defense=subject&&['arbalete','archers','baliste','canon','mortier','glace','electricite','flammes','poison','infernale','statue','obelisque','soin','caserne','necropole','antimagie','gardien'].includes(subject.type),local=id=>gs.find(g=>g.hero===id&&subject&&g.floor===subject.floor),valdorn=local('valdorn'),mine=subject&&['mine','extracteur'].includes(subject.type),tarasque=local('tarasque');
 const ctx=layout.bonusContext326||{},scroll=id=>gs.filter(g=>ctx.equipped?.[g.hero]===id&&(!subject||g.floor===subject.floor)).reduce((n,g)=>Math.max(n,ctx.values?.[id]||0),0);
 const buildingHP=(ctx.vipHP||0)+(has('tortue')?.05:0)+(defense&&has('gargouille')?.05:0)+(subject?.type==='barricade'&&valdorn?.15:0),production=mine&&valdorn?(50+2*valdorn.level)/100:0;
 return {buildingHP,defenseAttack:defense?Number(has('drac'))*.05+Number(has('gargouille'))*.1+scroll('gargouille'):0,damageReduction:Math.min(.9,(tarasque?.05:0)+scroll('tarasque')),production,storage:production,productionSpeed:(1+production)*(1+(mine?scroll('valdorn'):0))-1,productionQuantity:0,attack:0,loot:0,raidLoss:.09,tiko:has('tiko'),armyHP:has('tortue')?.05:0,shieldBearerHP:has('tharos')?.05:0};
}
function heroPassiveLabels(layout,subject){
 const b=garrisonBonuses(layout,subject),rows=[];
 for(const g of layout.garrisons||[]){if(g.caserneId&&layout.buildings.find(h=>h.id===g.caserneId)?.underConstruction)continue;const local=subject.floor===g.floor;
  if(g.hero==='tortue')rows.push({hero:g.hero,text:'Vie des héros, monstres et bâtiments +5 %'});
  if(g.hero==='gargouille'&&b.defenseAttack)rows.push({hero:g.hero,text:'Défenses : attaque +10 % · vie +5 %'});
  if(g.hero==='drac'&&b.defenseAttack)rows.push({hero:g.hero,text:'Attaque des défenses +5 %'});
  if(g.hero==='valdorn'&&local&&['mine','extracteur'].includes(subject.type))rows.push({hero:g.hero,text:'Stockage et vitesse de production +'+(50+2*g.level)+' % · cet étage'});
  if(g.hero==='valdorn'&&local&&subject.type==='barricade')rows.push({hero:g.hero,text:'Vie des barricades +15 % · cet étage'});
  if(g.hero==='tarasque'&&local)rows.push({hero:g.hero,text:'Dégâts reçus par les structures −5 % · cet étage'});
  if(g.hero==='tiko')rows.push({hero:g.hero,text:'Coût des bâtiments −'+(g.level*.5)+' % · durée −'+g.level+' % · +1 constructeur'});
 }
 return rows;
}

// Règles partagées 0.21 : plan d'accélération exact et bonus de démarrage uniques.
const EARLY_LEVEL_GIFTS_021=Object.freeze([
 {level:1,items:{'speed-900':3,'speed-300':4}},
 {level:2,items:{'speed-900':1,'speed-300':2}},
 {level:3,items:{'speed-900':4,'speed-300':10}},
 {level:4,items:{'speed-900':1,'speed-300':2}},
 {level:5,items:{'speed-3600':24}},
 {level:6,items:{'speed-300':96,'speed-900':64,'speed-3600':24}},
 {level:7,items:{'speed-86400':3}}
]);
function applyEarlyLevelGifts021(input,level){
 const inventory={...(input.inventory||{})},claims=[...(input.earlyLevelGiftClaims021||[])],granted=[],supplements=[...(input.earlyLevelGiftSupplementClaims0307||[])];
 if(level>=3&&claims.includes(3)&&!supplements.includes(3)){for(const [id,n]of Object.entries({'speed-300':8,'speed-900':3}))inventory[id]=(inventory[id]||0)+n;supplements.push(3);granted.push('supplement-3');}
 for(const gift of EARLY_LEVEL_GIFTS_021)if(level>=gift.level&&!claims.includes(gift.level)){
  for(const [id,count]of Object.entries(gift.items))inventory[id]=(inventory[id]||0)+count;
  claims.push(gift.level);granted.push(gift.level);if(gift.level===3&&!supplements.includes(3))supplements.push(3);
 }
 return {inventory,earlyLevelGiftClaims021:claims,earlyLevelGiftSupplementClaims0307:supplements,granted};
}
function smartSpeedupPlan021(inventory,seconds){
 const target=Math.max(0,Math.ceil(Number(seconds)||0));
 const choices=Object.entries(inventory||{}).filter(([id,n])=>/^speed-\d+$/.test(id)&&Number.isSafeInteger(n)&&n>0)
  .map(([id,count])=>({id,count,seconds:Number(id.slice(6))})).filter(c=>Number.isSafeInteger(c.seconds)&&c.seconds>0).sort((a,b)=>b.seconds-a.seconds);
 const output=items=>{const total=items.reduce((n,i)=>n+i.seconds*i.count,0);return {items,seconds:total,remainingSeconds:Math.max(0,target-total),wastedSeconds:Math.max(0,total-target)};};
 if(!target||!choices.length)return output([]);
 const gcd=(a,b)=>b?gcd(b,a%b):a,unit=choices.reduce((n,c)=>gcd(n,c.seconds),0),waste=Math.max(60,Math.min(300,target*.1)),limit=Math.floor((target+waste)/unit);
 // L'algorithme reste borné même avec un inventaire importé démesuré.
 if(limit>100000){let left=target;const items=[];for(const c of choices){const count=Math.min(c.count,Math.floor(left/c.seconds));if(count){items.push({...c,count});left-=count*c.seconds;}}return output(items);}
 const cost=new Int32Array(limit+1);cost.fill(0x3fffffff);cost[0]=0;const paths=Array(limit+1).fill(null);
 for(let index=0;index<choices.length;index++){
  const c=choices[index],weight=c.seconds/unit;let left=Math.min(c.count,Math.floor(limit/weight)),chunk=1;
  while(left){const count=Math.min(chunk,left),w=weight*count;left-=count;chunk*=2;
   for(let at=limit;at>=w;at--)if(cost[at-w]+count<cost[at]){cost[at]=cost[at-w]+count;paths[at]={index,count,prev:paths[at-w]};}
  }
 }
 let chosen=-1;for(let at=Math.ceil(target/unit);at<=limit;at++)if(cost[at]<0x3fffffff){chosen=at;break;}
 if(chosen<0)for(let at=Math.min(limit,Math.floor(target/unit));at>=0;at--)if(cost[at]<0x3fffffff){chosen=at;break;}
 const used=new Map();for(let path=paths[chosen];path;path=path.prev)used.set(path.index,(used.get(path.index)||0)+path.count);
 return output([...used].map(([index,count])=>({...choices[index],count})).sort((a,b)=>b.seconds-a.seconds));
}
function clampSceneCamera021(camera,viewport,bounds){
 const minZoom=Math.max(.65,viewport.width/bounds.width,viewport.height/bounds.height),z=Math.min(2.4,Math.max(minZoom,Number(camera?.z)||1));
 const clamp=(value,low,high)=>Math.min(high,Math.max(low,Number(value)||0));
 return {z,x:clamp(camera?.x,viewport.width-(bounds.x+bounds.width)*z,-bounds.x*z),y:clamp(camera?.y,viewport.height-(bounds.y+bounds.height)*z,-bounds.y*z),minZoom};
}

const CONSTRUCTION_020=Object.freeze({maxFloors:10,firstExtraWorkers:1,nextExtraWorkers:2,fiveMinuteDiamonds:10,surcharge:.005});
function constructionWorkers(job){return Math.max(1,Number(job?.workers)||(job?.floorJob&&job.floor>=5?2:1));}
function occupiedBuilders(jobs=[]){return jobs.reduce((n,j)=>n+constructionWorkers(j),0);}
function floorWorkers(currentFloors){return currentFloors>=4?2:1;}
function structureLimit020(type,level){if(TRAP_UNLOCKS[type])return TRAP_UNLOCKS[type].filter(n=>n<=level).length;if(DEFENSE_PROFILES[type])return DEFENSE_PROFILES[type].levels.filter(n=>n<=level).length;const d=DECORATIONS.find(d=>d.id===type);return d?d.maxInstances:null;}
function speedupPlan(inventory,seconds){
 return smartSpeedupPlan021(inventory,seconds);
}
function consumeSpeedupPlan(inventory,items){const next={...inventory};if(!Array.isArray(items)||!items.length)throw Error('Choisis un accélérateur.');let seconds=0;for(const item of items){const duration=Number(item.id?.slice(6));if(!/^speed-\d+$/.test(item.id)||!Number.isInteger(item.count)||item.count<1||!duration||!(next[item.id]>=item.count))throw Error('Accélérateur indisponible.');next[item.id]-=item.count;seconds+=duration*item.count;}return {inventory:next,seconds};}
function cosmeticBonuses(cosmetics){return {...(COSMETICS.find(c=>c.id===cosmetics?.skin)?.bonus||{})};}
function cleanTestLayout020(input){
 const l=structuredClone(input);for(const [key,catalog]of [['buildings',BUILDINGS],['defenses',DEFENSES],['traps',TRAPS],['decorations',DECORATIONS]])l[key]=(l[key]||[]).filter(o=>catalog.some(c=>c.id===o.type));
 l.floors=Math.min(10,l.floors);l.relocation??=[];
 for(const key of ['defenses','traps','decorations']){const seen={};l[key]=l[key].filter(item=>{const limit=structureLimit020(item.type,l.castleLevel);seen[item.type]=(seen[item.type]||0)+1;if(limit!==null&&seen[item.type]>limit){l.relocation.push({list:key,item,reason:'Limite du catalogue 0.20'});return false;}return true;});}
 for(const key of ['buildings','defenses','traps','decorations','barricades','garrisons']){const above=(l[key]||[]).filter(o=>o.floor>=l.floors);for(const item of above)l.relocation.push({list:key,item});l[key]=(l[key]||[]).filter(o=>o.floor<l.floors);for(const o of l[key])o.y=l.floors-1-o.floor;}
 l.garrisons=l.garrisons.filter(g=>!g.caserneId||l.buildings.some(h=>h.id===g.caserneId));l.monsterGarrisons=(l.monsterGarrisons||[]).filter(g=>l.buildings.some(h=>h.id===g.houseId));
 l.doors=(l.doors||[]).slice(0,l.floors);l.path=Array.from({length:l.floors*l.slots},(_,i)=>{const f=Math.floor(i/l.slots),x=i%l.slots;return {x:f%2?l.slots-1-x:x,y:l.floors-1-f};});return l;
}

const ECONOMY_RULES=Object.freeze({version:'0.13.0',storageBase:15000,storageGrowth:1.6,raidGain:.13,raidLoss:.09,guardedRaidLoss:.05,floorRate:1,spawnInterval:.15,cellPixels:64.125,floorPixels:112,heroEuroReferenceDiamonds:120});
const CONSTRUCTION_RATES=Object.freeze({core:1,reserve:.75,reservoir:.75,mine:.2,extracteur:.2,forge:.4,academie:.5,garnison:.45,'atelier-monstres':.6,'caserne-heros':.45,barricade:.3,'centre-bataille':.2,'batiment-alliance':.2});
function storageCapacity(level){if(!Number.isInteger(level)||level<1||level>20)throw Error('Niveau de stockage invalide.');return STORAGE_CAPS_023[level-1];}
function constructionQuote(type,from){
 if(type.startsWith('decor-')&&from>=1)throw Error('Les décorations restent au niveau 1.');
 if(!Number.isInteger(from)||from<0||from>=20)throw Error('Niveau de construction invalide.');
 const level=Math.max(1,from),rate=CONSTRUCTION_RATES[type]??.3,base=storageCapacity(level);
 return {from,to:from+1,rate,referenceLevel:level,referenceCapacity:base,gold:Math.round(base*rate/(from+1<=4?3:1)),elixir:Math.round(base*rate/(from+1<=4?3:1)),durationSeconds:type.startsWith('decor-')?0:constructionSeconds023(type,from+1)};
}
function floorConstructionQuote(floor,level,caps={}){
 const goldCap=caps.gold??storageCapacity(level),elixirCap=caps.elixir??storageCapacity(level);
 if(!Number.isSafeInteger(goldCap)||!Number.isSafeInteger(elixirCap)||goldCap<0||elixirCap<0)throw Error('Capacité de stockage invalide.');
 return {floor,rate:ECONOMY_RULES.floorRate,gold:goldCap,elixir:elixirCap,referenceGoldCapacity:goldCap,referenceElixirCapacity:elixirCap,durationSeconds:floorSeconds023(floor,level)};
}
function heroBonuses(ids=[]){return garrisonBonuses({garrisons:ids.map(hero=>({hero,level:1,floor:0})),buildings:[]});}
function defenseHeroBonuses(layout,subject=null){const b=garrisonBonuses(layout,subject),c=cosmeticBonuses(layout.cosmetics);return {...b,buildingHP:b.buildingHP+(c.buildingHP||0),defenseAttack:b.defenseAttack+(c.defenseAttack||0),production:b.production+(c.production||0),productionSpeed:b.productionSpeed+(c.production||0),productionQuantity:b.productionQuantity};}
function raidReward(stock,{progress={gold:1,elixir:1},attackHeroes=[],defenseHeroes=[]}={}){
 const attack=heroBonuses(attackHeroes),defense=heroBonuses(defenseHeroes),gain={},loss={},minted={};
 for(const resource of ['gold','elixir']){
  const amount=stock?.[resource]??0,p=progress[resource]??0;
  if(!Number.isSafeInteger(amount)||amount<0||!Number.isFinite(p)||p<0||p>1)throw Error('Pillage invalide.');
  gain[resource]=Math.floor(amount*.13*(1+attack.loot)*p);loss[resource]=Math.floor(amount*defense.raidLoss*p);minted[resource]=gain[resource]-loss[resource];
 }
 return {gain,loss,minted,gainRate:.13*(1+attack.loot),lossRate:defense.raidLoss};
}
function battleRaidReward(b){
 if(b.loot0308)return PILLAGE0308.reward(b);
 const progress={gold:0,elixir:0};
 for(const [type,key]of [['reserve','gold'],['reservoir','elixir']]){const storage=b.structures.filter(d=>d.type===type),total=storage.reduce((a,d)=>a+d.maxHp,0);progress[key]=total?Math.min(1,storage.reduce((a,d)=>a+Math.max(0,d.maxHp-d.hp),0)/total):0;}
 const r=raidReward(b.defenderStock,{progress,attackHeroes:b.attackHeroes.filter(id=>id!=='tanuki'||b.units.some(u=>u.role==='pillage'&&(!b.manualDeployment||u.deployed))),defenseHeroes:b.defenseHeroes});if(b.heroTheft)for(const k of ['gold','elixir']){r.gain[k]+=Math.floor(b.heroTheft[k]);r.loss[k]=Math.min(b.defenderStock[k],r.loss[k]+Math.floor(b.heroTheft.loss[k]));r.minted[k]=r.gain[k]-r.loss[k];}return r;
}
function settleRaid(attacker,defender,{id,stock,progress,attackHeroes,defenseHeroes}){
 if(typeof id!=='string'||!id||id.length>120)throw Error('Identifiant de règlement invalide.');
 const key='raid:'+id,a=structuredClone(attacker),d=structuredClone(defender);
 if((a.processed||[]).includes(key)||(d.processed||[]).includes(key)){if(!(a.processed||[]).includes(key)||!(d.processed||[]).includes(key))throw Error('Règlement partiel à réconcilier.');return {attacker:a,defender:d,alreadySettled:true};}
 const r=raidReward(stock,{progress,attackHeroes,defenseHeroes});
 for(const k of ['gold','elixir']){if(d.wallet[k]<r.loss[k])throw Error('Stock réservé indisponible.');a.wallet[k]+=r.gain[k];d.wallet[k]-=r.loss[k];}
 a.processed=[...(a.processed||[]),key];d.processed=[...(d.processed||[]),key];return {attacker:a,defender:d,alreadySettled:false,reward:r};
}
function heroPrice(heroId){const h=HEROES.find(h=>h.id===heroId);if(!h)throw Error('Héros inconnu.');return h.priceDiamonds;}
function unitVisualOffset(unit){const i=unit.visualSlot??(Number(String(unit.id||'').replace(/\D/g,''))||0);return {x:(i%7-3)*.18,y:Math.floor(i/7)%4*5,z:Math.floor(i/7)%4};}

function builderHeroBonus(level=0){if(!Number.isInteger(level)||level<0||level>20)throw Error('Niveau de Tiko invalide.');return {cost:level*.005,duration:level*.01,extraBuilders:level>0?1:0};}
function constructionTeam(recruited,tikoLevel=0,jobs=[]){if(!Number.isInteger(recruited)||recruited<0||recruited>5)throw Error('Équipe de constructeurs invalide.');const bonus=builderHeroBonus(tikoLevel),total=recruited+bonus.extraBuilders;return {recruited,total,free:Math.max(0,total-occupiedBuilders(jobs)),canRemoveTiko:!bonus.extraBuilders||occupiedBuilders(jobs)<total};}
function discountedConstruction(quote,{tikoLevel=0,clanConstruction=0}={}){const b=builderHeroBonus(tikoLevel);if(!Number.isInteger(clanConstruction)||clanConstruction<0||clanConstruction>10)throw Error('Technologie invalide.');return {...quote,originalGold:quote.gold,originalElixir:quote.elixir,originalDurationSeconds:quote.durationSeconds,costReduction:b.cost,timeReduction:1-(1-b.duration)*(1-.02*clanConstruction),gold:Math.round(quote.gold*(1-b.cost)),elixir:Math.round(quote.elixir*(1-b.cost)),durationSeconds:Math.max(1,Math.round(quote.durationSeconds*(1-b.duration)*(1-.02*clanConstruction)))};}

// Conversion virtuelle commune à l'or et à l'élixir, indépendante des tarifs en euros.
const RESOURCE_SHOP=Object.freeze({unitsPerDiamond:1000,halfDiscount:.2});
function resourcePurchaseQuote(capacity,stock,fraction=.5){
 if(!Number.isSafeInteger(capacity)||capacity<1||!Number.isSafeInteger(stock)||stock<0||stock>capacity||![.5,1].includes(fraction))throw Error('Réserve invalide.');
 const amount=Math.min(capacity-stock,Math.floor(capacity*fraction)),regularPrice=Math.ceil(amount/RESOURCE_SHOP.unitsPerDiamond);
 const price=fraction===.5?Math.ceil(regularPrice*(1-RESOURCE_SHOP.halfDiscount)):regularPrice;
 return {amount,price,regularPrice,savingsPercent:regularPrice?Math.round((1-price/regularPrice)*100):0,fraction};
}
function missingResourceQuote(wallet,quote){
 const missing={};for(const k of ['gold','elixir']){if(!Number.isSafeInteger(wallet[k])||wallet[k]<0||!Number.isSafeInteger(quote[k]??0)||(quote[k]??0)<0)throw Error('Devis invalide.');missing[k]=Math.max(0,(quote[k]??0)-wallet[k]);}
 return {...missing,diamonds:Math.ceil(missing.gold/RESOURCE_SHOP.unitsPerDiamond)+Math.ceil(missing.elixir/RESOURCE_SHOP.unitsPerDiamond)};
}
function payConstructionWithDiamonds(wallet,quote){
 const missing=missingResourceQuote(wallet,quote);if(!Number.isSafeInteger(wallet.diamonds)||wallet.diamonds<missing.diamonds)throw Error('Diamants insuffisants.');
 return {...wallet,diamonds:wallet.diamonds-missing.diamonds,gold:Math.max(0,wallet.gold-(quote.gold??0)),elixir:Math.max(0,wallet.elixir-(quote.elixir??0))};
}
function constructionFinishPrice(endsAt,now=Date.now()){
 if(!Number.isFinite(endsAt)||!Number.isFinite(now))throw Error('Chantier invalide.');return Math.max(0,Math.ceil(Math.max(0,endsAt-now)/300000*CONSTRUCTION_020.fiveMinuteDiamonds*(1+CONSTRUCTION_020.surcharge)));
}




// Arbre acyclique : les prérequis portent sur le prochain niveau du bâtiment.
// L'Académie reste un alias compatible du Centre de recherche existant.
const BUILDING_REQUIREMENTS=Object.freeze({
 version:'0.17.0',startLevel:4,unrestricted:Object.freeze(['mine','extracteur','caserne-heros','academie','atelier-monstres']),
 researchTypes:Object.freeze(['reserve','reservoir','garnison','garde-monstres','mana']),
 researchAliases:Object.freeze(['atelier-monstres','academie'])
});
function buildingLevelContext(structures=[]){
 const levels={};
 for(const o of structures){if(!o?.type||o.underConstruction)continue;levels[o.type]=Math.max(levels[o.type]||0,o.level||0);}
 levels.research=Math.max(levels['atelier-monstres']||0,levels.academie||0);
 return levels;
}
function buildingUpgradeRequirements(type,targetLevel){
 if(!Number.isInteger(targetLevel)||targetLevel<2||targetLevel>20)throw Error('Niveau cible invalide.');
 const requirements=[];
 if(type!=='core')requirements.push({type:'core',name:'Cœur de la forteresse',level:targetLevel});
 if(targetLevel<4||BUILDING_REQUIREMENTS.unrestricted.includes(type)||type.startsWith('decor-'))return requirements;
 if(type==='core')requirements.push({type:'forge',name:'Forge',level:targetLevel-2});
 else if(type==='forge')requirements.push({type:'research',name:'Académie',level:targetLevel-2});
 else if(BUILDING_REQUIREMENTS.researchTypes.includes(type))requirements.push({type:'research',name:'Académie',level:targetLevel-1});
 else if(type==='barricade'||DEFENSES.some(d=>d.id===type)||TRAPS.some(t=>t.id===type))requirements.push({type:'forge',name:'Forge',level:targetLevel-1});
 return requirements;
}
function buildingUpgradeStatus({type,level,mainLevel,levels={}}){
 const rows=buildingUpgradeRequirements(type,level+1).map(r=>{
  const actual=r.type==='core'?mainLevel:r.type==='research'?Math.max(levels.research||0,levels['atelier-monstres']||0,levels.academie||0):levels[r.type]||0;
  return {...r,actual,met:actual>=r.level};
 });
 const missing=rows.find(r=>!r.met);
 return {rows,allowed:!missing,reason:missing?'Améliore '+missing.name+' au niveau '+missing.level+'.':null};
}

// Règles de progression courantes. Les noms v06 sont conservés pour les imports.
const PROGRESSION_V06={
 version:'0.14.1',maxLevel:20,maxFloors:10,starterFloors:3,maxEmptyRun:2,
 extraFloorUnlocks:[1,1,3,5,7,10,13,16,20],
 builderPrices:[250,350,450,550],maxBuilders:5,
 researchSlots:1,heroSlots:4,
 unlocks:{...Object.fromEntries(TRAPS.map(t=>[t.id,t.unlock])),core:1,mine:1,extracteur:1,reserve:1,reservoir:1,garnison:1,academie:2,'atelier-monstres':2,forge:3,barricade:2,'caserne-heros':1,
 archers:1,arbalete:2,baliste:3,canon:4,poison:5,glace:6,mortier:7,soin:8,necropole:10,electricite:11,obelisque:12,antimagie:14,infernale:16,gardien:18,mana:3,'garde-monstres':3,'centre-bataille':3,'batiment-alliance':5}
};
const TOWER_PROFILES_V06=Object.fromEntries(DEFENSES.map(d=>[d.id,[...DEFENSE_PROFILES[d.id].range,...DEFENSE_PROFILES[d.id].interval,({archers:'#efc878',baliste:'#f0cf8e',canon:'#f5aa57',mortier:'#e87c4c',glace:'#8edcff',electricite:'#82cbff',poison:'#98d76a',infernale:'#ff7157',antimagie:'#c7a1ff',gardien:'#87d9e7'})[d.id]||'#66e2dd']]));
const levelV06=n=>{if(!Number.isInteger(n)||n<1||n>20)throw Error('Niveau invalide.');return n;};
const roundV06=(n,d=2)=>Math.round(n*10**d)/10**d;
function v06DefenseStats(type,level=1){
 levelV06(level);const b=DEFENSES.find(d=>d.id===type),p=DEFENSE_PROFILES[type];if(!b||!p)throw Error('Défense inconnue.');
 const progress=(level-1)/19,verticalReach=type==='electricite'?(level>=18?3:level>=10?2:1):p.floors[0]+(p.floors[1]>p.floors[0]&&level>=12?p.floors[1]-p.floors[0]:0);
 const baseRange=type==='baliste'?(level>=20?6:level>=13?5:level>=5?4:3):p.range[0]+(p.range[1]-p.range[0])*progress;
 const range=type==='arbalete'?1+(level-1)*.001:Math.max(baseRange,verticalReach?verticalReach*ECONOMY_RULES.floorPixels/ECONOMY_RULES.cellPixels-ECONOMY_RULES.floorPixels/ECONOMY_RULES.cellPixels/2+.05:0),interval=roundV06(p.interval[0]-(p.interval[0]-p.interval[1])*progress);
 return {...b,level,hp:Math.round(b.hp*(1+.2*(level-1))),damage:Math.round(b.damage*(1+.18*(level-1))),range:roundV06(range+(level-1)*.001,3),verticalReach,interval,shotsPerSecond:roundV06(1/interval,3),color:TOWER_PROFILES_V06[type][4],directional:type==='baliste',unlock:p.levels[0],freezeSeconds:type==='glace'?.1:0,poisonSeconds:type==='poison'?roundV06(3+.35*(level-1)):0,poisonDPS:type==='poison'?roundV06(1+.04*(level-1)):0,areaWidth:type==='mortier'?2:0};
}
function v06BalistaDirection(tower,doorX){return doorX<tower.x?'left':'right';}
function v06TargetBounds316(tower,target){
 const actual=globalThis.BLABOX_TROOP_BOUNDS316?.[target.troop]?.[target.level||1]?.[target.animState==='attack'?'attack':'walk'];if(!target.hero&&actual){const cell=tower.cellPitch||ECONOMY_RULES.cellPixels,pitch=(tower.floorPitch||ECONOMY_RULES.floorPixels)/cell,dir=target.direction||1;return{x:(target.centerX??target.x)+(actual.left+actual.right)/2/cell*dir,half:(actual.right-actual.left)/2/cell,bottom:(target.floor||0)*pitch-actual.bottom/cell,top:(target.floor||0)*pitch-actual.top/cell,pitch};}
 const pitch=(tower.floorPitch||ECONOMY_RULES.floorPixels)/(tower.cellPitch||ECONOMY_RULES.cellPixels),hero=HEROES.find(h=>h.id===target.hero),tier=hero?.tier||hero?.rarity,ratio=target.hero?({'Commun':.8,'Rare':.9,'Épique':.95,'Légendaire':1}[tier]||(hero?.legendary?1:.9)):.5,shape=globalThis.BLABOX_BOUNDS316?.[target.hero],w=target.hero?(shape?ratio*pitch*shape.w/shape.h:.65):.4;
 return{x:target.centerX??target.x,half:w/2,bottom:(target.floor||0)*pitch,top:((target.floor||0)+ratio)*pitch,pitch};
}
function v06DefenseDistance(tower,target){const p=v06TargetBounds316(tower,target),w=tower.width||1,cx=tower.centerX??tower.x+(w-1)/2,cy=((tower.floor||0)+.5)*p.pitch,dx=Math.max(0,Math.abs(p.x-cx)-w/2-p.half),dy=Math.max(0,p.bottom-cy,cy-p.top);return Math.hypot(dx,dy);}
function v06InDefenseRange(tower,target,doorX){if(target.transit||target.hp<=0)return false;if(tower.type==='baliste'){const p=v06TargetBounds316(tower,target),cx=tower.centerX??tower.x,cy=(tower.floor+.5)*p.pitch,dir=v06BalistaDirection(tower,doorX),dx=p.x-cx,dy=Math.max(0,p.bottom-cy,cy-p.top);return dy<=p.pitch*.12+1e-9&&Math.max(0,Math.abs(dx)-(tower.width||1)/2-p.half)<=tower.range+1e-9&&(dir==='left'?dx-p.half<=0:dx+p.half>=0);}return v06DefenseDistance(tower,target)<=tower.range+1e-9;}
function v06ArmyCapacity(level){return 10+5*(levelV06(level)-1);}
function v06ResourceCap(level){return storageCapacity(levelV06(level));}
function v06Production(level){return [32,46,65,89,122,162,219,284,356,421,518,632,761,907,1069,1247,1442,1652,1879,2106][levelV06(level)-1];}
function v06AllowedFloors(level){levelV06(level);return 1+PROGRESSION_V06.extraFloorUnlocks.filter(l=>l<=level).length;}
function v06FloorQuote(currentFloors,level,caps={}){
 if(currentFloors>=10)throw Error('Dix niveaux au total : rez-de-chaussée et neuf étages.');
 const unlock=PROGRESSION_V06.extraFloorUnlocks[currentFloors-1];
 return {...floorConstructionQuote(currentFloors,level,caps),unlock,allowed:level>=unlock};
}
function v06InstanceLimit(type,mainLevel){
 const explicit=structureLimit020(type,mainLevel);if(explicit!==null)return explicit;
 const unlock=PROGRESSION_V06.unlocks[type]??1;if(mainLevel<unlock)return 0;
 if(['mine','extracteur'].includes(type))return mainLevel<5?1:mainLevel<10?2:3;
 if(type==='caserne-heros')return [1,5,9,14].filter(n=>mainLevel>=n).length;
 if(['reserve','reservoir','core','forge','academie','garnison','atelier-monstres','mana','garde-monstres','centre-bataille','batiment-alliance'].includes(type))return 1;
 if(type==='trap-35')return 2;
 if(type==='barricade')return 4;
 if(TOWER_PROFILES_V06[type])return 1+Number(mainLevel>=8)+Number(mainLevel>=15);
 return 4+Math.floor(mainLevel/2);
}
function v06BuildQuote(type,from){
 if(from>=20)throw Error('Niveau maximum.');
 return constructionQuote(type,from);
}
// Les totaux par rareté sont arrondis une seule fois, puis répartis par palier.
function heroResourceCost0307(id,from){
 const tier=HERO_PROFILES.find(h=>h.id===id)?.tier||'Commun',factor=({Commun:.5,Rare:2/3,'Épique':1,'Légendaire':2})[tier];
 const base=Array.from({length:19},(_,i)=>Math.round(storageCapacity(i+1)*.4)),scaled=base.map(n=>n*factor),costs=scaled.map(Math.floor);
 let remainder=Math.round(base.reduce((s,n)=>s+n,0)*factor)-costs.reduce((s,n)=>s+n,0);
 const order=scaled.map((n,i)=>({i,fraction:n-Math.floor(n)})).sort((a,b)=>b.fraction-a.fraction||b.i-a.i);
 for(let j=0;j<remainder;j++)costs[order[j].i]++;
 return costs[from-1];
}
function v06HeroQuote(from,id='gorvak'){
 levelV06(from);if(from>=20)throw Error('Niveau maximum.');
 return {from,to:from+1,xp:heroXPRequirement(id,from),gold:heroResourceCost0307(id,from),elixir:heroResourceCost0307(id,from)};
}
function v06HeroStats(id,level){
 levelV06(level);const h=HEROES.find(h=>h.id===id);if(!h)throw Error('Héros inconnu.');
 if(heroCombatStats(id,level))return {...h,...heroCombatStats(id,level)};
 return {...h,level,hp:Math.round(h.hp*(1+.12*(level-1))),damage:Math.round(h.damage*(1+.13*(level-1))),interval:roundV06(2.8-1.6*(level-1)/19),abilities:h.abilities||2};
}
function v06MonsterStats(id,level){
 levelV06(level);const t=TROOPS.find(t=>t.id===id);if(!t)throw Error('Monstre inconnu.');
 const base=t.attackInterval||1;
 return {...t,level,hp:Math.round(t.hp*(1+.1*(level-1))),damage:Math.round(t.damage*(1+.12*(level-1))),attackInterval:roundV06(base*(2.4-1.4*(level-1)/19))};
}
function v06ResearchQuote(from){
 levelV06(from);if(from>=20)throw Error('Niveau maximum.');
 return {from,to:from+1,gold:5*Math.round(storageCapacity(from)*.45),elixir:5*Math.round(storageCapacity(from)*.45),durationSeconds:Math.round(7200*from**1.35)};
}
function v06UpgradeBlock({type,level,mainLevel,jobs=[],builders=1,garrisonLevel=1,levels=null}){
 if(type.startsWith('decor-'))return 'Les décorations restent au niveau 1.';
 if(level>=20)return 'Niveau maximum atteint.';
 if(jobs.some(j=>j.target===type))return 'Chantier déjà en cours.';
 if(occupiedBuilders(jobs)>=builders)return 'Tous les constructeurs sont occupés.';
 if(type!=='core'&&level+1>mainLevel)return 'Le trône doit atteindre le niveau '+(level+1)+'.';
 if(levels){const prerequisite=buildingUpgradeStatus({type,level,mainLevel,levels});if(!prerequisite.allowed)return prerequisite.reason;}
 // Révision 0.17 : le Centre de recherche est la racine de l'arbre ; seul le cœur le plafonne.
 return null;
}
function v06OccupancyErrors(layout){
 const errors=[];
 for(let f=0;f<layout.floors-1;f++){
  const occupied=new Set((layout.doors||[]).filter(d=>d.floor===f).map(d=>d.x));
  for(const list of ['buildings','defenses','barricades','traps','decorations','garrisons'])for(const o of layout[list]||[])if(o.floor===f){
   const width=o.hero?2:BUILDINGS.find(b=>b.id===o.type)?.width||({archers:2,necropole:3})[o.type]||1;
   for(let x=o.x;x<o.x+width;x++)occupied.add(x);
  }
  let run=0;for(let x=0;x<layout.slots;x++){run=occupied.has(x)?0:run+1;if(run===3)errors.push({floor:f,start:x-2,message:'Étage '+(f+1)+' : plus de deux cases vides consécutives.'});}
 }return errors;
}
function v06LevelUpHero(profile,wallet,housingLevel=null){
 if(housingLevel!==null&&profile.level+1>Math.min(20,housingLevel+2))throw Error("Améliore la caserne de ce héros au niveau "+(profile.level+1)+".");
 const q=v06HeroQuote(profile.level,profile.hero||profile.id||'gorvak');
 if((profile.xp||0)<q.xp)throw Error('XP insuffisante.');
 if(wallet.gold<q.gold||wallet.elixir<q.elixir)throw Error('Or ou élixir insuffisant.');
 return {profile:{...profile,level:q.to,xp:profile.xp-q.xp},wallet:{...wallet,gold:wallet.gold-q.gold,elixir:wallet.elixir-q.elixir}};
}
function v06StartResearch(input,id,now=Date.now()){
 const s=structuredClone(input),level=s.monsterLevels[id],troop=TROOPS.find(t=>t.id===id);if(!troop)throw Error('Monstre inconnu.');
 if((s.unlockedTroops?!s.unlockedTroops.includes(id):s.level<troop.unlock)||!Number.isInteger(s.researchBuildingLevel)||s.researchBuildingLevel<1)throw Error('Monstre ou Centre de recherche verrouillé.');
 if(s.research)throw Error('Une recherche est déjà en cours.');
 const q=v06ResearchQuote(level);
 if(q.to>Math.min(20,s.level,s.researchBuildingLevel))throw Error('Améliorez le trône ou le Centre de recherche avant cette recherche.');
 if(s.wallet.gold<q.gold||s.wallet.elixir<q.elixir)throw Error('Ressources insuffisantes.');
 s.wallet.gold-=q.gold;s.wallet.elixir-=q.elixir;s.research={id,from:level,to:q.to,startedAt:now,endsAt:now+q.durationSeconds*1000};return s;
}
function v06SettleResearch(input,now=Date.now()){
 const s=structuredClone(input);if(s.research&&s.research.endsAt<=now){if(s.research.kind==='unlock'){s.unlockedTroops??=['fantassin','bouclier'];if(!s.unlockedTroops.includes(s.research.id))s.unlockedTroops.push(s.research.id);}s.monsterLevels[s.research.id]=s.research.to;s.research=null;}return s;
}
function v06ValidatePreviewLayout(l){
 if(!l||!Number.isInteger(l.castleLevel)||l.castleLevel<1||l.castleLevel>20||!Number.isInteger(l.floors)||l.floors<1||l.floors>v06AllowedFloors(l.castleLevel)||!Number.isInteger(l.slots)||l.slots<12||l.slots>18)throw Error('Dimensions de château invalides.');
 if(!Array.isArray(l.doors)||l.doors.length!==l.floors||l.doors.some((d,f)=>d.floor!==f||!Number.isInteger(d.x)||d.x<0||d.x>=l.slots))throw Error('Une porte valide par étage est obligatoire.');
 const ids=new Set(),heroesSeen=new Set(),counts={},placed=[];
 for(const list of ['buildings','defenses','barricades','traps','decorations','garrisons']){
  if(!Array.isArray(l[list])||l[list].length>198)throw Error('Liste de structures invalide.');
  for(const o of l[list]){
   const c=(list==='garrisons'?HEROES:list==='buildings'?BUILDINGS:list==='defenses'?DEFENSES:list==='traps'?TRAPS:list==='decorations'?DECORATIONS:[BARRICADE]).find(c=>c.id===(list==='garrisons'?o.hero:o.type));
   if(!c||typeof o.id!=='string'||!o.id||o.id.length>120||ids.has(o.id)||!Number.isInteger(o.floor)||o.floor<0||o.floor>=l.floors||!Number.isInteger(o.x)||!Number.isInteger(o.level)||o.level<1||o.level>(o.hero?Math.min(20,l.castleLevel+2):l.castleLevel)||o.orientation!=='front'||o.y!==l.floors-1-o.floor)throw Error('Placement ou niveau invalide.');
   ids.add(o.id);if(o.hero){if(heroesSeen.has(o.hero))throw Error('Héros dupliqué.');heroesSeen.add(o.hero);}
   const width=o.hero?2:c.width||({archers:2,necropole:3})[o.type]||1;
   if(o.x<0||o.x+width>l.slots)throw Error('Structure hors des cases.');
   if(l.doors.some(d=>d.floor===o.floor&&d.x>=o.x&&d.x<o.x+width))throw Error('Une structure recouvre une porte.');
   if(o.hero&&o.caserneId){const house=l.buildings.find(h=>h.id===o.caserneId&&h.type==='caserne-heros');if(!house||house.floor!==o.floor||house.x!==o.x||house.level+2<o.level)throw Error('Caserne de héros invalide.');continue;}
   const trap=list==='traps';
   for(const p of placed.filter(p=>p.floor===o.floor)){
    const gap=0;
    if(o.x<p.x+p.width+gap&&p.x<o.x+width+gap)throw Error('Cet emplacement est déjà occupé.');
   }
   placed.push({floor:o.floor,x:o.x,width,trap});
   if(list==='buildings'||list==='defenses'||list==='barricades'||list==='traps'||list==='decorations'){counts[o.type]=(counts[o.type]||0)+1;if(counts[o.type]>v06InstanceLimit(o.type,l.castleLevel))throw Error('Bâtiment verrouillé ou limite atteinte.');}
  }
 }
 for(const g of l.monsterGarrisons||[]){const h=l.buildings.find(b=>b.id===g.houseId&&b.type==='garde-monstres'),t=TROOPS.find(t=>t.id===g.troop),cap=h?.level>=10?4:h?.level>=5?2:h?.level>=3?1:0;if(!h||!t||t.unlock>l.castleLevel||!Number.isInteger(g.level)||g.level<1||g.level>Math.min(20,l.castleLevel)||g.floor!==h.floor||g.x!==h.x||!g.id||ids.has(g.id)||(l.monsterGarrisons||[]).filter(v=>v.houseId===h.id).length>cap)throw Error('Garde de monstres invalide.');ids.add(g.id);}
 if(l.defenses.some(d=>d.type==='gardien'&&l.garrisons.some(g=>g.floor===d.floor)))throw Error('Le gardien mécanique ne partage pas un étage avec un héros.');
 if(heroesSeen.size>[1,5,9,14].filter(n=>l.castleLevel>=n).length)throw Error('Quatre héros de défense au maximum.');
 for(let f=0;f<l.floors;f++)if(l.decorations.filter(o=>o.floor===f).length>2)throw Error('Deux décorations au maximum par étage.');
 return true;
}





const RELEASE_018=Object.freeze({version:'0.18.0',heroRecoveryPerSecond:2,inactiveMs:300000,heroHouseUnlocks:[1,5,9,14],clanCreateDiamonds:500,oilRate:.2,postRaidShieldMs:10800000,dailyDiamondTarget:[20,60],donationDiamondCap:null});
function energyRechargeMs(level=1){return Math.round(600000*(1-.02*(Math.max(1,Math.min(20,level))-1)));}
function settleEnergy(input,now=Date.now()){const s=structuredClone(input),interval=energyRechargeMs(s.level);s.energyAt??=now;if(s.energy>=5){s.energy=5;s.energyAt=now;return s;}const n=Math.max(0,Math.floor((now-s.energyAt)/interval));if(n){s.energy=Math.min(5,s.energy+n);s.energyAt=s.energy===5?now:s.energyAt+n*interval;}return s;}
function heroLevelLimit(mainLevel,houseLevel){return Math.min(20,mainLevel+2,houseLevel+2);}
function combatHeroXP(mode,mainLevel=1){return mode==='self-test'||mode==='practice'?0:Math.round((mode==='campaign'||mode==='tutorial'?55:25)*(1+.1*(Math.max(1,mainLevel)-1)));}
function troopUnlockQuote(id,researchLevel){const t=TROOPS.find(t=>t.id===id);if(!t)throw Error('Monstre inconnu.');return {id,required:t.unlock,allowed:researchLevel>=t.unlock,gold:Math.round(storageCapacity(t.unlock)*.25),elixir:Math.round(storageCapacity(t.unlock)*.25),durationSeconds:Math.round(3600*Math.max(1,t.unlock/2))};}
function startTroopUnlock(input,id,now=Date.now()){const s=structuredClone(input),q=troopUnlockQuote(id,s.researchBuildingLevel||0);s.unlockedTroops??=['fantassin','bouclier'];if(s.unlockedTroops.includes(id))throw Error('Famille déjà débloquée.');if(!q.allowed||s.research)throw Error(!q.allowed?'Académie niveau '+q.required+' requise.':'Une recherche est en cours.');if(s.wallet.gold<q.gold||s.wallet.elixir<q.elixir)throw Error('Ressources insuffisantes.');s.wallet.gold-=q.gold;s.wallet.elixir-=q.elixir;s.research={id,kind:'unlock',to:1,startedAt:now,endsAt:now+q.durationSeconds*1000};return s;}
function shieldReplacement(shieldUntil,durationMs,now=Date.now()){const remaining=Math.max(0,(shieldUntil||0)-now);if(!Number.isFinite(durationMs)||durationMs<=0)throw Error('Durée invalide.');return {remaining,durationMs,until:now+durationMs,replaces:remaining>0,loses:Math.max(0,remaining-durationMs)};}
function activateShield(input,id,{confirmed=false,now=Date.now()}={}){const s=structuredClone(input),days={'shield-1d':1,'shield-7d':7,'shield-30d':30}[id];if(!days||!s.inventory?.[id])throw Error('Bouclier indisponible.');const q=shieldReplacement(s.shieldUntil,days*86400000,now);if(q.replaces&&!confirmed)throw Error('Confirme le remplacement du bouclier actif.');s.inventory[id]--;s.shieldUntil=q.until;return s;}
function postRaidProtection(input,loss,now=Date.now(),attackerLevel=input.level||1){const s=structuredClone(input);if((loss?.gold||0)+(loss?.elixir||0)>0)s.shieldUntil=Math.max(s.shieldUntil||0,now+(typeof PILLAGE0308==='undefined'?18000000:PILLAGE0308.shieldMs(attackerLevel,s.level||s.layout?.castleLevel||1,s.bot===true)));return s;}
function clanCreationPrice(serverLaunchAt,now=Date.now()){const d=new Date(serverLaunchAt),end=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,1));return Number.isFinite(d.getTime())&&now>=d.getTime()&&now<end.getTime()?0:500;}
function warSchedule(now=Date.now()){const time=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Paris',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(now),[h,m]=time.split(':').map(Number),minutes=h*60+m;return {day:v06ParisDay(now),time,open:minutes>=480&&minutes<1320,phase:minutes<480?'preparation':minutes<1320?'open':minutes<1350?'closed':minutes<1410?'rewards':'tomorrow',start:'08:00',end:'22:00',rewards:'22:30',next:'23:30'};}
function pvpSearchPrice(mainLevel){const amount=Math.max(100,Math.round(storageCapacity(Math.max(1,mainLevel))*.0025));return {gold:amount,elixir:amount};}
function eligiblePvpTarget(attacker,defender,now=Date.now()){return defender.id!==attacker.id&&defender.level>=Math.max(3,attacker.level-10)&&defender.level<=Math.min(20,attacker.level+3)&&!(defender.shieldUntil>now);}
function pvpRatingDelta(attackerRating,defenderRating,won){const expected=1/(1+10**((defenderRating-attackerRating)/400));return Math.round(28*((won?1:0)-expected));}
function botOpponent(input){if(!input||typeof input.name!=='string'||input.name.trim().length<1||input.name.length>40||!Number.isInteger(input.rating)||input.rating<0||input.rating>100000)throw Error('Nom ou cote BOT invalide.');return {...structuredClone(input),isBot:true,ranked:false,fixedRating:true};}
function publicCastleSnapshot(layout){const l=structuredClone(layout);l.traps=[];l.relocation=[];delete l.monsterLevels;return l;}
function weeklyContributorPrize(rank,count,pool){const top=[{diamonds:100,vials:{large:4},health:'health-100',mana:'mana-40',n:4,share:.25},{diamonds:75,vials:{large:3},health:'health-100',mana:'mana-20',n:3,share:.15},{diamonds:50,vials:{large:2},health:'health-100',mana:'mana-20',n:2,share:.1},{diamonds:40,vials:{large:1,medium:2},health:'health-100',mana:'mana-20',n:1,share:.07},{diamonds:30,vials:{medium:3},health:'health-50',mana:'mana-10',n:1,share:.05}];const p=top[rank-1]||{diamonds:rank<=10?20:rank<=15?10:3,vials:rank<=10?{medium:2}:rank<=15?{medium:1}:{small:1},health:rank<=10?'health-50':'health-25',mana:rank<=10?'mana-10':'mana-5',n:1,share:rank<=10?.18/5:rank<=15?.1/5:.1/Math.max(1,count-15)};return {...p,items:{[p.health]:p.n,[p.mana]:p.n,...(rank<=3?{'shield-1d':1}:{})},gold:Math.floor(pool.gold*p.share),elixir:Math.floor(pool.elixir*p.share)};}
function contributorRewards018(clan,week){const grouped=new Map(),pool={gold:0,elixir:0};for(const d of (clan.donations||[]).filter(d=>d.week===week)){let row=grouped.get(d.playerId);if(!row){row={playerId:d.playerId,count:0,value:0,lastAt:0};grouped.set(d.playerId,row);}row.count++;row.value+=d.amount;row.lastAt=Math.max(row.lastAt,d.at);pool[d.resource]+=d.amount;}pool.gold=Math.floor(pool.gold*.01);pool.elixir=Math.floor(pool.elixir*.01);const sorted=[...grouped.values()].sort((a,b)=>b.count-a.count||b.value-a.value||a.lastAt-b.lastAt||a.playerId.localeCompare(b.playerId));const raw=sorted.map((r,i)=>({...r,rank:i+1,weight:weeklyContributorPrize(i+1,sorted.length,pool).share})),total=raw.reduce((s,r)=>s+r.weight,0)||1;const rewards=raw.map(r=>{const p=weeklyContributorPrize(r.rank,sorted.length,pool);return {...r,id:'contributor:'+clan.id+':'+week+':'+r.playerId,reward:{diamonds:p.diamonds,vials:p.vials,items:p.items,gold:Math.floor(pool.gold*r.weight/total),elixir:Math.floor(pool.elixir*r.weight/total)}};});for(const k of ['gold','elixir']){let rest=pool[k]-rewards.reduce((n,r)=>n+r.reward[k],0);for(let i=0;rest>0&&rewards.length;i++,rest--)rewards[i%rewards.length].reward[k]++;}return rewards;}
function campaignReward018(stage,mainLevel=1){const n=Math.max(1,Math.min(30,stage)),tier=Math.min(20,Math.max(mainLevel,Math.ceil(n*2/3))),cap=storageCapacity(tier);return {gold:Math.round(cap*.08),elixir:Math.round(cap*.06),diamonds:n%3===0?5:0,items:{['speed-'+(n<10?900:n<20?3600:10800)]:1,...(n%2===0?{'health-50':1}:{}),...(n%4===0?{'mana-10':1}:{}),...(n===9||n===16||n===23||n===30?{'speed-86400':1}:{})}};}
const CAMPAIGN_ZONE_REWARDS=Object.freeze([{end:9,start:1,id:'terre',name:'Terre'},{end:16,start:10,id:'bois',name:'Bois'},{end:23,start:17,id:'braise',name:'Braise'},{end:30,start:24,id:'givre',name:'Givre'}]);
function earnedZoneRewards(stars){return CAMPAIGN_ZONE_REWARDS.filter(z=>Array.from({length:z.end-z.start+1},(_,i)=>i+z.start).every(n=>(stars[n]||0)>=4)).flatMap(z=>['skin-campagne-'+z.id,'background-campagne-'+z.id]);}
function returnEpicHero(owned,seed=''){const pool=HEROES.filter(h=>h.active&&h.tier==='Épique'&&!owned.includes(h.id));if(!pool.length)return null;let h=0;for(const c of seed)h=(Math.imul(h,31)+c.charCodeAt(0))>>>0;return pool[h%pool.length].id;}
function blockChatPlayer(input,id,{permanent=false,now=Date.now()}={}){const s=structuredClone(input);s.chatBlocks??={};if(!id)throw Error('Joueur introuvable.');s.chatBlocks[id]={until:permanent?null:now+3600000,at:now};return s;}
function chatPlayerBlocked(blocks,id,now=Date.now()){const b=blocks?.[id];return !!b&&(b.until===null||b.until>now);}

function monsterResearchLimit(s){return Math.min(20,s.level,s.researchBuildingLevel||0);}
function fundMonsterResearch(input,id,{gold=0,elixir=0,commandId,now=Date.now()}={}){const s=structuredClone(input);s.researchPayments??=[];if(!commandId)throw Error('Identifiant requis.');if(s.researchPayments.includes(commandId))return s;if(s.research)throw Error('Une recherche est en cours.');const troop=TROOPS.find(t=>t.id===id);if(!troop||(s.unlockedTroops?!s.unlockedTroops.includes(id):(s.researchBuildingLevel||0)<troop.unlock)||!s.researchBuildingLevel)throw Error('Monstre ou Centre de recherche verrouillé.');const q=v06ResearchQuote(s.monsterLevels[id]);if(q.to>=8&&(s.forgeLevel||0)<q.to-1)throw Error('Forge niveau '+(q.to-1)+' requise.');if(q.to>monsterResearchLimit(s))throw Error('Le trône ou le Centre de recherche doit progresser.');if(s.researchFunding&&s.researchFunding.id!==id)throw Error('Une autre famille est en financement.');const f=s.researchFunding||{id,from:q.from,to:q.to,paid:{gold:0,elixir:0},quote:q};for(const [k,n]of Object.entries({gold,elixir}))if(!Number.isSafeInteger(n)||n<0||n>q[k]-f.paid[k]||n>s.wallet[k])throw Error('Montant invalide.');if(!gold&&!elixir)throw Error('Aucune ressource disponible pour ce dépôt.');for(const [k,n]of Object.entries({gold,elixir})){s.wallet[k]-=n;f.paid[k]+=n;}s.researchFunding=f;s.researchPayments.push(commandId);if(f.paid.gold===q.gold&&f.paid.elixir===q.elixir){s.research={id,from:q.from,to:q.to,startedAt:now,endsAt:now+q.durationSeconds*1000};s.researchFunding=null;}return s;}

const HERO_COMBAT_XP=25;
const heroHousingLimit=level=>HERO_HOUSING_UNLOCKS.filter(n=>n<=level).length;
function heroHousing(layout,hero){const g=layout.garrisons.find(g=>g.hero===hero);return g?layout.buildings.find(b=>b.id===g.caserneId&&b.type==='caserne-heros')||null:null;}
function syncHeroHousing(layout){for(const g of layout.garrisons){const h=layout.buildings.find(b=>b.id===g.caserneId&&b.type==='caserne-heros');if(h){g.floor=h.floor;g.x=h.x;g.y=layout.floors-1-h.floor;g.orientation='front';g.underConstruction=Boolean(h.underConstruction);}}return layout;}
function assignHeroHousing(layout,profiles,houseId,hero){const l=structuredClone(layout),h=l.buildings.find(b=>b.id===houseId&&b.type==='caserne-heros');if(!h)throw Error('Caserne introuvable.');if(l.defenses.some(d=>d.type==='gardien'&&d.floor===h.floor))throw Error('Le gardien mécanique défend déjà cet étage.');if(h.underConstruction)throw Error('Cette caserne est en chantier.');if(!HEROES.some(v=>v.id===hero&&v.active)||!profiles[hero]?.unlocked)throw Error('Héros non recruté.');if(profiles[hero].level>Math.min(20,h.level+2,l.castleLevel+2))throw Error('Cette caserne doit atteindre le niveau '+profiles[hero].level+'.');l.garrisons=l.garrisons.filter(g=>g.caserneId!==houseId&&g.hero!==hero);l.garrisons.push({id:'hero:'+hero,hero,level:profiles[hero].level,caserneId:h.id,floor:h.floor,x:h.x,y:l.floors-1-h.floor,orientation:'front'});return l;}
function grantGarrisonXP(profiles,layout){const next=structuredClone(profiles);for(const id of new Set(layout.garrisons.filter(g=>heroHousing(layout,g.hero)).map(g=>g.hero))){if(next[id]&&next[id].level<20)next[id].xp=(next[id].xp||0)+HERO_COMBAT_XP;}return next;}
function loyaltyHero(cycle,seed,owned=[]){if(cycle===1)return 'nyra';if(cycle===2)return 'aigle';if(cycle!==3)return null;let pool=['tiko','morghul','kryos'].filter(id=>!owned.includes(id));if(!pool.length)pool=['tiko','morghul','kryos'];let hash=2166136261;for(const c of String(seed))hash=Math.imul(hash^c.charCodeAt(0),16777619)>>>0;return pool[hash%pool.length];}
function recruitUnitPrice(id){const i=TROOPS.findIndex(t=>t.id===id);if(i<0)throw Error('Monstre inconnu.');return id==='brise-mur'?600:80+i*30;}
function recruitUnitSeconds(id,level=1){const i=TROOPS.findIndex(t=>t.id===id);if(i<0)throw Error('Monstre inconnu.');return Math.max(3,Math.round((8+i*3)*(1-.015*(Math.max(1,level)-1))));}
function recruitmentCount(s){return (s.recruitment||[]).reduce((sum,q)=>sum+q.remaining,0);}
function enqueueRecruitment(input,id,count,now=Date.now()){
 const s=structuredClone(input),t=TROOPS.find(t=>t.id===id);if(!t||(s.unlockedTroops?!s.unlockedTroops.includes(id):s.level<t.unlock))throw Error('Déblocage au trône '+(t?.unlock||1)+'.');if(!Number.isInteger(count)||count<1||count>v06ArmyCapacity(s.level))throw Error('Quantité invalide.');s.recruitment??=[];s.roster??=[];
 const trained=s.roster.reduce((n,r)=>n+r.count,0),used=trained+recruitmentCount(s),cap=v06ArmyCapacity(s.level);if(used+count>cap)throw Error(used>=cap?'Impossible : ton armée est déjà à '+used+' / '+cap+'.':'Il reste '+(cap-used)+' places : '+used+' / '+cap+' occupées.');const cost=count*recruitUnitPrice(id);if(s.wallet.elixir<cost)throw Error('Élixir insuffisant.');s.wallet.elixir-=cost;
 const seconds=recruitUnitSeconds(id,s.monsterLevels?.[id]||1),startsAt=Math.max(now,s.recruitment.at(-1)?.endsAt||now),q={id:'recruit:'+now+':'+s.recruitment.length,troop:id,level:s.monsterLevels?.[id]||1,total:count,remaining:count,completed:0,unitSeconds:seconds,unitPrice:recruitUnitPrice(id),startsAt,nextAt:startsAt+seconds*1000,endsAt:startsAt+seconds*count*1000};s.recruitment.push(q);return s;
}
function settleRecruitment(input,now=Date.now()){
 const s=structuredClone(input);s.recruitment??=[];s.roster??=[];s.delivered=[];
 for(const q of s.recruitment){while(q.remaining>0&&q.nextAt<=now){let r=s.roster.find(r=>r.troop===q.troop&&(r.level||1)===(q.level||1));if(!r)s.roster.push(r={troop:q.troop,level:q.level||1,count:0});r.count++;q.remaining--;q.completed++;s.delivered.push({troop:q.troop,level:q.level||1,at:q.nextAt,order:q.completed,total:q.total});q.nextAt+=q.unitSeconds*1000;}if(q.remaining)break;}
 s.recruitment=s.recruitment.filter(q=>q.remaining>0);return s;
}
function cancelRecruitment(input,id,now=Date.now()){
 const s=settleRecruitment(input,now),at=s.recruitment.findIndex(q=>q.id===id);if(at<0)throw Error('Commande terminée ou inconnue.');const q=s.recruitment[at],inProgress=q.startsAt<=now&&q.remaining>0,refund=(q.remaining-Number(inProgress))*q.unitPrice;s.wallet.elixir+=refund;s.recruitment.splice(at,1);
 let cursor=now;for(const job of s.recruitment){if(job.startsAt<=now){cursor=job.endsAt;continue;}job.startsAt=cursor;job.nextAt=cursor+job.unitSeconds*1000;job.endsAt=cursor+job.remaining*job.unitSeconds*1000;cursor=job.endsAt;}s.refund=refund;return s;
}


const RETIRED_HERO_ALIASES_024=Object.freeze({sylvara:'aigle',voltra:'kryos',lyrion:'chacal',vitalis:'tortue'});
function migrateRetiredHeroes024(input){
 const s=structuredClone(input);s.retiredHeroes024??={};
 for(const [old,id] of Object.entries(RETIRED_HERO_ALIASES_024)){
  if(s.heroes?.[old]?.unlocked){const alreadyOwned=s.heroes[id]?.unlocked;s.retiredHeroes024[old]??=structuredClone(s.heroes[old]);if(s.recovery?.heroes?.[old]){s.retiredHeroes024[old].recovery??=structuredClone(s.recovery.heroes[old]);if(!alreadyOwned)s.recovery.heroes[id]=structuredClone(s.recovery.heroes[old]);}const p=s.heroes[old],a=s.heroes[id]||{};s.heroes[id]={...p,...a,unlocked:true,level:Math.max(p.level||1,a.level||1),xp:Math.max(p.xp||0,a.xp||0)};}
 }
 if(s.army?.heroes)s.army.heroes=[...new Set(s.army.heroes.map(id=>RETIRED_HERO_ALIASES_024[id]||id))];
 for(const l of [s.layout,s.published?.layout])if(l?.garrisons){for(const g of l.garrisons)if(RETIRED_HERO_ALIASES_024[g.hero]){s.retiredHeroes024[g.hero]??={};s.retiredHeroes024[g.hero].garrisons??=[];s.retiredHeroes024[g.hero].garrisons.push(structuredClone(g));g.hero=RETIRED_HERO_ALIASES_024[g.hero];}l.garrisons=l.garrisons.filter((g,i,a)=>a.findIndex(v=>v.hero===g.hero)===i);}
 return s;
}


// Règles pures des guerres 0.6. Persistance et routes Cloudflare décrites dans GUERRES_CLANS_V06.md.
const CLAN_WAR_V06={timezone:'Europe/Paris',startHour:8,endHour:22,targets:10,random:5,chosen:3,points:{random:5,chosen:10,admin:15,chief:40},chiefInactiveDays:15,maxExclusions:3};
const CLAN_TECH_V06=[
 {id:'selection',name:'Conseil stratégique',maxLevel:1,description:'Un représentant choisi de plus remplace un tirage aléatoire.'},
 {id:'exclusion',name:'Réserve du clan',maxLevel:3,description:'Jusqu’à trois membres exclus de la représentation automatique.'},
 {id:'yield',name:'Prospérité',maxLevel:10,description:'+2 % d’or et d’élixir de production par niveau, maximum +20 %.'},
 {id:'construction',name:'Maîtres bâtisseurs',maxLevel:10,description:'−2 % de durée de construction par niveau, maximum −20 %.'}
];
function v06ParisDay(now=Date.now()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
function v06WarIsOpen(now=Date.now()){
 const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Paris',hour:'numeric',hourCycle:'h23'}).format(now));
 return hour>=8&&hour<22;
}
function warHashV06(s){let n=2166136261;for(const c of s){n^=c.charCodeAt(0);n=Math.imul(n,16777619);}return n>>>0;}
function v06WarRoster(members,{chiefId,adminId,chosenIds=[],excludedIds=[],selectionLevel=0,exclusionLevel=0,seed=''}){
 const byId=new Map(members.map(m=>[m.id,m]));if(byId.size!==members.length)throw Error('Membre dupliqué.');
 if(!chiefId||!adminId||chiefId===adminId||!byId.has(chiefId)||!byId.has(adminId))throw Error('Un chef et un administrateur distincts sont obligatoires.');
 if(![0,1].includes(selectionLevel)||!Number.isInteger(exclusionLevel)||exclusionLevel<0||exclusionLevel>3)throw Error('Technologie invalide.');
 const chosenCount=3+selectionLevel;
 if(chosenIds.length!==chosenCount||new Set(chosenIds).size!==chosenCount||chosenIds.some(id=>[chiefId,adminId].includes(id)||!byId.has(id)))throw Error('Sélection des représentants invalide.');
 if(excludedIds.length>Math.min(3,1+exclusionLevel)||new Set(excludedIds).size!==excludedIds.length||excludedIds.some(id=>!byId.has(id)||[chiefId,adminId,...chosenIds].includes(id)))throw Error('Exclusions invalides.');
 const fixed=new Set([chiefId,adminId,...chosenIds,...excludedIds]);
 const candidates=members.filter(m=>!fixed.has(m.id)).sort((a,b)=>warHashV06(seed+':'+a.id)-warHashV06(seed+':'+b.id)||a.id.localeCompare(b.id));
 const randomCount=8-chosenCount;if(candidates.length<randomCount)throw Error('Pas assez de membres éligibles pour dix représentants.');
 const levelSort=(a,b)=>a.mainLevel-b.mainLevel||a.id.localeCompare(b.id);
 const entry=(m,role)=>({...m,role,points:CLAN_WAR_V06.points[role]});
 return [...candidates.slice(0,randomCount).sort(levelSort).map(m=>entry(m,'random')),...chosenIds.map(id=>byId.get(id)).sort(levelSort).map(m=>entry(m,'chosen')),entry(byId.get(adminId),'admin'),entry(byId.get(chiefId),'chief')];
}
function v06WarScore(attacks,participantIds,roster){
 const players=new Set(participantIds);if(players.size!==participantIds.length)throw Error('Participant dupliqué.');
 const targets=new Map(roster.map(r=>[r.id,r.points])),best=new Map();
 for(const a of attacks){if(!players.has(a.playerId)||!targets.has(a.targetId)||a.status!=='won')continue;best.set(a.playerId+':'+a.targetId,targets.get(a.targetId));}
 const total=[...best.values()].reduce((a,b)=>a+b,0),maxPerPlayer=roster.reduce((n,r)=>n+r.points,0);
 return {total,participants:players.size,score:players.size&&maxPerPlayer?Math.round(total/players.size/maxPerPlayer*110000)/1000:0,defeated:best.size,maxPerPlayer};
}
function v06ClanMatch(clan,candidates){
 const other=candidates.filter(c=>c.id!==clan.id&&c.bracket===clan.bracket&&Math.abs(c.activeMembers-clan.activeMembers)<=Math.max(3,clan.activeMembers*.3));
 const distance=c=>Math.abs(c.warRating-clan.warRating)/100+Math.abs(c.meanMainLevel-clan.meanMainLevel)*2+Math.abs(c.activeMembers-clan.activeMembers)/3;
 return other.sort((a,b)=>distance(a)-distance(b)||a.id.localeCompare(b.id))[0]||{id:'bot:'+clan.id,synthetic:true,name:'Gardiens BOT',warRating:clan.warRating,activeMembers:clan.activeMembers,meanMainLevel:clan.meanMainLevel,bracket:clan.bracket};
}
function v06CanReplaceChief({actorId,adminId,chiefLastActiveAt},now=Date.now()){
 return actorId===adminId&&Number.isFinite(chiefLastActiveAt)&&now-chiefLastActiveAt>15*86400000;
}
function v06ClanTechQuote(id,from){
 const t=CLAN_TECH_V06.find(t=>t.id===id);if(!t||!Number.isInteger(from)||from<0||from>=t.maxLevel)throw Error('Recherche de clan invalide.');
 return {id,to:from+1,gold:Math.round(25000*1.8**from/4),elixir:Math.round(18000*1.8**from/4),durationSeconds:Math.round(14400*1.6**from)};
}
function v06ClaimWarReward(input,key,reward){
 const s=structuredClone(input);s.rewardClaims??=[];if(s.rewardClaims.includes(key))return s;
 s.rewardClaims.push(key);for(const k of ['gold','elixir','diamonds'])s.wallet[k]=(s.wallet[k]||0)+(reward[k]||0);return s;
}




// Admin choisi une fois par guerre, tirage déterministe stable avec identifiant de guerre.
function clanWarAdminLottery(members,warId){const admins=members.filter(m=>m.role==='admin'||m.clanRole==='admin').sort((a,b)=>a.id.localeCompare(b.id));if(admins.length<1||admins.length>3)throw Error('De 1 à 3 administrateurs requis.');if(typeof warId!=='string'||!warId)throw Error('Identifiant de guerre requis.');return admins[warHashV06(warId)%admins.length].id;}

const CLAN_DONATION_RULES=Object.freeze({rate:.03,cooldownMs:7200000,diamonds:2,firstTarget:500,targetStep:100,maxReferenceLevel:15,weeklyResourceRate:0});
const CLAN_SHOP_ITEMS=Object.freeze([
 {"id": "speed-300", "name": "Accélérateur · 5 minutes", "asset": "item:speed-300", "resource": "gold", "price": 50000, "wholesale": 67500, "item": "speed-300"},
 {"id": "speed-900", "name": "Accélérateur · 15 minutes", "asset": "item:speed-900", "resource": "gold", "price": 100000, "wholesale": 125000, "item": "speed-900"},
 {"id": "speed-3600", "name": "Accélérateur · 1 heure", "asset": "item:speed-3600", "resource": "gold", "price": 200000, "wholesale": 240000, "item": "speed-3600"},
 {"id": "clan-banner", "name": "Bannière du clan", "asset": "decor:banner", "resource": "gold", "price": 100000, "wholesale": 90000, "item": "clan-banner", "decoration": "decor-banner"},
 {"id": "xp-small", "name": "Petite potion · 150 XP", "asset": "item:xp-small", "resource": "elixir", "price": 70000, "wholesale": 90500, "vial": "small"},
 {"id": "xp-medium", "name": "Potion · 500 XP", "asset": "item:xp-medium", "resource": "elixir", "price": 225000, "wholesale": 268750, "vial": "medium"},
 {"id": "shield-1d", "name": "Bouclier · 1 jour", "asset": "item:shield-1d", "resource": "elixir", "price": 500000, "wholesale": 585000, "item": "shield-1d"},
 {"id": "mana-5", "name": "Mana +5", "asset": "item:mana-5", "resource": "elixir", "price": 75000, "wholesale": 96250, "item": "mana-5"},
 {"id": "mana-10", "name": "Mana +10", "asset": "item:mana-10", "resource": "elixir", "price": 125000, "wholesale": 153750, "item": "mana-10"},
 {"id": "mana-20", "name": "Mana +20", "asset": "item:mana-20", "resource": "elixir", "price": 225000, "wholesale": 268750, "item": "mana-20"},
 {"id": "mana-40", "name": "Mana +40", "asset": "item:mana-40", "resource": "elixir", "price": 400000, "wholesale": 470000, "item": "mana-40"},
 {"id": "health-25", "name": "Vie +25 %", "asset": "item:health-25", "resource": "elixir", "price": 50000, "wholesale": 67500, "item": "health-25"},
 {"id": "health-50", "name": "Vie +50 %", "asset": "item:health-50", "resource": "elixir", "price": 100000, "wholesale": 125000, "item": "health-50"},
 {"id": "health-100", "name": "Vie +100 %", "asset": "item:health-100", "resource": "elixir", "price": 175000, "wholesale": 211250, "item": "health-100"},
 {"id": "tiko", "name": "Héros Tiko", "asset": "item:tiko", "resource": "gold", "price": 1950000, "wholesale": 2400000, "secondaryResource": "elixir", "secondaryPrice": 1950000, "secondaryWholesale": 2400000, "hero": "tiko"},
]);
const CONTRIBUTOR_PRIZES=Object.freeze([{diamonds:150,share:.4,vials:{medium:3}},{diamonds:100,share:.25,vials:{medium:2}},{diamonds:75,share:.15,vials:{medium:1}},{diamonds:50,share:.12,vials:{small:3}},{diamonds:25,share:.08,vials:{small:2}}]);
function clanWeekKey(now=Date.now()){const d=new Date(v06ParisDay(now)+'T12:00:00Z');d.setUTCDate(d.getUTCDate()-(d.getUTCDay()+6)%7);return d.toISOString().slice(0,10);}
function clanDonationQuote(id,from,progress=0){const t=CLAN_TECH_V06.find(t=>t.id===id);if(!t||!Number.isInteger(from)||from<0||from>=t.maxLevel)throw Error('Technologie au maximum ou inconnue.');const target=500+100*from;if(!Number.isInteger(progress)||progress<0||progress>=target)throw Error('Progression de don invalide.');const first=from===0?23000:49000+(from-1)*14000;const cap=from===0?49000:63000+(from-1)*14000;const amount=Math.min(cap,Math.round(first+(cap-first)*progress/Math.max(1,target-1)));return {id,from,to:from+1,resource:['selection','yield'].includes(id)?'gold':'elixir',referenceLevel:Math.min(9+from,15),amount,target};}
function clanDonationCooldown(id){return ['yield','construction'].includes(id)?3600000:7200000;}
function clanDonationDiamonds(id){return ['yield','construction'].includes(id)?1:2;}
function clanTransaction(player,clan,commandId){if(!player.id||!clan.id||player.clanId!==clan.id)throw Error('Rejoins ce clan pour participer.');if(typeof commandId!=='string'||!commandId||commandId.length>120)throw Error('Identifiant d’opération requis.');for(const [wallet,keys]of [[player.wallet,['gold','elixir','diamonds']],[clan.treasury,['gold','elixir']]])for(const k of keys)if(!Number.isSafeInteger(wallet?.[k])||wallet[k]<0)throw Error('Portefeuille invalide.');const receipt=clan.ledger?.find(r=>r.id===commandId);if(receipt&&receipt.playerId!==player.id)throw Error('Identifiant déjà utilisé.');return {player:structuredClone(player),clan:structuredClone(clan),repeated:Boolean(receipt)};}
function clanDonationWait(player,id,now=Date.now()){const last=player.clanDonationAt?.[id];return last==null?0:Math.max(0,last+clanDonationCooldown(id)-now);}
function clanDonationAccelerationQuote(player,id,now=Date.now()){const remaining=clanDonationWait(player,id,now);return {id,remaining,diamonds:remaining?Math.max(6,Math.ceil(10*remaining/clanDonationCooldown(id))):0};}
function accelerateClanDonation(player,clan,id,{commandId,now=Date.now()}={}){const r=clanTransaction(player,clan,commandId);if(r.repeated)return r;clanDonationQuote(id,r.clan.tech[id]||0,r.clan.progress?.[id]||0);const q=clanDonationAccelerationQuote(r.player,id,now);if(!q.remaining)throw Error('Un don est déjà disponible.');if(r.player.wallet.diamonds<q.diamonds)throw Error('Diamants insuffisants.');r.player.wallet.diamonds-=q.diamonds;r.player.clanDonationAt??={};r.player.clanDonationAt[id]=now-clanDonationCooldown(id);r.clan.ledger??=[];r.clan.ledger.push({id:commandId,playerId:player.id,kind:'donation-boost',technology:id,resource:'diamonds',amount:q.diamonds,at:now});return r;}
function donateClanTechnology(player,clan,id,{commandId,now=Date.now()}={}){const r=clanTransaction(player,clan,commandId);if(r.repeated)return r;const q=clanDonationQuote(id,r.clan.tech[id]||0,r.clan.progress?.[id]||0);if(clanDonationWait(player,id,now))throw Error(clanDonationCooldown(id)===3600000?'Prochain don dans une heure.':'Prochain don dans deux heures.');if(player.wallet[q.resource]<q.amount)throw Error('Ressources insuffisantes.');r.player.wallet[q.resource]-=q.amount;r.player.wallet.diamonds+=clanDonationDiamonds(id);r.player.lastClanDonationAt=now;r.player.clanDonationAt??={};r.player.clanDonationAt[id]=now;r.clan.treasury[q.resource]+=q.amount;r.clan.progress??={};r.clan.progress[id]=(r.clan.progress[id]||0)+1;const receipt={id:commandId,kind:'donation',playerId:player.id,technology:id,resource:q.resource,amount:q.amount,at:now,week:clanWeekKey(now)};r.clan.donations??=[];r.clan.donations.push(receipt);r.clan.ledger??=[];r.clan.ledger.push(receipt);if(r.clan.progress[id]>=q.target){r.clan.tech[id]++;r.clan.progress[id]=0;}return r;}
function clanShopQuote(id,count=1){const p=CLAN_SHOP_ITEMS.find(p=>p.id===id);if(!p||!Number.isInteger(count)||count<1||count>100)throw Error('Objet ou quantité invalide.');const returned=id==='clan-banner'?p.price:Math.floor(p.price*.85);const wholesale=p.wholesale;return {...p,returned,wholesale,total:wholesale*count,secondaryTotal:(p.secondaryWholesale||0)*count,count,loss:(wholesale-returned)*count};}
function visibleClanShop(clan){return CLAN_SHOP_ITEMS.filter(p=>(clan?.stock?.[p.id]||0)>0);}
function restockClanShop(player,clan,id,count,{commandId,now=Date.now()}={}){const r=clanTransaction(player,clan,commandId);if(r.repeated)return r;if(!['chief','admin'].includes(player.clanRole))throw Error('Action réservée aux responsables du clan.');const q=clanShopQuote(id,count);if(r.clan.treasury[q.resource]<q.total||(q.secondaryResource&&r.clan.treasury[q.secondaryResource]<q.secondaryTotal))throw Error('Trésorerie insuffisante.');r.clan.treasury[q.resource]-=q.total;if(q.secondaryResource)r.clan.treasury[q.secondaryResource]-=q.secondaryTotal;r.clan.stock??={};r.clan.stock[id]=(r.clan.stock[id]||0)+count;r.clan.ledger??=[];r.clan.ledger.push({id:commandId,playerId:player.id,kind:'restock',item:id,resource:q.resource,amount:q.total,at:now});return r;}
function buyClanShopItem(player,clan,id,{commandId,now=Date.now()}={}){const r=clanTransaction(player,clan,commandId);if(r.repeated)return r;const q=clanShopQuote(id),day=v06ParisDay(now),week=clanWeekKey(now);if(!(r.clan.stock?.[id]>0))throw Error('Objet épuisé.');if(r.player.wallet[q.resource]<q.price||(q.secondaryResource&&r.player.wallet[q.secondaryResource]<q.secondaryPrice))throw Error('Ressources insuffisantes.');r.player.wallet[q.resource]-=q.price;if(q.secondaryResource)r.player.wallet[q.secondaryResource]-=q.secondaryPrice;r.clan.stock[id]--;r.clan.treasury[q.resource]+=q.returned;if(q.secondaryResource)r.clan.treasury[q.secondaryResource]+=Math.floor(q.secondaryPrice*.85);r.player.inventory??={};r.player.vials??={};r.player.decorations??=[];if(q.item)r.player.inventory[q.item]=(r.player.inventory[q.item]||0)+1;if(q.vial)r.player.vials[q.vial]=(r.player.vials[q.vial]||0)+1;if(q.decoration&&!r.player.decorations.includes(q.decoration))r.player.decorations.push(q.decoration);if(q.hero){r.player.heroes??={};r.player.heroes[q.hero]??={unlocked:true,level:1};}const receipt={id:commandId,playerId:player.id,kind:'sale',item:id,resource:q.resource,amount:q.returned,price:q.price,day,week,at:now};r.player.clanPurchases??=[];r.player.clanPurchases.push(receipt);r.clan.ledger??=[];r.clan.ledger.push(receipt);return r;}
function clanContributorRanking(donations,week){const rows=new Map();for(const d of donations.filter(d=>d.week===week)){const r=rows.get(d.playerId)||{playerId:d.playerId,count:0,value:0,lastAt:0};r.count++;r.value+=d.amount;r.lastAt=Math.max(r.lastAt,d.at);rows.set(r.playerId,r);}return [...rows.values()].sort((a,b)=>b.count-a.count||b.value-a.value||a.lastAt-b.lastAt||a.playerId.localeCompare(b.playerId));}
function clanContributorRewards(clan,week){const weekly=(clan.donations||[]).filter(d=>d.week===week),totals={gold:0,elixir:0};for(const d of weekly)if(Object.hasOwn(totals,d.resource))totals[d.resource]+=d.amount;const ranking=clanContributorRanking(weekly,week);return ranking.map((r,i)=>{const rank=i+1,rate=rank===1?.025:rank===2?.024:rank===3?.023:rank===4?.021:rank<=14?(2.5-rank*.1)/100:.01;const basic=CONTRIBUTOR_PRIZES[Math.min(i,CONTRIBUTOR_PRIZES.length-1)];return {...r,rank,rate,id:'contributor:'+clan.id+':'+week+':'+r.playerId,reward:{diamonds:basic.diamonds,vials:basic.vials,gold:Math.floor(totals.gold*rate),elixir:Math.floor(totals.elixir*rate)}};});}
function warAttackEligibility(attacks,playerId,targetId,day=v06ParisDay(),roster=[]){
 const rows=attacks.filter(a=>a.playerId===playerId&&(a.day||v06ParisDay(a.at))===day),losses=rows.filter(a=>a.status!=='won').length,won=new Set(rows.filter(a=>a.status==='won').map(a=>a.targetId)),conquered=won.has(targetId),index=roster.findIndex(m=>m.id===targetId);
 const previous=index>0?roster.slice(0,index).find(m=>!won.has(m.id)):null;
 const unknown=roster.length>0&&index<0&&targetId!=='_';
 const reason=conquered?'Château déjà conquis.':losses>=3?'Tes trois défaites sont utilisées.':unknown?'Château adverse introuvable.':previous?'Vaincs d’abord le château n° '+(roster.indexOf(previous)+1)+' · '+previous.name+'.':null;
 return {losses,remaining:Math.max(0,3-losses),conquered,allowed:!reason,reason,previousTargetId:previous?.id||null,previousNumber:previous?roster.indexOf(previous)+1:null};
}

const PROFILE_RULES=Object.freeze({productId:'blabox_profile_photo',priceEuros:.99,changeDiamonds:30,cooldownMs:172800000,maxBytes:5242880});
const MODERATOR_WEEKLY_REWARD=Object.freeze({diamonds:500,vials:{medium:2},photoAccess:true,badge:'moderator'});
function clanMemberPresence(viewer,member,now=Date.now()){if(!viewer.clanId||member.clanId!==viewer.clanId)return null;return Number.isFinite(member.lastSeenAt)?{online:now-member.lastSeenAt<300000,offlineMs:Math.max(0,now-member.lastSeenAt)}:{online:false,offlineMs:null};}
function requestProfilePhoto(input,image,{commandId,now=Date.now()}={}){const s=structuredClone(input),p=s.photo;if(!p?.entitled)throw Error('Débloque la fonction avec Google Play.');if(p.pending?.id===commandId)return s;if(p.pending)throw Error('Une photo attend la validation.');if(p.lastChangedAt!=null&&now-p.lastChangedAt<172800000)throw Error('Un changement toutes les 48 heures.');if(!commandId||typeof image!=='string'||!/^data:image\/(png|jpeg|webp);base64,/.test(image)||image.length>Math.ceil(5242880*4/3)+100)throw Error('Image invalide : PNG, JPEG ou WebP de moins de 5 Mo.');const held=p.changes?30:0;if(s.wallet.diamonds<held)throw Error('Diamants insuffisants.');s.wallet.diamonds-=held;p.pending={id:commandId,image,held,requestedAt:now};return s;}
function reviewProfilePhoto(input,actor,id,{approved,reason='',now=Date.now()}={}){if(!['creator','moderator'].includes(actor.gameRole)||!actor.permissions?.includes('avatars.review')||actor.id===input.id)throw Error('Validation réservée à un autre modérateur du serveur.');const s=structuredClone(input),p=s.photo;if(!p)throw Error('Demande introuvable.');p.reviews??=[];if(p.reviews.some(r=>r.id===id))return s;if(p.pending?.id!==id)throw Error('Demande introuvable.');if(!approved&&reason.trim().length<3)throw Error('Précise le motif du refus.');p.reviews.push({id,approved:Boolean(approved),reason,actorId:actor.id,at:now});if(approved){p.image=p.pending.image;p.changes++;p.lastChangedAt=now;}else s.wallet.diamonds+=p.pending.held;p.pending=null;return s;}
function moderatorWeeklyMail(actor,{validatedActivity=false,now=Date.now()}={}){if(actor.gameRole!=='moderator'||!validatedActivity)throw Error('Activité de modération non validée.');return {id:'moderator:'+actor.id+':'+clanWeekKey(now),playerId:actor.id,reward:structuredClone(MODERATOR_WEEKLY_REWARD)};}

const ONBOARDING_V07=Object.freeze({version:1,levelBasis:'main-building',wallet:{diamonds:500,gold:2000,elixir:2000},energy:5,builders:1,vials:{small:3,medium:1,large:0},inventory:{'shield-1d':1,'shield-7d':0,'shield-30d':0,'energy-refill':0,'speed-1800':0},daily:{gold:500,elixir:500,speed1800:1},harvest:{gold:180,elixir:180},trainingLoot:{gold:300,elixir:250},constructionReward:{gold:12500,elixir:12500},steps:['welcome','build','collect','daily','army','combat','upgrade','done']});
const TUTORIAL_KIT_V07=Object.freeze([
 {id:'starter:mine:1',type:'mine',floor:0,x:1}, {id:'starter:mine:2',type:'mine',floor:0,x:4},
 {id:'building:reserve',type:'reserve',floor:0,x:7}, {id:'starter:extracteur:1',type:'extracteur',floor:1,x:0},
 {id:'starter:extracteur:2',type:'extracteur',floor:1,x:3}, {id:'building:reservoir',type:'reservoir',floor:1,x:6},
 {id:'building:garnison',type:'garnison',floor:2,x:5}, {id:'starter:caserne',type:'caserne-heros',floor:2,x:8}, {id:'defense:archers',type:'archers',floor:1,x:10}
]);
function v07StarterLayout(){const l=blankCastle(1);l.doors[1].x=9;l.buildings.push(withFloor(l,{id:'building:core',type:'core',level:1},2,1));return l;}
function v07StarterState(){return {version:1,step:'welcome',installed:[],doorMoved:false,events:[],wallet:structuredClone(ONBOARDING_V07.wallet),energy:5,builders:1,mainLevel:1,troops:0,heroXP:{gorvak:0},rating:null,vials:structuredClone(ONBOARDING_V07.vials),inventory:structuredClone(ONBOARDING_V07.inventory),job:null,battleStarted:false,done:false};}
function v07Gates(mainLevel,hasClan=false){if(!Number.isInteger(mainLevel)||mainLevel<1||mainLevel>20)throw Error('INVALID_MAIN_LEVEL');return {clanVisible:mainLevel>=2,clanEnabled:mainLevel>=5,chatVisible:mainLevel>=3,nationalChat:mainLevel>=3,clanChat:mainLevel>=5&&hasClan,humanAttack:mainLevel>=3,humanDefense:mainLevel>=3,ranked:mainLevel>=3,levelBasis:'main-building'};}
// Le serveur devra dériver ces événements d'actions vérifiées, jamais d'une déclaration du client.
function v07TutorialEvent(current,event,now=Date.now()){
 const s=structuredClone(current);if(typeof event.id!=='string'||event.id.length<3)throw Error('EVENT_ID_REQUIRED');if(s.events.includes(event.id))return s;
 const advance=(expected,next)=>{if(s.step!==expected)throw Error('TUTORIAL_STEP_REQUIRED');s.step=next;};
 switch(event.kind){
  case 'welcome':advance('welcome','build');break;
  case 'install':if(s.step!=='build'||!TUTORIAL_KIT_V07.some(o=>o.id===event.target))throw Error('INVALID_STARTER_ITEM');if(!s.installed.includes(event.target))s.installed.push(event.target);if(s.installed.length===TUTORIAL_KIT_V07.length&&s.doorMoved)s.step='collect';break;
  case 'door':if(s.step!=='build')throw Error('TUTORIAL_STEP_REQUIRED');s.doorMoved=true;if(s.installed.length===TUTORIAL_KIT_V07.length)s.step='collect';break;
  case 'collect':advance('collect','daily');s.wallet.gold+=ONBOARDING_V07.harvest.gold;s.wallet.elixir+=ONBOARDING_V07.harvest.elixir;break;
  case 'daily':advance('daily','army');s.wallet.gold+=ONBOARDING_V07.daily.gold;s.wallet.elixir+=ONBOARDING_V07.daily.elixir;s.inventory['speed-1800']+=ONBOARDING_V07.daily.speed1800;break;
  case 'army':advance('army','combat');s.troops=10;break;
  case 'battle-start':if(s.step!=='combat'||s.battleStarted)throw Error('TUTORIAL_STEP_REQUIRED');if(s.energy<1)throw Error('ENERGY_REQUIRED');s.energy--;s.battleStarted=true;break;
  case 'battle-lost':if(s.step!=='combat'||!s.battleStarted)throw Error('TUTORIAL_STEP_REQUIRED');s.battleStarted=false;break;
  case 'battle-won':if(!s.battleStarted)throw Error('BATTLE_REQUIRED');advance('combat','upgrade');s.wallet.gold+=ONBOARDING_V07.trainingLoot.gold;s.wallet.elixir+=ONBOARDING_V07.trainingLoot.elixir;for(const k of ['gold','elixir'])s.wallet[k]=Math.min(15000,s.wallet[k]+ONBOARDING_V07.constructionReward[k]);s.battleStarted=false;break;
  case 'upgrade-start':{if(s.step!=='upgrade'||s.job)throw Error('TUTORIAL_STEP_REQUIRED');const q=v06BuildQuote('core',1);if(s.wallet.gold<q.gold||s.wallet.elixir<q.elixir)throw Error('RESOURCES_REQUIRED');s.wallet.gold-=q.gold;s.wallet.elixir-=q.elixir;s.job={to:2,endsAt:now+q.durationSeconds*1000};break;}
  case 'upgrade-finish':if(s.step!=='upgrade'||!s.job||now<s.job.endsAt)throw Error('JOB_NOT_READY');s.mainLevel=2;s.job=null;s.step='done';s.done=true;break;
  case 'speed-tutorial':if(s.step!=='upgrade'||!s.job||!s.inventory['speed-1800'])throw Error('SPEEDUP_REQUIRED');s.inventory['speed-1800']--;s.job.endsAt-=1800000;if(now>=s.job.endsAt){s.mainLevel=2;s.job=null;s.step='done';s.done=true;}break;
  default:throw Error('UNKNOWN_TUTORIAL_EVENT');
 }s.events.push(event.id);return s;
}


// Nouvelle présentation ; les exports v07 restent compatibles avec les sauvegardes antérieures.
const ONBOARDING_V14=Object.freeze({version:2,levelBasis:'main-building',wallet:{diamonds:500,gold:2000,elixir:2000},energy:5,recruitedBuilders:1,freeFirstBuilder:false,initialStructures:['core'],freeFirstHeroHouse:true,firstHeroGift:'gorvak',tutorialGroups:9,vials:{small:3,medium:1,large:0},inventory:{'shield-1d':1,'speed-1800':1,'speed-3600':15},daily:{gold:13000,elixir:13000,speed1800:1},firstRecruitment:{troop:'fantassin',count:10,free:true,unitSeconds:2},firstMonsterBarracks:{unlock:1,free:true},harvest:{gold:180},steps:['welcome','worker','mine','mine-place','mine-finish','collect','daily','upgrade','core-finish','house','house-place','house-finish','garrison','barracks','barracks-place','barracks-finish','recruit','recruit-wait','buttons','army','campaign','battle','done'],combatSeconds:900});

const REWARD_ITEMS_V07=Object.freeze(['health-25','health-50','health-100','mana-5','mana-10','mana-20','mana-40','xp-small','xp-medium','xp-large','shield-1d','shield-7d','shield-30d','energy-refill','speed-60','speed-300','speed-900','speed-1800','speed-3600','speed-10800','speed-86400']);
const money=['gold','elixir','diamonds'];
function quantity(n){if(!Number.isSafeInteger(n)||n<0||n>1000000000)throw Error('INVALID_REWARD_QUANTITY');return n;}
function v07RewardBundle(input){if(!input||typeof input!=='object'||Array.isArray(input))throw Error('INVALID_REWARD');for(const k of Object.keys(input))if(![...money,'items','cosmetics','heroes'].includes(k))throw Error('INVALID_REWARD_KIND');const b={gold:0,elixir:0,diamonds:0,items:{},cosmetics:[],heroes:[]};for(const k of money)b[k]=quantity(input[k]??0);if(input.items!==undefined&&(!input.items||typeof input.items!=='object'||Array.isArray(input.items)))throw Error('INVALID_REWARD_ITEMS');for(const [id,n] of Object.entries(input.items??{})){if(!REWARD_ITEMS_V07.includes(id))throw Error('INVALID_REWARD_ITEM');b.items[id]=quantity(n);}for(const [key,catalog] of [['cosmetics',COSMETICS],['heroes',HEROES]]){if(input[key]!==undefined&&!Array.isArray(input[key]))throw Error('INVALID_REWARD_CONTENT');b[key]=[...new Set(input[key]??[])];if(b[key].some(id=>!catalog.some(o=>o.id===id)))throw Error('INVALID_REWARD_CONTENT');}if(!money.some(k=>b[k])&&!Object.values(b.items).some(Boolean)&&!b.cosmetics.length&&!b.heroes.length)throw Error('EMPTY_REWARD');return b;}
function v07RewardIsEmpty(b){return !money.some(k=>b[k])&&!Object.values(b.items??{}).some(Boolean)&&!(b.cosmetics??[]).length&&!(b.heroes??[]).length;}
function v07ClaimGift(account,mail,caps){
 if(mail.playerId!==account.id)throw Error('FORBIDDEN');if(mail.claimed)return {account:structuredClone(account),mail:structuredClone(mail),alreadyClaimed:true};
 const b=v07RewardBundle(mail.remaining),a=structuredClone(account),m=structuredClone(mail);a.inventory??={};
 for(const k of money){quantity(a.wallet[k]);const cap=k==='diamonds'?Number.MAX_SAFE_INTEGER:caps[k];if(!Number.isSafeInteger(cap)||cap<0)throw Error('INVALID_CAP');const q=Math.min(b[k],Math.max(0,cap-a.wallet[k]));a.wallet[k]+=q;m.remaining[k]=b[k]-q;}
 m.remaining.items??={};for(const [id,q] of Object.entries(b.items)){quantity(a.inventory[id]??0);if(!Number.isSafeInteger((a.inventory[id]??0)+q))throw Error('INVALID_REWARD_QUANTITY');a.inventory[id]=(a.inventory[id]??0)+(id.startsWith('xp-')?freePotionCount0307(a,id.slice(3),q):q);m.remaining.items[id]=0;}
 a.ownedCosmetics??=[];a.ownedHeroes??=[];for(const id of b.cosmetics)if(!a.ownedCosmetics.includes(id))a.ownedCosmetics.push(id);for(const id of b.heroes)if(!a.ownedHeroes.includes(id))a.ownedHeroes.push(id);else a.inventory['xp-medium']=(a.inventory['xp-medium']??0)+freePotionCount0307(a,'medium',1);m.remaining.cosmetics=[];m.remaining.heroes=[];m.claimed=v07RewardIsEmpty(m.remaining);return {account:a,mail:m,alreadyClaimed:false};
}
function v07CanDeleteMail(mail){return mail.kind!=='purchase'&&(mail.claimed||!mail.remaining||v07RewardIsEmpty(mail.remaining));}
function v07NormalizeCode(code){if(typeof code!=='string')throw Error('INVALID_CODE');const s=code.trim().toUpperCase();if(!/^[A-Z0-9-]{6,40}$/.test(s))throw Error('INVALID_CODE');return s;}
function v07CodeGrant(code,account,{now=Date.now(),used=0,alreadyRedeemed=false}={}){
 if(alreadyRedeemed)return {grantKey:'code:'+code.id+':'+account.id,alreadyRedeemed:true};
 if(!Number.isFinite(code.startsAt)||!Number.isFinite(code.expiresAt)||code.expiresAt<=code.startsAt||!Number.isFinite(code.createdBefore)||!Number.isInteger(code.maxUses)||code.maxUses<1||!Number.isInteger(used)||used<0)throw Error('INVALID_CODE_CONFIG');if(!code.active||now<code.startsAt||now>=code.expiresAt)throw Error('CODE_EXPIRED');if(used>=code.maxUses)throw Error('CODE_LIMIT');if(code.playerId&&code.playerId!==account.id)throw Error('CODE_NOT_FOR_YOU');if(account.createdAt>code.createdBefore)throw Error('CODE_NOT_ELIGIBLE');
 return {grantKey:'code:'+code.id+':'+account.id,playerId:account.id,remaining:v07RewardBundle(code.reward),claimed:false,kind:'gift',alreadyRedeemed:false};
}
function v07AudienceMatch(campaign,account){if(account.createdAt>campaign.publishedAt)return false;if(campaign.audience==='all')return true;if(campaign.audience==='players')return campaign.playerIds.includes(account.id);if(campaign.audience==='clan')return campaign.memberSnapshot.includes(account.id);throw Error('INVALID_AUDIENCE');}
function v07AuthorizeCreator(actor,action,creatorId){if(typeof creatorId!=='string'||!creatorId||typeof actor?.id!=='string'||!actor.id)throw Error('FORBIDDEN');if(actor.id===creatorId)return true;if(['reports.read','messages.hide','players.warn','sanctions.create'].includes(action)&&actor.gameRole==='moderator'&&Array.isArray(actor.permissions)&&actor.permissions.includes(action))return true;throw Error('FORBIDDEN');}
function v07Sanction({scope,minutes,reason},now=Date.now()){if(!['game','chat'].includes(scope)||!Number.isInteger(minutes)||minutes<1||minutes>2880||typeof reason!=='string'||reason.trim().length<3||reason.length>500)throw Error('INVALID_SANCTION');return {scope,minutes,reason:reason.trim(),expiresAt:now+minutes*60000};}


// Tableau créateur : reçus vérifiés et montants entiers, devises séparées.
function creatorPurchaseAnalytics(receipts,{page=1,pageSize=10,currency='EUR'}={}){
 if(!Number.isInteger(page)||page<1||!Number.isInteger(pageSize)||pageSize<1||pageSize>100)throw Error('Pagination invalide.');
 const seen=new Set(),buyers=new Map(),products=new Map();let grossMinor=0,diamonds=0,orders=0;
 for(const r of receipts){if(r.verified!==true||r.refunded||r.status!=='credited'||r.currency!==currency||!r.orderId||seen.has(r.orderId)||!Number.isSafeInteger(r.amountMinor)||r.amountMinor<0||!Number.isSafeInteger(r.diamonds)||r.diamonds<0)continue;seen.add(r.orderId);orders++;grossMinor+=r.amountMinor;diamonds+=r.diamonds;const b=buyers.get(r.playerId)||{id:r.playerId,name:r.name||r.playerId,grossMinor:0,orders:0,diamonds:0};b.grossMinor+=r.amountMinor;b.orders++;b.diamonds+=r.diamonds;buyers.set(r.playerId,b);const p=products.get(r.productId)||{id:r.productId,orders:0,grossMinor:0,diamonds:0};p.orders++;p.grossMinor+=r.amountMinor;p.diamonds+=r.diamonds;products.set(r.productId,p);}
 const all=[...buyers.values()].sort((a,b)=>b.grossMinor-a.grossMinor||a.id.localeCompare(b.id)),pages=Math.max(1,Math.ceil(all.length/pageSize));return {currency,page:Math.min(page,pages),pageSize,pages,buyerCount:all.length,grossMinor,diamonds,orders,buyers:all.slice((Math.min(page,pages)-1)*pageSize,Math.min(page,pages)*pageSize),products:[...products.values()].sort((a,b)=>b.orders-a.orders||a.id.localeCompare(b.id))};
}


const PLAY_BILLING_V07=Object.freeze({provider:'google-play',webPurchases:false,googleSignInRequired:false,enabled:false,productKind:'consumable',serverVerification:true});
// 'purchase' doit provenir de l'API Google appelée par l'adaptateur serveur, pas du corps client.
function v07CheckPlayPurchase({purchase,product,expectedAccountId,processed}){
 if(!purchase||!product||!expectedAccountId)throw Error('INVALID_PLAY_PURCHASE');
 if(purchase.productId!==product.productId||purchase.obfuscatedExternalAccountId!==expectedAccountId)throw Error('PLAY_ACCOUNT_OR_PRODUCT_MISMATCH');
 if(processed){if(processed.accountId!==expectedAccountId)throw Error('PLAY_PURCHASE_ALREADY_OWNED');return {status:'credited',diamonds:0,alreadyCredited:true};}
 if(purchase.purchaseState===2)return {status:'pending',diamonds:0};if(purchase.purchaseState===1)return {status:'cancelled',diamonds:0};if(purchase.purchaseState!==0)throw Error('INVALID_PLAY_STATE');
 if(purchase.consumptionState===1)throw Error('PLAY_CONSUMED_WITHOUT_LEDGER');
 const q=purchase.quantity??1;if(!Number.isInteger(q)||q<1||q>10||!Number.isSafeInteger(product.diamonds)||product.diamonds<1||!Number.isSafeInteger(product.diamonds*q))throw Error('INVALID_PLAY_QUANTITY');
 return {status:'verified',diamonds:product.diamonds*q,quantity:q,consumeAfterCommit:true};
}



// Une case est une longueur de sol. Aucun angle ni rotation n'est autorisé.
const LAYOUT_VERSION=5;
const castleSize=level=>({...CASTLE_TIERS.find(t=>level>=t.min&&level<=t.max)||CASTLE_TIERS[0]});
function footprint(type){
 const building=BUILDINGS.find(b=>b.id===type);
 if(building)return building.width;
 if(type==='barricade')return 1;
 if(type.startsWith('hero:'))return 2;
 return ({archers:2,necropole:3})[type]||1;
}
const allSolids=l=>[...(l.buildings||[]),...(l.defenses||[]),...(l.garrisons||[]),...(l.barricades||[]),...(l.decorations||[])];
const placementSolids=l=>allSolids(l).filter(o=>!o.hero||!o.caserneId);
const itemWidth=i=>footprint(i.hero?'hero:'+i.hero:i.type);
function castlePath(level=1){const {floors,slots}=castleSize(level),p=[];for(let floor=0;floor<floors;floor++)for(let i=0;i<slots;i++)p.push({x:floor%2?slots-1-i:i,y:floors-1-floor});return p;}
function blankCastle(level=1){const {floors,slots}=castleSize(level);return {schema:LAYOUT_VERSION,castleLevel:level,floors,slots,gap:0,path:castlePath(level),secondary:[],buildings:[],defenses:[],traps:[],garrisons:[],barricades:[],decorations:[],doors:Array.from({length:floors},(_,floor)=>({id:'door:'+floor,floor,x:floor%2?slots-1:0})),relocation:[]};}
function withFloor(layout,item,floor,x){return {...item,floor,x,y:layout.floors-1-floor,orientation:'front'};}
function placementError(layout,item,floor,x,ignoreId=null,widthResolver=itemWidth){
 if(!Number.isInteger(floor)||floor<0||floor>=layout.floors||!Number.isInteger(x))return 'Étage ou case invalide.';
 const trap=TRAPS.some(t=>t.id===item.type),width=widthResolver(item);
 if(x<0||x+width>layout.slots)return 'Emplacement hors du château.';
 if(item.type==='gardien'&&(layout.garrisons||[]).some(g=>g.floor===floor))return 'Un héros défend déjà cet étage.';
 if(item.type==='caserne-heros'&&(layout.garrisons||[]).some(g=>g.caserneId===item.id)&&(layout.defenses||[]).some(d=>d.type==='gardien'&&d.floor===floor))return 'Le gardien mécanique défend déjà cet étage.';
 if((layout.doors||[]).some(d=>d.floor===floor&&d.x>=x&&d.x<x+width))return 'Gardez la case de porte libre.';
 if(trap){
  if((layout.traps||[]).some(t=>t.id!==ignoreId&&t.floor===floor&&t.x===x))return 'Un piège occupe déjà cette case.';
  if(placementSolids(layout).some(s=>s.id!==ignoreId&&s.floor===floor&&x>=s.x&&x<s.x+widthResolver(s)))return 'Placez le piège dans une case de sol libre.';
 }else{
  if(placementSolids(layout).some(s=>s.id!==ignoreId&&s.floor===floor&&x<s.x+widthResolver(s)&&s.x<x+width))return 'Cet emplacement est déjà occupé.';
  if((layout.traps||[]).some(t=>t.id!==ignoreId&&t.floor===floor&&t.x>=x&&t.x<x+width))return 'Un piège occupe le sol sous cet emplacement.';
 }
 return null;
}
function placeFirstFree(layout,item,list,preferred=0){
 for(let k=0;k<layout.floors;k++){let floor=(preferred+k)%layout.floors;for(let x=1;x<layout.slots-1;x++)if(!placementError(layout,item,floor,x)){let placed=withFloor(layout,item,floor,x);layout[list].push(placed);return placed;}}
 throw Error('Le château manque de cases pour conserver toutes les structures.');
}
function syncCastle(state){
 const l=state.layout,size=castleSize(state.level);l.decorations??=[];l.doors??=[];
 for(let floor=0;floor<size.floors;floor++)if(!l.doors.some(d=>d.floor===floor))l.doors.push({id:'door:'+floor,floor,x:floor%2?size.slots-1:0});l.castleLevel=state.level;l.slots=size.slots;l.floors=size.floors;l.path=castlePath(state.level);
 for(const item of [...allSolids(l),...l.traps]){item.y=l.floors-1-item.floor;item.orientation='front';}
 for(const b of BUILDINGS.filter(b=>b.unlock<=state.level)){
  let item=l.buildings.find(i=>i.type===b.id);
  if(!item){if(b.id!=='core'&&state.levels[b.id]==null)state.levels[b.id]=1;const pending=l.relocation?.find(r=>r.list==='buildings'&&r.item.type===b.id);if(pending){pending.item.level=state.levels[b.id]||1;continue;}const newItem={id:'building:'+b.id,type:b.id,level:b.id==='core'?state.level:state.levels[b.id]||1};try{item=placeFirstFree(l,newItem,'buildings',b.id==='core'?l.floors-1:0);}catch{l.relocation.push({list:'buildings',item:newItem});continue;}}
  item.level=b.id==='core'?state.level:state.levels[b.id]||1;
 }
 return state;
}
function defaultCastle(){
 const l=blankCastle(1);
 for(const [type,floor,x] of [['mine',0,1],['forge',0,4],['reservoir',0,7],['extracteur',1,1],['reserve',1,4],['academie',1,8],['core',2,5]])l.buildings.push(withFloor(l,{id:'building:'+type,type,level:1},floor,x));
 l.defenses=[withFloor(l,{id:'d1',type:'archers',level:1},2,1),withFloor(l,{id:'d2',type:'mortier',level:1},2,9)];
 l.traps=[withFloor(l,{id:'t1',type:'trap-6',level:1},0,3)];return l;
}
function validateCastle(layout,{schema=LAYOUT_VERSION,widthResolver=itemWidth,gap=schema<5?1:0}={}){
 if(layout.schema!==schema)throw Error('Format de placement ancien : migrez la sauvegarde.');
 const size=castleSize(layout.castleLevel);
 if(!Number.isInteger(layout.castleLevel)||layout.castleLevel<1||layout.castleLevel>20||size.slots!==layout.slots||size.floors!==layout.floors||layout.gap!==gap)throw Error('Dimensions du château invalides.');
 if(JSON.stringify(layout.path)!==JSON.stringify(castlePath(layout.castleLevel))||!Array.isArray(layout.secondary)||layout.secondary.length)throw Error('Le parcours doit traverser chaque étage et chaque case de sol.');
 for(const list of ['buildings','defenses','garrisons','barricades','traps','decorations'])if(!Array.isArray(layout[list])||layout[list].length>60)throw Error('Liste de structures invalide.');
 if(layout.barricades.length>4)throw Error('Quatre barricades au maximum.');
 if(layout.defenses.length>4+Math.floor(layout.castleLevel/2)||layout.traps.length>4+Math.floor(layout.castleLevel/2))throw Error('Limite de construction atteinte.');
 if(layout.garrisons.length>(schema<5?[2,7,12,17]:[1,5,9,14]).filter(n=>layout.castleLevel>=n).length)throw Error('Limite de garnisons atteinte.');
 if(!Array.isArray(layout.doors)||layout.doors.length!==layout.floors||!layout.doors.every((d,i)=>d.floor===i)||new Set(layout.doors.map(d=>d.floor)).size!==layout.floors)throw Error('Une porte par étage est obligatoire.');
 for(const d of layout.doors){if(!Number.isInteger(d.floor)||d.floor<0||d.floor>=layout.floors||!Number.isInteger(d.x)||d.x<0||d.x>=layout.slots)throw Error('Porte invalide.');}
 for(let f=0;f<layout.floors;f++)if(layout.decorations.filter(d=>d.floor===f).length>2)throw Error('Deux décorations au maximum par étage.');
 if(layout.buildings.filter(b=>b.type==='caserne-heros').length>[1,5,9,14].filter(n=>layout.castleLevel>=n).length)throw Error('Limite de casernes de héros.');
 const ids=new Set(),buildingTypes=new Set(),heroTypes=new Set();
 for(const [list,catalog] of [['buildings',BUILDINGS],['defenses',DEFENSES],['traps',TRAPS],['barricades',[BARRICADE]],['decorations',DECORATIONS]])for(const i of layout[list]){
  const c=catalog.find(c=>c.id===i.type);if(!c)throw Error('Structure inconnue.');
  if(list==='buildings'){if((buildingTypes.has(i.type)&&i.type!=='caserne-heros')||c.unlock>layout.castleLevel)throw Error('Bâtiment dupliqué ou verrouillé.');buildingTypes.add(i.type);}
 }
 for(const g of layout.garrisons){if(!HEROES.some(h=>h.id===g.hero)||heroTypes.has(g.hero))throw Error('Héros de garnison invalide.');heroTypes.add(g.hero);}
 for(const i of [...allSolids(layout),...layout.traps]){
  if(typeof i.id!=='string'||!i.id||i.id.length>120||ids.has(i.id)||!Number.isInteger(i.level)||i.level<1||i.level>Math.min(20,layout.castleLevel+(i.hero?2:0))||i.orientation!=='front'||i.y!==layout.floors-1-i.floor)throw Error('Identifiant, niveau ou orientation invalide.');
  ids.add(i.id);if(i.hero&&i.caserneId){const h=layout.buildings.find(h=>h.id===i.caserneId&&h.type==='caserne-heros');if(!h||h.floor!==i.floor||h.x!==i.x||i.level>h.level+2)throw Error('Caserne du héros invalide.');}else{const error=placementError(layout,i,i.floor,i.x,i.id,widthResolver);if(error)throw Error(error);}
 }
 return true;
}
function migrateLegacyLayout(old,level=1,levels={}){
 old=structuredClone(old);for(const o of old?.defenses||[])if(o.type==='canon')o.type='mortier';
 if(old?.schema===LAYOUT_VERSION)return structuredClone(old);
 if(old?.schema===4){const l=structuredClone(old);l.schema=LAYOUT_VERSION;l.gap=0;l.relocation??=[];for(const g of l.garrisons){if(g.caserneId)continue;const h=withFloor(l,{id:'housing:'+g.id,type:'caserne-heros',level:g.level},g.floor,g.x);l.buildings.push(h);g.caserneId=h.id;}validateCastle(l);return l;}
 if(old?.schema===2){const l=structuredClone(old);l.schema=3;l.decorations??=[];l.doors=Array.from({length:l.floors},(_,floor)=>({id:'door:'+floor,floor,x:floor%2?l.slots-1:0}));return migrateLegacyLayout(l,level,levels);}
 if(old?.schema===3){
  // Valider avec les anciennes largeurs avant tout déplacement ; jamais accepter une base invalide.
  const legacyWidth=i=>i.hero?2:({reserve:2,reservoir:2,academie:3,garnison:3})[i.type]||itemWidth(i);
  validateCastle(old,{schema:3,widthResolver:legacyWidth});
  const l=structuredClone(old),lists=['buildings','defenses','garrisons','barricades','decorations','traps'];
  l.schema=LAYOUT_VERSION;l.gap=0;l.relocation??=[];for(const list of lists)l[list]=[];
  for(const list of lists)for(const original of old[list]){
   let placed=null;
   const floors=Array.from({length:l.floors},(_,f)=>f).sort((a,b)=>Math.abs(a-original.floor)-Math.abs(b-original.floor)||a-b);
   const xs=Array.from({length:l.slots},(_,x)=>x).sort((a,b)=>Math.abs(a-original.x)-Math.abs(b-original.x)||a-b);
   for(const f of floors){for(const x of xs)if(!placementError(l,original,f,x)){placed=withFloor(l,original,f,x);l[list].push(placed);break;}if(placed)break;}
   if(!placed)l.relocation.push({list,item:structuredClone(original)});
  }
  validateCastle(l);return l;
 }
 if(!old||!Array.isArray(old.path)||old.path.length<2||old.path.length>153)throw Error('Ancien parcours invalide.');
 const seen=new Set();for(let k=0;k<old.path.length;k++){const p=old.path[k],key=p.x+','+p.y;if(!Number.isInteger(p.x)||!Number.isInteger(p.y)||p.x<0||p.x>8||p.y<0||p.y>16||seen.has(key)||k&&Math.abs(p.x-old.path[k-1].x)+Math.abs(p.y-old.path[k-1].y)!==1)throw Error('Ancien parcours invalide.');seen.add(key);}
 const l=blankCastle(level),reserve=[];
 for(const list of ['defenses','garrisons','traps'])for(const i of old[list]||[])reserve.push({list,item:{...i},preferred:Math.min(l.floors-1,Math.max(0,Math.round((16-i.y)/16*(l.floors-1))))});
 // Conserver les PV des bâtiments économiques dans la défense publiée aussi.
 for(const b of BUILDINGS.filter(b=>b.unlock<=level))placeFirstFree(l,{id:'building:'+b.id,type:b.id,level:b.id==='core'?level:levels[b.id]||1},'buildings',b.id==='core'?l.floors-1:0);
 for(const r of reserve.sort((a,b)=>Number(a.list==='traps')-Number(b.list==='traps'))){try{if(r.list==='traps'&&!TRAPS.some(t=>t.id===r.item.type))throw Error('Retiré du catalogue');if(r.list==='defenses'&&!DEFENSES.some(d=>d.id===r.item.type))throw Error('Retiré du catalogue');const limit=r.list==='garrisons'?[2,7,12,17].filter(n=>level>=n).length:4+Math.floor(level/2);if(l[r.list].length>=limit)throw Error('Limite');placeFirstFree(l,r.item,r.list,r.preferred);}catch{l.relocation.push({list:r.list,item:r.item});}}
 validateCastle(l);return l;
}

function moveDoor(layout,floor,x){
 const d=layout.doors.find(d=>d.floor===floor);
 if(!d||!Number.isInteger(x)||x<0||x>=layout.slots)throw Error('Porte ou case invalide.');
 if(placementSolids(layout).some(o=>o.floor===floor&&x>=o.x&&x<o.x+itemWidth(o))||layout.traps.some(t=>t.floor===floor&&t.x===x))throw Error('La porte doit être sur une case libre.');
 d.x=x;validateCastle(layout);return d;
}

// Return a receipt for a future server migration; never silently refund twice.
function retireRemovedTraps(input){const layout=structuredClone(input),removed=(layout.traps||[]).filter(t=>RETIRED_TRAP_IDS.includes(t.type));layout.traps=(layout.traps||[]).filter(t=>!RETIRED_TRAP_IDS.includes(t.type));return {layout,removed};}


const DESTRUCTION_RULES=Object.freeze({mine:5.5,storage:13.5,decoration:.1,thresholds:[50,75,90,100],rounding:'ceil-display-only',coreEndsBattle:true});
function fixedDestructionPercent(item){if(item.hero||item.solid===false||String(item.type).startsWith('trap-')||item.indestructible)return 0;if(['mine','extracteur'].includes(item.type))return 5.5;if(['reserve','reservoir'].includes(item.type))return 13.5;if(DECORATIONS.some(d=>d.id===item.type))return .1;return null;}
function destructionWeight(item){if(fixedDestructionPercent(item)!==null)return 0;const width=item.width||BUILDINGS.find(b=>b.id===item.type)?.width||1,importance=item.type==='core'?5:item.type==='barricade'?.2:item.type==='caserne-heros'?2.5:DEFENSES.some(d=>d.id===item.type)?2:1.5;return width*importance;}
function battleDestruction(b){
 const targets=b.structures||[],fixed=targets.reduce((n,d)=>n+(fixedDestructionPercent(d)||0),0),variable=Math.max(0,100-fixed),totalWeight=targets.reduce((n,d)=>n+destructionWeight(d),0),core=targets.find(d=>d.type==='core'),coreDestroyed=Boolean(core&&core.hp<=0);
 const contribution=d=>fixedDestructionPercent(d)??(totalWeight?variable*destructionWeight(d)/totalWeight:0),raw=coreDestroyed?100:Math.min(100,targets.reduce((n,d)=>n+(d.hp<=0?contribution(d):0),0)),percent=coreDestroyed?100:Math.ceil(raw-1e-9),stars=DESTRUCTION_RULES.thresholds.filter(t=>raw+1e-9>=t).length;
 return {raw,percent,stars,coreDestroyed,victory:raw+1e-9>=50,contributions:targets.map(d=>({id:d.id,percent:contribution(d)}))};
}
function updateBattleOutcome(b){b.destruction=battleDestruction(b);b.victorySecured=Boolean(b.victorySecured||b.destruction.victory);if(b.destruction.coreDestroyed||b.destruction.raw+1e-9>=100){b.status='won';b.endReason=b.destruction.coreDestroyed?'core':'destruction';}return b;}
function finishBattle(b,reason='finish'){if(b.status!=='running')return b;updateBattleOutcome(b);if(b.status==='running'){b.status=b.victorySecured?'won':reason==='timeout'?'timeout':'lost';b.endReason=reason;}return b;}

const MANA_RULES=Object.freeze({max:40,fullRecoveryMs:1500000,perSecond:40/1500,pillable:false,inBattleRecovery:false});
const manaCapacity=level=>level?5+Math.floor(35*(Math.max(1,Math.min(20,level))-1)/19):0;
const SPELL_RULES=Object.freeze(Object.fromEntries([
 ['gorvak',3,4,15],['tharos',3,4,15],['nian',3,4,15],
 ...['ignara','kryos','vexa','nyra','jiangshi'].map(id=>[id,4,3,20]),
 ...['aegis','tarasque','tortue'].map(id=>[id,5,3,25]),['elyra',5,4,20],['aigle',4,1,0],
 ...['brakk','chacal','drac'].map(id=>[id,8,1,0]),['morghul',10,1,0]
].map(([id,cost,limit,cooldown])=>[id,{cost,limit,cooldown}])));
const RECOVERY_MINUTES=Object.freeze({Commun:10,Rare:15,'Épique':25,'Légendaire':40});
function recoveryDuration(hero,mainLevel=1,houseLevel=0,level=1){return (heroCombatStats(hero,level)?.hp||HEROES.find(h=>h.id===hero)?.hp||1000)/2*1000;}
function settleRecovery(input,{now=Date.now(),active=false,mainLevel=1,houses={},levels={}}={}){
 const s=structuredClone(input);s.mana??={amount:0,capacity:0,lastAt:now};s.heroes??={};
 const elapsed=Math.max(0,now-(s.mana.lastAt??now));if(!active&&s.mana.enabled!==false)s.mana.amount=Math.min(s.mana.capacity,s.mana.amount+elapsed*MANA_RULES.perSecond/1000);s.mana.lastAt=now;
 for(const [id,h]of Object.entries(s.heroes)){const maxHP=(levels[id]?heroCombatStats(id,levels[id])?.hp:h.maxHP)||heroCombatStats(id,h.level||1)?.hp||1000;h.maxHP=maxHP;h.level=levels[id]||h.level||1;if(!active)h.ratio=Math.min(1,Math.max(0,h.ratio)+Math.max(0,now-(h.lastAt??now))/1000*2/maxHP);h.lastAt=now;}return s;
}
function heroReady(recovery,id){return (recovery.heroes?.[id]?.ratio??1)>.15;}
function recoveryRemaining(recovery,id,mainLevel,houseLevel=0){const h=recovery.heroes?.[id],hp=h?.maxHP||heroCombatStats(id,h?.level||1)?.hp||1000;return Math.max(0,1-(h?.ratio??1))*hp/2*1000;}
function antimagicSuppressed(b,u){return Boolean(u?.hero&&u.side!=='defense'&&(b.structures||[]).some(d=>d.type==='antimagie'&&d.hp>0&&!d.serviceDisabled&&!(d.disabledUntil>b.time)&&v06InDefenseRange(d,u,b.layout.doors[d.floor].x)));}
function spellAvailability(b,u,slot=1){if(globalThis.BLABOX0310?.specialAvailability)return globalThis.BLABOX0310.specialAvailability(b,u,slot);const rule=SPELL_RULES[u?.hero];if(u?.hero==='tanuki')return {allowed:false,remaining:0,reason:'Passif : pièce trouvée et rangée'};if(!rule||slot!==1||!u||u.hp<=0||u.transit||u.deployed===false||u.spawnAt>b.time||b.status!=='running')return {allowed:false,remaining:0,reason:'Héros indisponible'};if(antimagicSuppressed(b,u))return {...rule,remaining:Math.max(0,rule.limit-(u.spellUses?.[slot]||0)),allowed:false,reason:'Héros dans une zone antimagie',suppressed:true};if(u.heroAction?.endAt>b.time||u.freezeUntil>b.time)return {...rule,allowed:false,remaining:Math.max(0,rule.limit-(u.spellUses?.[slot]||0)),reason:'Sort indisponible : action en cours'};const used=u.spellUses?.[slot]||0,remaining=Math.max(0,rule.limit-used),cooldown=Math.max(0,(u.spellReadyAt?.[slot]||0)-b.time),pool=u.side==='defense'?b.defenseMana:b.mana,affordable=!b.useMana||pool?.amount>=rule.cost;return {...rule,remaining,cooldownSeconds:rule.cooldown,cooldown,allowed:remaining>0&&!cooldown&&affordable,reason:!remaining?'Sort épuisé':cooldown?'Sort en recharge':!affordable?'Mana insuffisant':null};}
function recordBattleRecovery(input,b,{now=Date.now(),necropolisLevel=0}={}){if(input.processed?.includes(b.id))return structuredClone(input);const s=settleRecovery(input,{now,active:true});s.processed??=[];for(const u of b.units.filter(u=>u.hero&&!u.summoned&&u.deployed!==false)){const ratio=u.hp>0?Math.min(1,u.hp/u.maxHp):0;s.heroes[u.hero]={ratio,maxHP:u.maxHp,level:u.level||1,lastAt:now};}if(b.useMana)s.mana.amount=Math.max(0,Math.min(s.mana.capacity,b.mana.amount));s.mana.lastAt=now;s.processed.push(b.id);return s;}
const RECOVERY_ITEMS=Object.freeze([
 ...[5,10,20,40].map((n,i)=>({id:'mana-'+n,name:'Recharge · '+n+' mana',asset:'item:mana-'+n,mana:n,price:[15,25,45,80][i]})),
 ...[25,50,100].map((n,i)=>({id:'health-'+n,name:'Potion de soin · '+n+' %',asset:'item:health-'+n,heal:n/100,price:[10,20,35][i]}))
]);
function useRecoveryItem(input,inventory,id,hero=null,{active=false}={}){if(active)throw Error('Utilisable uniquement au château, après le combat.');const p=RECOVERY_ITEMS.find(p=>p.id===id);if(!p||!(inventory[id]>0))throw Error('Potion indisponible.');const s=structuredClone(input),items={...inventory};if(p.mana){if(!s.mana.capacity)throw Error('Construis ton réservoir de mana.');if(s.mana.enabled===false)throw Error('Le réservoir de mana est en chantier.');if(s.mana.amount>=s.mana.capacity)throw Error('Mana déjà complet.');s.mana.amount=Math.min(s.mana.capacity,s.mana.amount+p.mana);}else{if(!hero||!s.heroes[hero])throw Error('Choisis un héros possédé.');if(s.heroes[hero].ratio>=1)throw Error('Ce héros est déjà soigné.');s.heroes[hero].ratio=Math.min(1,s.heroes[hero].ratio+p.heal);}items[id]--;return {recovery:s,inventory:items};}
const guardCapacity=level=>level>=10?4:level>=5?2:level>=3?1:0;
function assignMonsterGuard(layout,roster,houseId,troop,monsterLevels,unlocks,mainLevel){const l=structuredClone(layout),r=structuredClone(roster),h=l.buildings.find(b=>b.id===houseId&&b.type==='garde-monstres');if(!h||h.underConstruction)throw Error('Garde indisponible.');l.monsterGarrisons??=[];if(l.monsterGarrisons.filter(g=>g.houseId===houseId).length>=guardCapacity(h.level))throw Error('Toutes les places sont occupées.');const stock=r.find(t=>t.troop===troop);if(!stock?.count||mainLevel<(unlocks[troop]||1))throw Error('Troupe indisponible.');stock.count--;l.monsterGarrisons.push({id:'guard:'+houseId+':'+(l.guardSequence=(l.guardSequence||0)+1),houseId,troop,level:monsterLevels[troop]||1,floor:h.floor,x:h.x});return {layout:l,roster:r};}
function helpMine(visitor,owner,mineId,{commandId,now=Date.now(),day=v06ParisDay(now)}={}){const p=structuredClone(visitor),o=structuredClone(owner);if(!commandId||p.id===o.id||o.bot)throw Error('Visite non éligible.');p.visitReceipts??=[];if(p.visitReceipts.includes(commandId))return {visitor:p,owner:o,repeated:true};const mine=o.layout.buildings.find(m=>m.id===mineId&&['mine','extracteur'].includes(m.type));if(!mine||mine.underConstruction)throw Error('Mine indisponible.');const used=(p.mineHelps||[]).filter(h=>h.day===day);if(used.length>=6)throw Error('Tes six aides du jour sont utilisées.');if(mine.helpDay===day)throw Error('Cette mine a déjà été aidée aujourd’hui.');mine.helpDay=day;mine.helpUntil=Number.MAX_SAFE_INTEGER;mine.oiled=true;mine.helpRate=.2;p.wallet.diamonds+=1;p.mineHelps??=[];p.mineHelps.push({owner:o.id,mine:mineId,day});p.visitReceipts.push(commandId);return {visitor:p,owner:o,repeated:false};}
const DAILY_QUESTS=Object.freeze([
 ['gold','Première récolte','harvestGold',1,1],['elixir','Élixir du jour','harvestElixir',1,1],['recruit','Préparer l’armée','recruited',5,1],['campaign','En campagne','campaignBattles',1,1],['win','Conquête','wins',1,1],['stars','Collection d’étoiles','stars',4,1],['build','Chantier du jour','construction',1,1],['xp','Renforcer un héros','xpPotion',1,1],['don','Soutenir le clan','donations',1,5],['help','Entraide','helps',2,3]
].map(([id,name,metric,target,unlock])=>({id,name,metric,target,unlock})));
const ACHIEVEMENTS=Object.freeze([
 ['throne','Trône','mainLevel',[2,5,10,15,20]],['height','Forteresse','floors',[4,6,8,10,11]],['build','Bâtisseur','construction',[1,5,10,20,40]],['campaign','Campagne','campaignCleared',[1,4,8,16,30]],['stars','Étoiles','campaignStars',[4,16,32,64,120]],['pvp','Conquérant','pvpWins',[1,10,50,100,250]],['heroes','Collection','heroes',[1,3,5,10,15]],['levels','Progression','heroLevels',[5,20,50,100,200]],['don','Contributeur','donations',[1,10,50,100,250]],['war','Guerre','wars',[1,5,10,25,50]]
].flatMap(([id,name,metric,targets])=>targets.map((target,i)=>({id:id+'-'+i,name:name+' '+['I','II','III','IV','V'][i],metric,target,diamonds:5*(i+1)}))));
const HERO_JOURNEY=Object.freeze([
 ['worker','Premier bâtisseur','builders',1],['mine','Une mine à soi','mines',1],['throne','Trône II','mainLevel',2],['academy','Les secrets de l’Académie','academies',1],['research','Une armée plus forte','researches',1],['clan','Une nouvelle famille','hasClan',1],['mana','Éveil de la magie','manaBuildings',1],['guards','La garde veille','guards',1],['houses','Quatre héros unis','houses',4],['war','Première guerre','wars',1]
].map(([id,name,metric,target])=>({id,name,metric,target})));
function progressRewardOverflow(input,reward){return Object.entries(reward.resourceFractions||{}).flatMap(([resource,fraction])=>{const capacity=input.resourceCaps?.[resource]||0,amount=Math.floor(capacity*fraction),available=Math.max(0,capacity-(input.wallet?.[resource]||0)),lost=Math.max(0,amount-available);return lost?[{resource,amount:lost}]:[];});}
// Quantités gratuites divisées par quatre. Les quarts se conservent par format.
function freePotionCount0307(holder,size,count){
 if(!['small','medium','large'].includes(size)||!Number.isSafeInteger(count)||count<0)throw Error('INVALID_FREE_XP_REWARD');
 holder.xpRewardRemainder0307??={small:0,medium:0,large:0};const old=holder.xpRewardRemainder0307[size]||0;
 if(!Number.isInteger(old)||old<0||old>3)throw Error('INVALID_FREE_XP_REMAINDER');
 const total=old+count;holder.xpRewardRemainder0307[size]=total%4;return Math.floor(total/4);
}
function grantFreeXP0307(holder,vials){holder.vials??={};for(const [size,n]of Object.entries(vials))holder.vials[size]=(holder.vials[size]||0)+freePotionCount0307(holder,size,n);return holder;}
function claimProgressReward(input,key,eligible,reward,{discardOverflow=false}={}){const s=structuredClone(input);s.claims??=[];if(!eligible||s.claims.includes(key))throw Error('Récompense déjà reçue ou objectif incomplet.');const amounts={};for(const [resource,fraction] of Object.entries(reward.resourceFractions||{})){const capacity=s.resourceCaps?.[resource]||0,amount=Math.floor(capacity*fraction),available=Math.max(0,capacity-(s.wallet[resource]||0));if(amount>available&&!discardOverflow)throw Error(resource==='gold'?'Réserve d’or insuffisante.':'Réserve d’élixir insuffisante.');amounts[resource]=discardOverflow?Math.min(amount,available):amount;}s.claims.push(key);s.wallet.diamonds+=reward.diamonds||0;for(const [resource,amount] of Object.entries(amounts))s.wallet[resource]=(s.wallet[resource]||0)+amount;grantFreeXP0307(s,reward.vials||{});s.inventory??={};for(const [k,n]of Object.entries(reward.items||{}))s.inventory[k]=(s.inventory[k]||0)+(k.startsWith('xp-')?freePotionCount0307(s,k.slice(3),n):n);return s;}
const RETURN_REWARDS=Object.freeze(Array.from({length:7},(_,i)=>({diamonds:200,resourceFractions:{gold:.4,elixir:.4},items:{'health-50':3+i,'mana-10':2,'speed-3600':i+1,...(i===6?{'shield-1d':1}:{})},vials:{medium:1+Math.floor(i/2)}})));
function returnEligibility({paidPurchaseAt,lastActiveAt,returnCampaign},now=Date.now()){return Number.isFinite(paidPurchaseAt)&&paidPurchaseAt<=lastActiveAt&&now-lastActiveAt>=60*86400000&&!returnCampaign;}
function claimReturnReward(input,now=Date.now(),{discardOverflow=false}={}){const s=structuredClone(input),c=s.returnCampaign;if(!c||now-c.startedAt>=8*86400000)throw Error('Programme de retour expiré.');const day=v06ParisDay(now);if(c.days.includes(day)||c.days.length>=7)throw Error('Cadeau déjà récupéré.');const reward=RETURN_REWARDS[c.days.length],r=claimProgressReward(s,'return:'+c.startedAt+':'+c.days.length,true,reward,{discardOverflow});r.returnCampaign.days.push(day);return r;}

// Authoritative defense flight and impact; shared with replay rendering.
function defenseTravel025(source,target){const distance=Math.hypot((source.centerX??source.x)-(target.x||0),((source.floor||0)-(target.floor||0))*1.75);return source.type==='gardien'?.12:source.type==='mortier'?Math.min(.9,.48+distance*.025):['electricite','obelisque'].includes(source.type)?.16:Math.min(.55,.16+distance*.035);}
function queueDefenseShot025(b,source,targets,selected,event){
 // A piercing volley reaches every victim on its permitted segment. Each
 // arrival is timed independently, so a rear target is not hurt by a short shot.
 const recipients=source.type==='baliste'?targets:[selected],kind=source.type==='monster-guard'?(source.troop==='mage'?'necropole':source.troop==='archer'?'archers':'gardien'):source.type;
 let first;
 for(const target of recipients){
  const victims=source.type==='canon'?targets.filter(t=>t.floor===target.floor&&Math.abs(t.x-target.x)<=.7):[target],travelSeconds=defenseTravel025(source,target),id='dp'+(b.defenseShotSequence025=(b.defenseShotSequence025||0)+1);
  const shot={id,at:Number((b.time+travelSeconds).toFixed(6)),sourceId:source.id,sourceX:source.centerX??source.x,sourceFloor:source.floor,kind,amount:source.damage,targetId:target.id,targetIds:victims.map(t=>t.id),targetX:target.x,targetFloor:target.floor,travelSeconds,effect:source.effect,poisonSeconds:source.poisonSeconds||0,poisonDPS:source.poisonDPS||0};
  b.defenseProjectiles025??=[];b.defenseProjectiles025.push(shot);event(b,'defense-shot',shot.sourceX,source.y,'',{...shot,defense025:true});first??=shot;
 }
 return first;
}
function releaseDefenseShot025(b,shot,{hit,event}){
 const actors=[...b.units,...b.structures],source=actors.find(a=>a.id===shot.sourceId)||{},selected=actors.find(a=>a.id===shot.targetId),impactX=selected&&!selected.transit&&selected.floor===shot.targetFloor?selected.x:shot.targetX;
 const victims=shot.kind==='mortier'?b.units.filter(t=>t.hp>0&&t.deployed!==false&&t.spawnAt<=b.time&&!t.transit&&t.floor===shot.targetFloor&&Math.abs(t.x-impactX)<=1):shot.targetIds.map(id=>actors.find(t=>t.id===id)).filter(t=>t?.hp>0&&!t.transit&&t.floor===shot.targetFloor);
 for(const t of victims){if(shot.kind==='glace'){if(!(t.freezeImmunityUntil>b.time)){t.freezeUntil=b.time+.1;t.freezeImmunityUntil=b.time+.6;event(b,'freeze',t.x,t.y,'Gel bref',{targetId:t.id,duration:.1});}}else{hit(b,t,shot.amount,shot.kind==='mortier'?'mortier':'défense',source);if(shot.effect==='poison'&&t.hp>0){t.poisonUntil=Math.max(t.poisonUntil||0,b.time+shot.poisonSeconds);t.poisonDPS=Math.max(t.poisonDPS||0,shot.poisonDPS);}}}
 event(b,'defense-impact',impactX,b.layout.floors-1-shot.targetFloor,'',{...shot,impactX,width:shot.kind==='mortier'?2:undefined,defense025:true});
}

const combatProfile=id=>HERO_PROFILES.find(h=>h.id===id);
const heroActor024=(b,id)=>[...b.units,...b.structures].find(a=>a.id===id);
const heroDistance024=(a,u)=>Math.max(0,Math.abs((a.centerX??a.x)-u.x)-(a.width||1)/2);
function heroAllies(b,u){return (u.side==='attack'?b.units:b.structures).filter(x=>x.hp>0&&x.floor===u.floor&&(u.side==='attack'?x.deployed!==false&&!x.transit:x.hero||x.solid===false));}
function heroEnemies(b,u){return (u.side==='attack'?b.structures:b.units).filter(x=>x.hp>0&&x.floor===u.floor&&!x.transit&&!(x.invisibleUntil>b.time)&&(u.side==='attack'||(x.spawnAt||0)<=b.time&&x.deployed!==false));}
function heroDamageRules(b,u,target,damage){
 if(u.hero==='brakk'&&!target.hero)damage*=1.1;
 if(u.rageUntil>b.time)damage*=1.15;
 if(target.hero==='drac')damage*=.95;
 if(target.invulnerableUntil>b.time||target.invisibleUntil>b.time)return 0;
 if(target.carapaceUntil>b.time)damage*=.8;
 if(target.barrierUntil>b.time&&target.barrierHP>0){const absorbed=Math.min(damage,target.barrierHP);target.barrierHP-=absorbed;damage-=absorbed;}
 if(target.hero==='elyra'){b.heroRng=(Math.imul(b.heroRng||1234567,1664525)+1013904223)>>>0;if(b.heroRng/4294967296<.03)return 0;}
 return damage;
}
function heroAfterHit(b,u,target,actualDamage){
 if(u.hero==='jiangshi')u.hp=Math.min(u.maxHp,u.hp+actualDamage*(target.hero?.1:.05));
 if(u.side!=='attack'||!['nyra','tanuki'].includes(u.hero)||actualDamage<=0)return;
 if(u.hero==='tanuki'&&(target.side!=='defense'||target.hero||target.troop||target.solid===false))return;
 b.heroTheft??={gold:0,elixir:0,loss:{gold:0,elixir:0}};const resource=u.hero==='nyra'?'elixir':'gold',stock=b.defenderStock[resource]||0,amount=u.hero==='tanuki'?30:Math.max(0,Math.min(stock-b.heroTheft[resource],stock*.00033)),loss=u.hero==='tanuki'?0:.5;b.heroTheft[resource]+=amount;b.heroTheft.loss[resource]+=amount*loss;
 if(u.hero==='tanuki'&&amount>0&&!u.coinShown)u.coinPending=true;
}
function summonHeroCopy(b,u,{id=null,weak=false,upstairs=false,duration=3}={}){
 b.summonSequence=(b.summonSequence||0)+1;
 const copy={...structuredClone(u),id:u.id+':echo:'+b.summonSequence,hero:id||u.hero,hp:u.maxHp*.1,maxHp:u.maxHp*.1,damage:u.damage*(weak?.25:.35),usedSpells:[1],nextAttack:b.time+.3,summoned:true,isMinion:weak,expiresAt:b.time+duration,visualSlot:b.units.length+b.structures.length,animState:'idle',attackUntil:0,heroAction:null,shieldUntil:0,invulnerableUntil:0,invisibleUntil:0,spellUses:{1:99},coinPending:false};
 if(u.skill31==='chacal'){copy.hp*=1+u.skillValue31;copy.maxHp*=1+u.skillValue31;}if(u.skill31==='drac')copy.damage*=1+u.skillValue31;
 if(upstairs&&u.floor<b.layout.floors-1){const jump=.85,toFloor=u.floor+1;copy.transit={floor:toFloor,arriveAt:b.time+jump,landingX:u.x};copy.heroJump={startAt:b.time,landAt:b.time+jump,fromFloor:u.floor,toFloor,x:u.x};copy.expiresAt=b.time+jump+duration;}
 if(u.side==='attack'){copy.deployed=true;copy.spawnAt=b.time;copy.visited=[];b.units.push(copy);}else{copy.solid=false;b.structures.push(copy);}return copy;
}
// Actions are serializable: no timers or callbacks in the battle state/replay.
function beginHeroAction024(b,u,kind,payload={}){
 const clip=kind==='strike'||kind==='heal'?'strike':'cast',timing=HERO_ANIMATION_TIMINGS_024[u.hero]?.[clip];if(!timing)return false;
 const raw=timing.totalMs/1000,interval=u.attackInterval||u.interval||raw,scale=clip==='strike'?Math.min(1,interval*.85/raw):1;
 let holdSeconds=null,duration=raw*scale,release=(timing.releaseMs??timing.totalMs*.6)/1000*scale;
 if(clip==='cast'&&['tortue','tarasque'].includes(u.hero)){holdSeconds=u.hero==='tortue'?3+.3*(u.level-1):3;duration=raw-3+holdSeconds;release=.75;}
 b.heroActionSequence=(b.heroActionSequence||0)+1;
 const action={id:'ha'+b.heroActionSequence,kind,clip,startAt:b.time,releaseAt:Number((b.time+release).toFixed(6)),endAt:Number((b.time+duration).toFixed(6)),scale,holdSeconds,released:false,...payload};
 u.heroAction=action;u.animState='attack';u.attackUntil=action.endAt;return action;
}
function beginHeroStrike024(b,u,target,amount){return beginHeroAction024(b,u,'strike',{targetId:target.id,amount});}
function heroEvent024(b,u,event,type,text,extra={}){event(b,type,u.x,u.y,text,{heroId:u.hero,sourceId:u.id,sourceX:u.x,sourceFloor:u.floor,direction:u.direction||1,visualSlot:u.visualSlot||0,isMinion:!!u.isMinion,side:u.side,clip:u.heroAction?.clip||'strike',...extra});}
function heroImpact024(b,u,targets,amount,origin,at,event,kind='impact',extra={}){
 const id='hp'+(b.heroProjectileSequence=(b.heroProjectileSequence||0)+1);
 b.heroImpacts??=[];b.heroImpacts.push({id,at:Number(at.toFixed(6)),sourceId:u.id,heroId:u.hero,targetIds:targets.map(t=>t.id),amount,origin,kind,floor:targets[0]?.floor??u.floor,x:targets[0]?.centerX??targets[0]?.x??u.x,...extra});
 return id;
}
function releaseHeroStrike024(b,u,a,{hit,event}){
 const target=heroActor024(b,a.targetId),range=u.range||.55;
 if(!target||target.hp<=0||target.floor!==u.floor||target.transit||target.invisibleUntil>b.time||heroDistance024(target,u)>range+.02)return;
 u.direction=Math.sign((target.centerX??target.x)-u.x)||u.direction||1;
 const enemies=heroEnemies(b,u),isArea=!u.isMinion&&['morghul','drac','chacal'].includes(u.hero);
 const targets=[target,...(isArea?enemies.filter(t=>t.id!==target.id&&heroDistance024(t,u)<=range&&(u.hero!=='drac'||((t.centerX??t.x)-u.x)*u.direction>=0)).slice(0,u.hero==='chacal'?20:1):[])];
 heroEvent024(b,u,event,'hero-release','',{targetId:target.id,targetIds:targets.map(t=>t.id),targetX:target.centerX??target.x,targetFloor:target.floor,actionId:a.id});
 if(u.hero==='drac'){
  const speed=10,dir=u.direction,travel=range/speed;
  heroEvent024(b,u,event,'hero-projectile','Boule de feu',{targetId:target.id,targetX:u.x+range*dir,targetFloor:u.floor,travelSeconds:travel,actionId:a.id,kind:'fireball'});
  for(const t of targets){
   const cells=t.hero||t.solid===false?[t.x]:Array.from({length:t.width||1},(_,i)=>t.x+i-.5*dir);
   for(const x of cells){const dist=(x-u.x)*dir;if(dist<-.02||dist>range+.02)continue;heroImpact024(b,u,[t],a.amount,'attaque',b.time+Math.max(.025,dist/speed),event,'fireball',{x});}
  }
 }else if(['ignara','kryos','vexa','morghul','nian'].includes(u.hero)){
  const travel=u.hero==='nian'?.2:Math.max(.12,Math.min(.35,Math.abs((target.centerX??target.x)-u.x)/8));
  heroEvent024(b,u,event,'hero-projectile','',{targetId:target.id,targetIds:targets.map(t=>t.id),targetX:target.centerX??target.x,targetFloor:target.floor,travelSeconds:travel,actionId:a.id,kind:u.hero==='nian'?'firecracker':'magic'});
  for(const t of targets)heroImpact024(b,u,[t],a.amount,'attaque',b.time+travel,event,u.hero==='nian'?'firecracker':'magic');
 }else{for(const t of targets)hit(b,t,a.amount,'attaque',u);heroEvent024(b,u,event,'hero-impact','',{targetId:target.id,targetIds:targets.map(t=>t.id),targetX:target.centerX??target.x,targetFloor:target.floor,kind:'strike'});}
}
function useCurrentHeroSpell(b,u,{hit,event},slot=1){
 if(globalThis.BLABOX0310?.special)return globalThis.BLABOX0310.special(b,u,slot,{hit,event});
 const h=combatProfile(u?.hero);if(!h)return false;
 const availability=spellAvailability(b,u,slot);
 if(!u||b.status!=='running'||u.hp<=0||slot!==1||h.mechanic==='support'||u.hero==='tanuki'||(!b.useMana&&u.usedSpells?.includes(1))||!availability.allowed||u.transit||u.spawnAt>b.time||u.heroAction?.endAt>b.time||u.freezeUntil>b.time)throw Error(availability?.reason||'Sort indisponible.');
 if(h.mechanic==='drac'&&u.floor>=b.layout.floors-1)throw Error('Aucun étage supérieur pour le double.');
 if(h.mechanic==='tarasque'&&!(u.side==='defense'&&b.structures.some(a=>a.hp>0&&!a.hero&&a.solid!==false&&a.floor===u.floor)))throw Error('Ce sort protège une structure défensive alliée.');
 if(h.mechanic==='turtle'&&u.hp>u.maxHp*.5)throw Error('La carapace se déclenche sous 50 % de vie.');
 if(h.mechanic==='revive'&&!(u.side==='attack'?b.units:b.structures).some(a=>a.hero&&a.hp<=0&&!a.summoned))throw Error('Aucun héros tombé à ressusciter.');
 if(h.mechanic==='trap'&&u.side!=='attack')throw Error('Aucun piège ennemi à neutraliser en défense.');
 const a=beginHeroAction024(b,u,'cast');if(!a)return false;
 if(b.useMana){const pool=u.side==='defense'?b.defenseMana:b.mana;pool.amount=Math.max(0,pool.amount-availability.cost);u.spellUses??={};u.spellUses[slot]=(u.spellUses[slot]||0)+1;u.spellReadyAt??={};u.spellReadyAt[slot]=a.releaseAt+availability.cooldownSeconds;}
 u.usedSpells??=[];u.usedSpells.push(1);u.nextAttack=Math.max(u.nextAttack||0,a.endAt);heroEvent024(b,u,event,'hero-cast-start',h.skill,{actionId:a.id,releaseAt:a.releaseAt});return true;
}
function releaseHeroSpell024(b,u,a,{hit,event}){
 const h=combatProfile(u.hero);if(!h||antimagicSuppressed(b,u)){heroEvent024(b,u,event,'hero-cast-cancel','Zone antimagie',{actionId:a.id});return;}
 const allies=h.mechanic==='tarasque'?(u.side==='defense'?b.structures.filter(t=>t.hp>0&&!t.hero&&t.solid!==false&&t.floor===u.floor):[]):heroAllies(b,u),enemies=heroEnemies(b,u),g=u.level-1,distance=t=>Math.abs((t.centerX??t.x)-(u.centerX??u.x));let affected=[];
 if(h.mechanic==='revive'){
  const dead=(u.side==='attack'?b.units:b.structures).filter(t=>t.hero&&t.hp<=0&&!t.summoned).sort((x,y)=>(y.diedAt||0)-(x.diedAt||0))[0];if(dead){dead.hp=dead.maxHp*.15;dead.dead=false;dead.transit=null;dead.heroAction=null;if(dead.side==='attack'){dead.floor=u.floor;dead.x=u.x;dead.centerX=u.x;dead.y=u.y;}dead.nextAttack=b.time+.3;affected=[dead];}
 }else if(h.mechanic==='aegis'){affected=allies.filter(t=>t.id!==u.id&&distance(t)<=1);for(const t of affected)t.invulnerableUntil=b.time+2+.3*g;}
 else if(h.mechanic==='brakk')affected=[summonHeroCopy(b,u,{duration:3+.2*g})];
 else if(h.mechanic==='drac'){if(u.floor<b.layout.floors-1)affected=[summonHeroCopy(b,u,{upstairs:true,duration:8})];}
 else if(h.mechanic==='chacal')for(let i=0;i<(u.level>=12?3:2);i++)affected.push(summonHeroCopy(b,u,{weak:true,duration:3+.3*g}));
 else if(h.mechanic==='turtle'){u.carapaceUntil=b.time+3+.3*g;u.rootedUntil=u.carapaceUntil;affected=[u];}
 else if(h.mechanic==='nyra'){u.invisibleUntil=b.time+6;affected=[u];}
 else if(h.mechanic==='jiangshi'){u.hp=Math.min(u.maxHp,u.hp+u.maxHp*.1);affected=[u];}
 else if(h.mechanic==='trap'){const dir=u.direction||1;for(const t of b.traps.filter(t=>t.floor===u.floor&&(t.x-u.x)*dir>=0&&Math.abs(t.x-u.x)<=4)){t.disabled=true;t.revealed=true;event(b,'trap-disarmed',t.x,t.y,'Piège neutralisé',{trapId:t.id});}}
 else if(h.mechanic==='healer'){affected=allies;for(const t of affected)t.hp=Math.min(t.maxHp,t.hp+t.maxHp*.07);}
 else if(h.mechanic==='tarasque'){const t=allies.sort((x,y)=>x.hp/x.maxHp-y.hp/y.maxHp)[0];if(t){t.barrierHP=u.maxHp*.2;t.barrierUntil=b.time+3;affected=[t];}}
 else if(h.mechanic==='nian'){
  const target=enemies.filter(t=>distance(t)<=2).sort((x,y)=>distance(x)-distance(y))[0];if(target){affected=enemies.filter(t=>Math.abs((t.centerX??t.x)-(target.centerX??target.x))<=2);heroImpact024(b,u,affected,u.damage*.5,'sort',b.time+.2,event,'fireworks',{x:target.centerX??target.x,floor:target.floor,interruptSeconds:.4});heroEvent024(b,u,event,'hero-projectile','Feu d’artifice',{targetId:target.id,targetX:target.centerX??target.x,targetFloor:target.floor,travelSeconds:.2,kind:'fireworks',clip:'cast',actionId:a.id});}
 }else if(h.mechanic!=='tanuki'){
  const dir=u.direction||1;affected=enemies.filter(t=>distance(t)<=2&&(h.mechanic!=='gorvak'||((t.centerX??t.x)-u.x)*dir>=0));for(const t of affected){if(h.mechanic==='tharos'){t.freezeUntil=b.time+1;delayHeroAction024(t,Math.max(0,Math.min(b.heroTickEnd024??b.time,t.freezeUntil)-b.time));}else hit(b,t,u.damage,'sort',u);}
 }
 heroEvent024(b,u,event,'spell',h.skill,{slot:1,actionId:a.id,targetIds:affected.map(t=>t.id),targetX:affected[0]?.centerX??affected[0]?.x??u.x,targetFloor:affected[0]?.floor??u.floor,kind:h.mechanic,clip:'cast'});
}
function delayHeroAction024(u,seconds){
 const a=u.heroAction;if(!a||a.released||seconds<=0)return;
 a.startAt+=seconds;a.releaseAt=Number((a.releaseAt+seconds).toFixed(6));a.endAt=Number((a.endAt+seconds).toFixed(6));u.attackUntil=a.endAt;
 if(a.kind==='cast'&&u.spellReadyAt?.[1])u.spellReadyAt[1]+=seconds;
 if(Number.isFinite(u.nextAttack))u.nextAttack+=seconds;
}
function processHeroActions024(b,dt,{hit,event,defenseImpact=null}){
 const end=b.time,actors=[...b.units,...b.structures];b.heroTickEnd024=end;
 for(const u of actors){
  const a=u.heroAction;if(!a)continue;
  if(u.hp<=0||u.expiresAt&&u.expiresAt<=end){u.heroAction=null;continue;}
  const overlap=Math.max(0,Math.min(end,u.freezeUntil||0)-(end-dt));if(overlap&&!a.released)delayHeroAction024(u,overlap);
 }
 // Merge releases and impacts by their real timestamp. Actor order must not decide a duel.
 for(let count=0;count<10000&&b.status==='running';count++){
  const releases=actors.filter(u=>u.hp>0&&u.heroAction&&!u.heroAction.released&&u.heroAction.releaseAt<=end).map(u=>({at:u.heroAction.releaseAt,u,a:u.heroAction}));
  const impacts=(b.heroImpacts||[]).filter(p=>p.at<=end).map(p=>({at:p.at,p}));
  const defenseJobs=(b.defenseProjectiles025||[]).filter(p=>p.at<=end).map(p=>({at:p.at,defense:p}));
  const job=[...releases,...impacts,...defenseJobs].sort((x,y)=>x.at-y.at||Number(!!y.p)-Number(!!x.p))[0];if(!job)break;b.time=job.at;
  if(job.defense){b.defenseProjectiles025=b.defenseProjectiles025.filter(p=>p.id!==job.defense.id);if(defenseImpact)defenseImpact(b,job.defense,{hit,event});}
  else if(job.a){const {u,a}=job;a.released=true;
   if(a.kind==='cast')releaseHeroSpell024(b,u,a,{hit,event});
   else if(a.kind==='strike')releaseHeroStrike024(b,u,a,{hit,event});
   else if(a.kind==='heal'){const stats=heroCombatStats(u.hero,u.level),targets=a.targetIds.map(id=>heroActor024(b,id)).filter(t=>t?.hp>0&&t.floor===u.floor);for(const t of targets){t.hp=Math.min(t.maxHp,t.hp+stats.heal*(1+(u.skill31==='elyra'?u.skillValue31:0)));event(b,'heal',t.x,t.y,'+'+Math.round(stats.heal*(1+(u.skill31==='elyra'?u.skillValue31:0))),{heroId:u.hero,sourceId:u.id,targetId:t.id,targetIds:[t.id],sourceX:u.x,sourceFloor:u.floor,clip:'strike'});}}
   else if(a.kind==='passive')heroEvent024(b,u,event,'hero-passive','Pièce rangée',{kind:'coins',clip:'cast'});
  }else{
   const p=job.p;b.heroImpacts=b.heroImpacts.filter(x=>x.id!==p.id);const u=heroActor024(b,p.sourceId);if(!u)continue;
   const targets=p.targetIds.map(id=>heroActor024(b,id)).filter(t=>t?.hp>0&&t.floor===p.floor&&!t.transit);
   for(const t of targets){hit(b,t,p.amount,p.origin,u);if(p.interruptSeconds){const pending=t.heroAction&&!t.heroAction.released;if(pending)delayHeroAction024(t,p.interruptSeconds);else t.nextAttack=Math.max(t.nextAttack||0,b.time)+p.interruptSeconds;}}
   heroEvent024(b,u,event,'hero-impact','',{targetIds:targets.map(t=>t.id),targetId:targets[0]?.id,targetX:p.x,targetFloor:p.floor,kind:p.kind,clip:p.origin==='sort'?'cast':'strike',impactId:p.id});
  }
 }
 b.time=end;delete b.heroTickEnd024;
 for(const u of actors)if(u.heroAction&&(u.hp<=0||end>=u.heroAction.endAt))u.heroAction=null;
}

function updateCurrentHero(b,u,dt,{event,hit,walkTo}){
 if(u.expiresAt&&b.time>=u.expiresAt){u.hp=0;u.dead=true;return true;}
 const h=combatProfile(u.hero);if(!h)return false;
 if(h.mechanic==='healer'){const stats=heroCombatStats(u.hero,u.level);u.hp=Math.min(u.maxHp,u.hp+stats.selfHeal*dt);}
 if(u.heroAction?.endAt>b.time||u.rootedUntil>b.time)return true;
 if(u.freezeUntil>b.time)return true;
 if(h.mechanic==='turtle'&&u.hp<=u.maxHp*.5&&!u.usedSpells?.includes(1)){const available=spellAvailability(b,u);if(available.allowed){useCurrentHeroSpell(b,u,{hit,event});return true;}}
 if(u.hero==='tanuki'&&u.coinPending&&!heroEnemies(b,u).some(t=>heroDistance024(t,u)<=(u.range||.55))){u.coinPending=false;u.coinShown=true;beginHeroAction024(b,u,'passive');return true;}
 if(h.mechanic!=='healer')return false;
 const stats=heroCombatStats(u.hero,u.level),hurt=heroAllies(b,u).filter(t=>t.id!==u.id&&t.hp<t.maxHp),heroes=hurt.filter(t=>t.hero),targets=(heroes.length?heroes:hurt).sort((x,y)=>x.hp/x.maxHp-y.hp/y.maxHp).slice(0,heroes.length?1:u.level>=12?2:1);
 if(targets.length){if(Math.abs(targets[0].x-u.x)>1&&u.side==='attack')walkTo(b,u,targets[0].x,dt);else if(b.time>=u.nextAttack){u.nextAttack=b.time+stats.interval;beginHeroAction024(b,u,'heal',{targetIds:targets.map(t=>t.id)});}return true;}
 // Elyra follows her allies, without the old zero-damage attack loop.
 if(u.side==='attack'){
  const ally=heroAllies(b,u).filter(t=>t.id!==u.id).sort((x,y)=>Math.abs(x.x-u.x)-Math.abs(y.x-u.x))[0];
  if(ally&&Math.abs(ally.x-u.x)>.7)walkTo(b,u,ally.x,dt);
  else if(!heroEnemies(b,u).length&&u.floor<b.layout.floors-1&&walkTo(b,u,b.layout.doors[u.floor].x,dt))u.transit={floor:u.floor+1,arriveAt:b.time+.3};
 }
 return true;
}

function simulateConstructionPlan023(scale=CONSTRUCTION_SCALE_023){
const types=[...BUILDINGS,...DEFENSES,...TRAPS,BARRICADE],weights=CONSTRUCTION_WEIGHTS_023;
const duration=(type,to,scale)=>{if(['centre-bataille','batiment-alliance'].includes(type)){const fastest=to<=4?Math.round([0,1800,1800,8271,20181][to]/4):Math.round(3600*1.34**(to-5)*.75*scale);return Math.max(1,Math.round(fastest*constructionLevelMultiplier026(to)*.65));}const base=to<=4?Math.round([0,1800,1800,8271,20181][to]/4):Math.round(3600*1.34**(to-5)*(weights[type]??1)*scale);return (type!=='barricade'&&!type.startsWith('trap-'))?Math.max(1,Math.round(base*constructionLevelMultiplier026(to))):base;};
const floorSeconds=(floor,scale)=>PROGRESSION_V06.extraFloorUnlocks[floor-1]<=4?450:Math.round(3600*1.34**(PROGRESSION_V06.extraFloorUnlocks[floor-1]-5)*1.5*scale);
let now=0,rows=[],instances={};for(const t of types)instances[t.id]=[];let floors=3;
 for(let target=1;target<=20;target++){
  let started=now;
  const core=instances.core[0]||{level:0};instances.core=[core];if(core.level<target){now+=duration('core',target,scale);core.level=target;}
  // Académie et forge avant les autres améliorations du palier.
  for(const group of [types.filter(t=>['academie','atelier-monstres','forge'].includes(t.id)),types.filter(t=>!['core','academie','atelier-monstres','forge'].includes(t.id))]){
   let chains=[];
   for(const t of group){const unlock=PROGRESSION_V06.unlocks[t.id]??t.unlock??1;if(unlock>target)continue;const count=v06InstanceLimit(t.id,target);while(instances[t.id].length<count)instances[t.id].push({level:0});for(const unit of instances[t.id]){let jobs=[];for(let n=unit.level+1;n<=target;n++)jobs.push(duration(t.id,n,scale));if(jobs.length)chains.push({type:t.id,unit,jobs});}}
   const end=[now,now];while(chains.some(c=>c.jobs.length)){const worker=end[0]<=end[1]?0:1;let choices=chains.filter(c=>c.jobs.length).sort((a,b)=>b.jobs.reduce((a,b)=>a+b,0)-a.jobs.reduce((a,b)=>a+b,0));let c=choices[0];const ready=c.ready||now;end[worker]=Math.max(end[worker],ready)+c.jobs.shift();c.ready=end[worker];if(!c.jobs.length)c.unit.level=target;}
   now=Math.max(...end);
  }
  while(floors<10&&target>=PROGRESSION_V06.extraFloorUnlocks[floors-1]){now+=floorSeconds(floors,scale);floors++;}
  rows.push({level:target,seconds:now-started,days:(now-started)/86400,cumulativeDays:now/86400});
 }
 return {rows,total:rows.filter(r=>r.level>=5).reduce((s,r)=>s+r.seconds,0)};
}

const pathDefault=castlePath;
function createState(now=Date.now()){return {version:VERSION,builders:1,recruitedBuilders:1,revision:0,name:'Explorateur',level:1,rating:1000,wallet:{gold:2500,elixir:1800,diamonds:100},levels:{mine:1,extracteur:1,forge:1,academie:1,reserve:1,reservoir:1},jobs:[],inventory:{60:3,300:2,900:1,3600:1},timeCredit:0,lastProduction:now,stored:{gold:0,elixir:0},layout:defaultCastle(),published:null,heroes:Object.fromEntries(HEROES.map(h=>[h.id,{unlocked:['brakk','nyra','ignara','aigle','kryos'].includes(h.id),level:1}])),army:{troop:'fantassin',count:6,heroes:['brakk']},campaign:[],calendar:{cycle:1,day:0,lastClaim:null},challengeCounts:{},challengeClaims:[],stats:{attacks:0,wins:0,destroyed:0},history:[],cosmetics:{owned:['background-astral','skin-astral'],background:'background-astral',skin:'skin-astral'},clan:null,chat:{national:[],clan:[]},weekClaims:[],processed:[]};}
function migrateState(input){
 if(!input||!['0.2.0','0.4.0','0.5.0',VERSION].includes(input.version)||!input.wallet||!input.layout||!Number.isInteger(input.level)||input.level<1||input.level>20)throw Error('Sauvegarde incompatible.');
 const s=migrateRetiredHeroes024(input);if(s.version!==VERSION||s.layout.schema!==5){
  if(s.legacyLayout||s.legacyPublished){s.layoutMigrationHistory??=[];s.layoutMigrationHistory.push({migration:structuredClone(s.migration??null),legacyLayout:structuredClone(s.legacyLayout??null),legacyPublished:structuredClone(s.legacyPublished??null)});}
  s.legacyLayout=structuredClone(s.layout);s.layout=migrateLegacyLayout(s.layout,s.level,s.levels);if(s.published){s.legacyPublished=structuredClone(s.published);s.published={...s.published,layout:migrateLegacyLayout(s.published.layout,s.level,s.levels)};}s.version=VERSION;s.migration={from:input.version,to:VERSION,repositioned:input.version==='0.2.0'||input.layout.schema===3};}
 s.cosmetics??={owned:['background-astral','skin-astral'],background:'background-astral',skin:'skin-astral'};s.cosmetics.owned=[...new Set([...s.cosmetics.owned,'background-astral','skin-astral'])];syncCastle(s);validateLayout(s.layout);return s;
}
function structureInfo(layout,item){
 const c=BUILDINGS.find(c=>c.id===item.type)||DEFENSES.find(c=>c.id===item.type)||(item.type==='barricade'?BARRICADE:null)||DECORATIONS.find(d=>d.id===item.type)||HEROES.find(h=>h.id===item.hero)||TRAPS.find(t=>t.id===item.type);
 const trap=TRAPS.includes(c),factor=1+(item.hero ? .12 : .2)*(item.level-1);
 const bonus=defenseHeroBonuses(layout,item),stats={...c,hero:item.hero,level:item.level,width:itemWidth(item),hp:trap?0:Math.round(c.hp*factor),damage:Math.round((c.damage||0)*(1+(trap ? .15 : item.hero ? .13 : .18)*(item.level-1))),indestructible:trap,...(item.hero?{interval:v06HeroStats(item.hero,item.level).interval}:{}),...(DEFENSES.includes(c)?v06DefenseStats(item.type,item.level):{}),id:item.id,type:item.type};
 if(item.hero){const hs=v06HeroStats(item.hero,item.level);stats.hp=hs.hp;stats.damage=hs.damage;stats.range=hs.range;stats.interval=hs.interval;stats.mechanic=hs.mechanic;}
 if(!trap&&!item.hero)stats.hp=Math.round(stats.hp*(1+bonus.buildingHP));
 if(item.hero)stats.hp=Math.round(stats.hp*(1+bonus.armyHP));
 if(!item.hero)stats.damage=Math.round(stats.damage*(1+bonus.defenseAttack));
 if(item.hero)stats.damage=Math.round(stats.damage*(1+bonus.attack));
 if(item.type==='gardien'){stats.guard=true;stats.mechanical=true;stats.speed=.95;}
 if(item.type==='core'){stats.damage=Math.round(4*(1+.15*(item.level-1)));stats.range=1;stats.interval=6;stats.color='#ffe8a0';}stats.damageReduction=!trap&&!item.hero?bonus.damageReduction:0;stats.heroBonus=bonus;return stats;
}
const clone=x=>JSON.parse(JSON.stringify(x));
const productionRate=l=>Math.round(270*1.3**(l-1));
const storeCap=l=>productionRate(l)*10;
const walletCap=l=>storageCapacity(l);
function settle(s,now=Date.now()){if(s.version!==VERSION)Object.assign(s,migrateState(s));syncCastle(s);if(now<s.lastProduction)return s;const advance=end=>{let hours=Math.max(0,end-s.lastProduction)/3600000;s.stored.gold=Math.min(storeCap(s.levels.mine),s.stored.gold+hours*productionRate(s.levels.mine));s.stored.elixir=Math.min(storeCap(s.levels.extracteur),s.stored.elixir+hours*productionRate(s.levels.extracteur));s.lastProduction=end;};for(const j of s.jobs.filter(j=>j.endsAt<=now).sort((a,b)=>a.endsAt-b.endsAt)){advance(Math.max(s.lastProduction,j.endsAt));if(j.target==='core')s.level=j.to;else if(j.target.startsWith('hero:'))s.heroes[j.target.slice(5)].level=j.to;else if(s.levels[j.target]!=null)s.levels[j.target]=j.to;else{let item=[...allSolids(s.layout),...s.layout.traps,...(s.layout.relocation||[]).map(r=>r.item)].find(x=>x.id===j.target);if(item)item.level=j.to;}}s.jobs=s.jobs.filter(j=>j.endsAt>now);advance(now);syncCastle(s);return s;}

function durationRaw(to){return constructionSeconds023('core',to);}
function simulateProgression(scale=CONSTRUCTION_SCALE_023){return simulateConstructionPlan023(scale).total;}
const TIMER_SCALE=CONSTRUCTION_SCALE_023;
function upgradeDuration(to,target){return constructionSeconds023(target,to);}
function upgradeInfo(s,target){const building=s.layout.buildings.find(b=>b.id===target);if(building)target=building.type;let from=target==='core'?s.level:target.startsWith('hero:')?s.heroes[target.slice(5)]?.level:s.levels[target]??[...allSolids(s.layout),...s.layout.traps].find(x=>x.id===target)?.level;if(!from||from>=20)throw Error('Niveau maximum ou cible inconnue');if(s.jobs.length>=2)throw Error('Les deux emplacements sont occupés');if(s.jobs.some(j=>j.target===target))throw Error('Amélioration déjà en cours');let to=from+1;if(target==='core'){for(const k of ['mine','extracteur','forge','academie','reserve','reservoir'])if(s.levels[k]<Math.max(1,to-(['mine','extracteur'].includes(k)?2:3)))throw Error('Améliorez '+k+' avant le cœur');}else if(to>s.level)throw Error('Le cœur doit atteindre le niveau '+to);if(target.startsWith('hero:')&&!s.heroes[target.slice(5)]?.unlocked)throw Error('Héros non débloqué');return {target,from,to,currency:target.startsWith('hero:')?'elixir':'gold',cost:Math.round((target==='core'?900:450)*1.48**(to-2)),duration:upgradeDuration(to,target)};}
const validateLayout=validateCastle;
function mark(s,key,amount=1){s.challengeCounts[key]=(s.challengeCounts[key]||0)+amount;}
function applyCommand(input,cmd,now=Date.now()){let s=settle(clone(input),now);if(!cmd||typeof cmd.type!=='string')throw Error('Commande invalide');if(cmd.id&&s.processed.includes(cmd.id))return s;const pay=(currency,cost)=>{if(!Number.isSafeInteger(cost)||cost<0||s.wallet[currency]<cost)throw Error('Ressources insuffisantes');s.wallet[currency]-=cost;};
 switch(cmd.type){
 case 'moveDoor':moveDoor(s.layout,Number(cmd.floor),Number(cmd.x));break;
 case 'buyCosmetic':{const c=COSMETICS.find(c=>c.id===cmd.cosmetic);if(!c)throw Error('Décor inconnu');s.cosmetics??={owned:['background-astral','skin-astral'],background:'background-astral',skin:'skin-astral'};if(s.cosmetics.owned.includes(c.id))throw Error('Déjà acheté');pay('diamonds',c.price);s.cosmetics.owned.push(c.id);s.cosmetics[c.kind]=c.id;break;}
 case 'equipCosmetic':{const c=COSMETICS.find(c=>c.id===cmd.cosmetic);if(!c||!(s.cosmetics?.owned?.includes(c.id)||['background-astral','skin-astral'].includes(c.id)))throw Error('Décor non possédé');s.cosmetics[c.kind]=c.id;break;}
 case 'collect':for(const k of ['gold','elixir']){let amount=Math.min(Math.floor(s.stored[k]),Math.max(0,walletCap(s.levels[k==='gold'?'reserve':'reservoir'])-s.wallet[k]));s.wallet[k]+=amount;s.stored[k]-=amount;mark(s,'collect:'+k);}break;
 case 'upgrade':{let u=upgradeInfo(s,cmd.target);pay(u.currency,u.cost);s.jobs.push({...u,id:cmd.id||'j'+now,endsAt:now+u.duration*1000});mark(s,'upgrade');if(cmd.target==='mine'||cmd.target==='extracteur')mark(s,'upgrade:'+cmd.target);if(cmd.target.startsWith('hero:'))mark(s,'upgrade:hero');break;}
 case 'speedup':{let j=s.jobs.find(j=>j.id===cmd.job);if(!j)throw Error('Amélioration inconnue');let seconds=Number(cmd.seconds);if(!SPEEDUPS.includes(seconds)||!s.inventory[seconds])throw Error('Accélérateur indisponible');s.inventory[seconds]--;let remaining=Math.max(0,(j.endsAt-now)/1000),used=Math.min(seconds,remaining);j.endsAt-=used*1000;s.timeCredit+=seconds-used;mark(s,'speedup');settle(s,now);break;}
 case 'credit':{let j=s.jobs.find(j=>j.id===cmd.job);if(!j||s.timeCredit<=0)throw Error('Crédit de temps indisponible');let used=Math.min(s.timeCredit,Math.max(0,(j.endsAt-now)/1000));s.timeCredit-=used;j.endsAt-=used*1000;settle(s,now);break;}
 case 'finish':{let j=s.jobs.find(j=>j.id===cmd.job);if(!j)throw Error('Amélioration inconnue');pay('diamonds',Math.max(1,Math.ceil((j.endsAt-now)/3600000)*5));j.endsAt=now;settle(s,now);break;}
 case 'army':{if(!TROOPS.some(t=>t.id===cmd.troop)||!Number.isInteger(cmd.count)||cmd.count<1||cmd.count>12+2*s.level)throw Error('Armée invalide');let hs=[...new Set(cmd.heroes||[])];if(hs.length>Math.min(4,1+Math.floor((s.level-1)/5))||hs.some(h=>!s.heroes[h]?.unlocked||!HEROES.find(v=>v.id===h)?.active))throw Error('Héros invalides');s.army={troop:cmd.troop,count:cmd.count,heroes:hs};mark(s,'army');break;}
 case 'place':{const c=DECORATIONS.find(d=>d.id===cmd.item)||DEFENSES.find(d=>d.id===cmd.item)||TRAPS.find(t=>t.id===cmd.item)||(cmd.item==='barricade'?BARRICADE:null);if(!c)throw Error('Structure inconnue');const list=c===BARRICADE?'barricades':DECORATIONS.includes(c)?'decorations':DEFENSES.includes(c)?'defenses':'traps';if(s.layout[list].length>=(list==='barricades'?4:4+Math.floor(s.level/2)))throw Error('Limite de placement atteinte');const floor=Number(cmd.floor),x=Number(cmd.x),item={id:cmd.id||'p'+now,type:c.id,level:1},error=placementError(s.layout,item,floor,x);if(error)throw Error(error);if(list==='decorations'&&s.layout.decorations.filter(o=>o.floor===floor).length>=2)throw Error('Deux décorations maximum par étage');pay(list==='decorations'?'diamonds':'gold',c.cost);s.layout[list].push(withFloor(s.layout,item,floor,x));mark(s,list==='traps'?'place:trap':'place:defense');break;}
 case 'move':{const item=[...allSolids(s.layout),...s.layout.traps].find(i=>i.id===cmd.item);if(!item)throw Error('Structure inconnue');const floor=Number(cmd.floor),x=Number(cmd.x),error=placementError(s.layout,item,floor,x,item.id);if(error)throw Error(error);Object.assign(item,withFloor(s.layout,item,floor,x));break;}
 case 'restorePlacement':{const r=s.layout.relocation?.find(r=>r.item.id===cmd.item);if(!r)throw Error('Structure à replacer inconnue');const floor=Number(cmd.floor),x=Number(cmd.x),error=placementError(s.layout,r.item,floor,x);if(error)throw Error(error);s.layout[r.list].push(withFloor(s.layout,r.item,floor,x));s.layout.relocation=s.layout.relocation.filter(i=>i!==r);validateLayout(s.layout);break;}
 case 'remove':if(s.layout.buildings.some(b=>b.id===cmd.item))throw Error('Les bâtiments du domaine peuvent être déplacés, pas retirés.');if(s.jobs.some(j=>j.target===cmd.item))throw Error('Attendez la fin de cette amélioration');for(const list of ['defenses','traps','garrisons','barricades','decorations'])s.layout[list]=s.layout[list].filter(i=>i.id!==cmd.item);break;
 case 'path':s.layout.path=clone(cmd.path);validateLayout(s.layout);break;
 case 'secondary':throw Error('Les passages doivent conserver la traversée des sols piégés.');
 case 'garrison':{if(s.level<2)throw Error('Garnison au niveau 2');const allowed=[2,7,12,17].filter(l=>s.level>=l).length;if(s.layout.garrisons.length>=allowed)throw Error('Limite de garnisons');if(!HEROES.find(v=>v.id===cmd.hero)?.active||!s.heroes[cmd.hero]?.unlocked||s.layout.garrisons.some(g=>g.hero===cmd.hero))throw Error('Héros indisponible');const item={id:cmd.id||'g'+now,hero:cmd.hero,level:1},floor=Number(cmd.floor),x=Number(cmd.x),error=placementError(s.layout,item,floor,x);if(error)throw Error(error);s.layout.garrisons.push(withFloor(s.layout,item,floor,x));validateLayout(s.layout);break;}
 case 'publish':validateLayout(s.layout);s.published={version:s.revision+1,layout:clone(s.layout),publishedAt:now};mark(s,'publish');break;
 case 'calendar':{let day=Math.floor(now/DAY);if(s.calendar.lastClaim===day)throw Error('Déjà récupéré aujourd’hui');s.calendar.lastClaim=day;s.calendar.day++;let d=s.calendar.day;s.wallet.gold+=300*s.level;s.wallet.elixir+=200*s.level;s.wallet.diamonds+=s.calendar.cycle>=3?20:5;s.inventory[3600]=(s.inventory[3600]||0)+1;if(d===30){const reward=loyaltyHero(s.calendar.cycle,s.name+':'+s.calendar.cycle,Object.keys(s.heroes).filter(id=>s.heroes[id].unlocked));if(reward)s.heroes[reward].unlocked=true;else s.wallet.diamonds+=150;s.calendar.cycle++;s.calendar.day=0;}mark(s,'calendar');break;}
 case 'challenge':{let i=Number(cmd.index);if(!Number.isInteger(i)||i<0||i>=20||!challengeDone(s,i))throw Error('Défi non terminé');if(s.challengeClaims.includes(i))throw Error('Récompense déjà reçue');s.challengeClaims.push(i);s.wallet.gold+=250;s.wallet.elixir+=180;s.wallet.diamonds+=5;s.inventory[300]=(s.inventory[300]||0)+1;if(s.challengeClaims.length===20)s.heroes.tharos.unlocked=true;break;}
 case 'visitHero':mark(s,'visit:hero');break;
 case 'rename':s.name=String(cmd.name||'').trim().slice(0,24)||'Explorateur';break;
 default:throw Error('Commande inconnue');}
 s.revision++;if(cmd.id)s.processed=[...s.processed.slice(-199),cmd.id];return s;}
function challengeDone(s,i){return [s.stats.attacks>=1,s.stats.wins>=1,s.challengeCounts['collect:gold']>=1,s.challengeCounts['collect:elixir']>=1,s.challengeCounts.upgrade>=1,s.challengeCounts['place:defense']>=1,s.challengeCounts['place:trap']>=1,s.challengeCounts.publish>=1,s.challengeCounts.speedup>=1,s.challengeCounts.calendar>=1,s.campaign.length>=2,s.campaign.length>=3,s.challengeCounts['upgrade:hero']>=1,s.challengeCounts.army>=1,s.level>=2,s.challengeCounts['upgrade:mine']>=1,s.challengeCounts['upgrade:extracteur']>=1,s.stats.destroyed>=5,s.stats.wins>=3,s.challengeCounts['visit:hero']>=1][i]||false;}
const stageRequirement=stage=>1+Math.floor(stage/2);
function stageMap(stage=0,levelOverride=null){if(stage===0&&(levelOverride??1)<=2){const l=blankCastle(1);l.buildings=[withFloor(l,{id:'npc-building:mine',type:'mine',level:1},0,4),withFloor(l,{id:'npc-building:core',type:'core',level:1},2,4)];l.defenses=[withFloor(l,{id:'enemy0',type:'archers',level:1},0,8)];return l;}const tier=Math.floor(stage/8),lv=levelOverride??stageRequirement(stage),layout=blankCastle(lv);const types=[['archers','arbalete','glace','electricite','baliste','gardien'],['glace','baliste','poison','mortier','electricite','arbalete'],['poison','necropole','archers','infernale','glace','mortier'],['infernale','gardien','antimagie','mortier','arbalete','electricite']];for(const [index,type] of ['mine','forge','core'].entries())placeFirstFree(layout,{id:'npc-building:'+type,type,level:lv},'buildings',index===2?layout.floors-1:Math.min(index,layout.floors-1));for(let i=0;i<Math.min(6,2+Math.floor(stage/6));i++){const type=types[tier][i];if(v06InstanceLimit(type,lv)>layout.defenses.filter(d=>d.type===type).length)placeFirstFree(layout,{id:'enemy'+i,type,level:lv},'defenses',i%layout.floors);}for(let i=0;i<Math.min(6,1+Math.floor(stage/5));i++){const pool=TRAPS.filter(t=>v06InstanceLimit(t.id,lv)>(layout.traps.filter(x=>x.type===t.id).length));if(pool.length)placeFirstFree(layout,{id:'et'+i,type:pool[i%pool.length].id,level:lv},'traps',i%layout.floors);}if(stage%8===7){const h=placeFirstFree(layout,{id:'boss-house',type:'caserne-heros',level:lv},'buildings',layout.floors-1);layout.garrisons.push(withFloor(layout,{id:'boss',hero:['tharos','brakk','morghul','gorvak'][tier],level:lv,caserneId:h.id},h.floor,h.x));}validateLayout(layout);return layout;}
function createBattle(s,layout,stage=0,options={}){
 s=migrateRetiredHeroes024(s);layout=migrateRetiredHeroes024({layout}).layout;
 if(options.preview===true)v06ValidatePreviewLayout(layout);else validateLayout(layout);
 const attackHeroes=[...new Set(s.army.heroes)],defenseHeroes=(layout.garrisons||[]).map(g=>g.hero),bonus=s.layout?.garrisons?defenseHeroBonuses(s.layout):heroBonuses(attackHeroes);
 const b={attackSkills326:clone(s.layout?.bonusContext326||{equipped:{}}),rulesVersion:APPLICATION_VERSION,maxTime:900,time:0,status:'running',stage,units:[],structures:[],traps:clone(layout.traps).map(t=>({...t,used:false,revealed:false,triggered:[]})),layout:clone(layout),events:[],sequence:0,kills:0,clearedFloors:0,floor:0,spellCommands:[],attackHeroes,defenseHeroes,defenderStock:clone(options.defenderStock||layout.resourceStock||{gold:storageCapacity(layout.buildings.find(o=>o.type==='reserve')?.level||1),elixir:storageCapacity(layout.buildings.find(o=>o.type==='reservoir')?.level||1)})};
 const roster=s.army.roster||[{troop:s.army.troop,count:s.army.count}];let index=0;
 for(const group of roster){const base=TROOPS.find(t=>t.id===group.troop);if(!base)throw Error('Troupe inconnue');for(let i=0;i<group.count;i++){
  const monsterLevel=s.monsterLevels?.[group.troop]||s.level;const monsterStats=v06MonsterStats(base.id,monsterLevel);const hp=Math.round(monsterStats.hp*(1+bonus.armyHP+(base.id==='bouclier'?bonus.shieldBearerHP:0)));b.units.push({...base,...monsterStats,id:'u'+index,visualSlot:index,troop:base.id,level:monsterLevel,hp,maxHp:hp,damage:Math.round(monsterStats.damage*(1+bonus.attack)),speed:base.id==='brise-mur'?.7:1.05+(base.id==='eclaireur'?.05:0),x:layout.doors[0].x,y:layout.floors-1,floor:0,d:-1,spawnAt:index++*ECONOMY_RULES.spawnInterval,nextAttack:0,slowUntil:0,freezeUntil:0,poisonUntil:0,side:'attack',route:layout.path,visited:[],bag:{gold:0,elixir:0},animState:'idle',direction:1});
 }}
 for(const id of attackHeroes){const h=HEROES.find(x=>x.id===id),l=s.heroes[id].level,hs=v06HeroStats(id,l),hp=Math.round(hs.hp*(1+bonus.armyHP));b.units.push({...h,...hs,id:'h'+id,hero:id,visualSlot:index,level:l,hp,maxHp:hp,damage:Math.round(hs.damage*(1+bonus.attack)),speed:1.05,attackInterval:v06HeroStats(id,l).interval,x:layout.doors[0].x,y:layout.floors-1,floor:0,d:-1,spawnAt:index++*ECONOMY_RULES.spawnInterval,nextAttack:0,slowUntil:0,freezeUntil:0,poisonUntil:0,side:'attack',route:layout.path,visited:[],usedSpells:[],animState:'idle',direction:1});}
 for(const item of allSolids(layout)){
  const c=structureInfo(layout,item),defense=DEFENSES.some(d=>d.id===item.type)||Boolean(item.hero)||item.type==='core';
  b.structures.push({...item,...c,x:item.x,itemId:item.id,centerX:item.x+(c.width-1)/2,maxHp:c.hp,damage:defense?c.damage:0,range:defense?(c.range||2.8):0,interval:c.interval||1.1,effect:c.effect||'single',power:item.hero?c.power:null,nextPower:4,nextAttack:c.interval||1.1,disabledUntil:0,side:'defense',solid:true,serviceDisabled:Boolean(item.underConstruction),cellPitch:ECONOMY_RULES.cellPixels,floorPitch:ECONOMY_RULES.floorPixels,animState:'idle',direction:1});
  }
 for(const guard of layout.monsterGarrisons||[]){const house=layout.buildings.find(h=>h.id===guard.houseId);if(!house||house.underConstruction)continue;const c=v06MonsterStats(guard.troop,guard.level);b.structures.push({...guard,...c,type:'monster-guard',guard:true,side:'defense',solid:false,width:1,hp:c.hp,maxHp:c.hp,damage:c.damage,range:['archer','mage'].includes(guard.troop)?2:.55,interval:c.attackInterval,centerX:house.x+.5,x:house.x+.5,floor:house.floor,y:layout.floors-1-house.floor,nextAttack:1,disabledUntil:0,animState:'idle',direction:1});}
 b.useMana=options.useMana===true;b.mana={amount:options.manaAmount||0,capacity:options.manaCapacity||0};const ml=layout.buildings.find(h=>h.type==='mana'&&!h.underConstruction)?.level||0;b.defenseMana={amount:manaCapacity(ml),capacity:manaCapacity(ml)};
 for(const u of b.units.filter(u=>u.hero)){if(options.heroLife?.[u.hero]!=null)u.hp=u.maxHp*options.heroLife[u.hero];}
 b.destruction=battleDestruction(b);b.victorySecured=false;b.manualDeployment=options.manualDeployment===true;b.started=!b.manualDeployment;b.deployCommands=[];if(b.manualDeployment)for(const u of b.units){u.deployed=false;u.spawnAt=Number.MAX_SAFE_INTEGER;}return b;
}
function deployBattleUnit(b,selection){
 if(!b.manualDeployment||b.status!=='running')throw Error('Déploiement indisponible.');const u=b.units.find(u=>!u.deployed&&(selection.hero?u.hero===selection.hero:!u.hero&&u.troop===selection.troop));if(!u)throw Error('Aucune unité disponible de ce type.');u.deployed=true;u.spawnAt=Math.max(b.time,(b.lastDeploymentAt??-.15)+ECONOMY_RULES.spawnInterval);b.lastDeploymentAt=u.spawnAt;u.x=-1.2;u.y=b.layout.floors-1;u.floor=0;u.direction=1;b.started=true;b.deployCommands.push({time:b.time,unitId:u.id,troop:u.troop||null,hero:u.hero||null});event(b,'deploy',u.x,u.y,u.name,{unitId:u.id,spawnAt:u.spawnAt,troop:u.troop,hero:u.hero});return u;
}
function event(b,type,x,y,text,extra={}){b.events.push({seq:++b.sequence,time:b.time,type,x,y,text,...extra});}
function hit(b,target,amount,origin,source=null){if(target.hp<=0||b.status!=='running')return;amount=heroDamageRules(b,source||{},target,amount);if(globalThis.BLABOX0310)amount=globalThis.BLABOX0310.damage(b,source,target,amount);const previousHP=target.hp;const shield=(target.shieldUntil||0)>b.time?.6:1,damage=amount*shield*(1-(target.damageReduction||0));target.hp=Math.max(0,target.hp-damage);if(b.loot0308)PILLAGE0308.recordHit(b,target,previousHP);event(b,'hit',target.x??0,target.y??0,String(Math.round(damage)),{targetId:target.id,hp:target.hp,origin,sourceId:source?.id||null,heroId:source?.hero||null});if(source)heroAfterHit(b,source,target,previousHP-target.hp);if(target.hp===0&&!target.dead){target.dead=true;target.diedAt=b.time;if(target.side==='defense'&&!target.hero&&target.solid!==false)b.kills++;event(b,'dead',target.x??0,target.y??0,origin,{targetId:target.id});}if(target.hp<=0&&['mine','extracteur'].includes(target.type))for(const g of b.structures.filter(g=>g.hero==='gorvak'&&g.hp>0&&!g.serviceDisabled)){g.rageHomeFloor??=g.floor;g.rageUntil=b.time+8;g.rageTargetFloor=target.floor;}if(target.type==='core'&&target.hp<=0)updateBattleOutcome(b);}
function normalHit(b,target,amount,origin,source){hit(b,target,amount,origin,source);}
const targetDistance=(d,u)=>Math.max(0,Math.abs((d.centerX??d.x)+(d.hero?0:VISUAL_HITBOXES_023[d.type]?.[(d.level||1)-1]?.offset||0)-u.x)-(d.hero?d.width||1:VISUAL_HITBOXES_023[d.type]?.[(d.level||1)-1]?.width||d.width||1)/2);
function nearestTarget(b,u,targets=b.structures){const alive=targets.filter(d=>d.hp>0&&d.floor===u.floor&&!d.transit&&!(d.invisibleUntil>b.time)),taunt=alive.filter(d=>d.carapaceUntil>b.time);return (taunt.length?taunt:alive).sort((a,c)=>targetDistance(a,u)-targetDistance(c,u)||a.id.localeCompare(c.id))[0]||null;}
const resources=d=>['reserve','reservoir'].includes(d.type);
function traverse(b,u,nextX){
 const previous=u.x,lo=Math.min(previous,nextX),hi=Math.max(previous,nextX);u.x=nextX;u.y=b.layout.floors-1-u.floor;u.d=u.floor*b.layout.slots+u.x;
 for(let x=Math.ceil(lo);x<=Math.floor(hi);x++){const key=u.floor+':'+x;if(!u.visited.includes(key))u.visited.push(key);}
 if(u.side==='defense')return;
 for(const t of b.traps){if(u.hero==='elyra'||t.disabled||((t.type==='trap-36'||t.type==='trap-34')&&t.used)||t.floor!==u.floor||t.triggered.includes(u.id)||t.x<lo-.05||t.x>hi+.05)continue;const c=TRAPS.find(x=>x.id===t.type);t.triggered.push(u.id);t.used=true;t.revealed=true;if((u.trapResistanceUntil||0)>b.time){event(b,'trap-disarmed',t.x,t.y,'Piège neutralisé',{targetId:u.id,trapId:t.id});continue;}event(b,'trap',t.x,t.y,c.name,{targetId:u.id,trapId:t.id});
  if(c.effect==='bomb'){t.explodesAt=b.time+.3;t.blastDamage=c.damage*(1+.1*(t.level-1));event(b,'bomb-armed',t.x,t.y,'Mèche allumée',{trapId:t.id});continue;}
  if(c.effect==='mana-drain'){if(b.mana)b.mana.amount=Math.max(0,b.mana.amount-(1+Math.floor(t.level/5)));continue;}
  if(c.effect==='execute')hit(b,u,u.hero?u.maxHp*.2:u.hp,'piège mortel');
  else if(c.effect==='slow')u.slowUntil=Math.max(u.slowUntil,b.time+c.duration);
  else if(c.effect==='freeze')u.freezeUntil=Math.max(u.freezeUntil,b.time+Math.min(2,c.duration));
  else if(c.effect==='poison'){u.poisonUntil=Math.max(u.poisonUntil,b.time+c.duration);u.poisonDPS=Math.max(u.poisonDPS||0,c.damage*(1+.05*(t.level-1)));}
  else if(c.effect==='fall'){u.x=Math.max(0,Math.min(b.layout.slots-1,previous-Math.sign(nextX-previous||1)*2));u.d=u.floor*b.layout.slots+u.x;}
  else hit(b,u,c.damage*(1+.15*(t.level-1)),'piège');
 }
}
function walkTo(b,u,x,dt){const speed=u.slowUntil>b.time?(u.slowMultiplier326??.45):1,delta=Math.sign(x-u.x)*Math.min(Math.abs(x-u.x),u.speed*speed*dt);if(delta){u.direction=Math.sign(delta);u.animState='walk';}traverse(b,u,u.x+delta);return Math.abs(u.x-x)<.001;}
function useBattleSpell(b,heroId,slot){
 const caster=b.units.find(u=>u.hero===heroId&&!u.summoned);if(antimagicSuppressed(b,caster))throw Error('Héros dans une zone antimagie.');
 const current=b.units.find(u=>u.hero===heroId&&!u.summoned);if(current?.active){useCurrentHeroSpell(b,current,{hit,event},slot);b.spellCommands.push({time:b.time,heroId,slot});updateBattleOutcome(b);b.raid=battleRaidReward(b);return b;}
 const u=b.units.find(u=>u.hero===heroId&&u.hp>0);if(b.status!=='running'||!u||slot<1||slot>(u.abilities||2)||!Number.isInteger(slot)||u.usedSpells.includes(slot)||u.transit||b.time<u.spawnAt)throw Error('Sort indisponible');
 u.usedSpells.push(slot);b.spellCommands.push({time:b.time,heroId,slot});const here=b.structures.filter(d=>d.hp>0&&d.floor===u.floor);
 u.animState='attack';u.attackUntil=b.time+.4;
 if(u.legendary){
  const allies=b.units.filter(a=>a.hp>0&&b.time>=a.spawnAt),hereEnemies=here;
  if(heroId==='aegis'){if(slot===1)for(const a of allies)a.shieldUntil=b.time+6;else if(slot===2)for(const d of hereEnemies)d.disabledUntil=b.time+3;else for(const a of allies)a.hp=Math.min(a.maxHp,a.hp+a.maxHp*.18);}
  if(heroId==='lyrion'){if(slot===1)for(const a of allies)a.furyUntil=b.time+6;else if(slot===2)for(const d of hereEnemies)hit(b,d,u.damage*2,'sort');else for(const a of allies)a.trapResistanceUntil=b.time+5;}
  if(heroId==='vitalis'){if(slot===1)for(const a of allies)a.hp=Math.min(a.maxHp,a.hp+a.maxHp*.3);else if(slot===2)for(const a of allies)a.shieldUntil=b.time+5;else for(const d of hereEnemies)d.disabledUntil=b.time+4;}
  if(heroId==='valdorn'){if(slot===1)u.shieldUntil=b.time+8;else if(slot===2)for(const d of hereEnemies)hit(b,d,u.damage*2.5,'sort');else for(const a of allies)a.trapResistanceUntil=b.time+6;}
 }else if(['heal','shield'].includes(u.power))for(const a of b.units.filter(a=>a.hp>0)){if(u.power==='heal')a.hp=Math.min(a.maxHp,a.hp+a.maxHp*.25);else a.shieldUntil=b.time+5;}
 else if(['freeze','disable','decoy'].includes(u.power))for(const d of here)d.disabledUntil=b.time+3;
 else if(u.power==='disarm')for(const a of b.units)a.trapResistanceUntil=b.time+5;
 else for(const d of here.filter(d=>slot===2||targetDistance(d,u)<4))hit(b,d,u.damage*(slot===1?2:1.4),'sort');
 event(b,'spell',u.x,u.y,heroId+':'+slot,{heroId,slot});return b;
}
function tickBattle(b,dt=.1){
 if(b.manualDeployment&&!b.started)return b;
 if(b.status!=='running')return b;if(!Number.isFinite(dt)||dt<=0||dt>.25)throw Error('Pas de simulation invalide');b.time=Number((b.time+dt).toFixed(6));
 if(globalThis.BLABOX0310)globalThis.BLABOX0310.tick(b,dt);processHeroActions024(b,dt,{hit,event,defenseImpact:releaseDefenseShot025});if(b.status!=='running'){b.raid=battleRaidReward(b);return b;}
 for(const trap of b.traps.filter(t=>t.explodesAt<=b.time&&!t.exploded)){trap.exploded=true;event(b,'bomb-explode',trap.x,trap.y,'Explosion',{trapId:trap.id,width:1});for(const u of b.units.filter(u=>u.hp>0&&u.deployed!==false&&u.spawnAt<=b.time&&!u.transit&&u.floor===trap.floor&&u.x>=trap.x&&u.x<trap.x+1))hit(b,u,trap.blastDamage,'bombe');}
 const due=(b.projectileHits||[]).filter(p=>p.at<=b.time);b.projectileHits=(b.projectileHits||[]).filter(p=>p.at>b.time);for(const p of due.sort((a,c)=>a.at-c.at)){const target=[...b.units,...b.structures].find(t=>t.id===p.targetId),source=[...b.units,...b.structures].find(u=>u.id===p.sourceId);if(target)hit(b,target,p.amount,p.origin,source);if(b.status!=='running')break;}
 for(const u of b.units.filter(u=>u.hp>0)){
  if(b.status!=='running')break;
  if(b.time<u.spawnAt)continue;u.d=u.floor*b.layout.slots+u.x;u.animState=(u.attackUntil||0)>b.time?'attack':'idle';
  if(u.poisonUntil>b.time)hit(b,u,(u.poisonDPS||1)*dt,'poison');if(u.hp<=0)continue;
  if(u.transit){if(b.time<u.transit.arriveAt)continue;u.floor=u.transit.floor;u.x=u.transit.landingX??b.layout.doors[u.floor].x;u.y=b.layout.floors-1-u.floor;u.d=u.floor*b.layout.slots+u.x;u.transit=null;event(b,'door-arrive',u.x,u.y,'Arrivée',{unitId:u.id,floor:u.floor});traverse(b,u,u.x);continue;}
  if(u.freezeUntil>=b.time&&u.freezeUntil>0)continue;if(updateCurrentHero(b,u,dt,{hit,event,walkTo}))continue;
  const allHere=b.structures.filter(d=>d.hp>0&&d.floor===u.floor),stock=b.structures.filter(d=>d.hp>0&&resources(d)),raider=u.role==='pillage';
  const desired=raider&&stock.length?stock.slice().sort((a,c)=>Math.abs(a.floor-u.floor)-Math.abs(c.floor-u.floor)||a.floor-c.floor||a.id.localeCompare(c.id))[0].floor:null;
  if(raider&&desired!==null&&desired!==u.floor){if(walkTo(b,u,b.layout.doors[u.floor].x,dt)){u.transit={floor:desired,arriveAt:b.time+COMMERCIAL_RULES.doorDelay};event(b,'door-enter',u.x,u.y,'Pillage',{unitId:u.id,toFloor:desired});}continue;}
  const siegeTargets=u.troop==='brise-mur'?(allHere.filter(d=>d.type==='barricade').length?allHere.filter(d=>d.type==='barricade'):allHere.filter(d=>!d.hero)):null;const target=nearestTarget(b,u,siegeTargets?.length?siegeTargets:raider&&stock.some(d=>d.floor===u.floor)?stock:allHere);u.targetId=target?.id||null;
  const range=u.hero?(u.range||.55):['archer','mage'].includes(u.troop)?2.5:.55;
  if(target){
   if(targetDistance(target,u)>range)walkTo(b,u,target.centerX,dt);
   else if(b.time>=u.nextAttack){u.nextAttack=b.time+(u.attackInterval||1);u.animState='attack';u.attackUntil=b.time+.4;u.direction=Math.sign(target.centerX-u.x)||u.direction;const damage=u.troop==='brise-mur'&&!target.hero?target.maxHp*(target.type==='barricade'?.35:.15):u.damage*(u.power==='siege'||u.troop==='sapeur'?1.5:1)*(u.furyUntil>b.time?1.2:1);if(u.hero&&u.active){beginHeroStrike024(b,u,target,damage);continue;}normalHit(b,target,damage,'attaque',u);if(!u.isMinion&&['morghul','drac','chacal'].includes(u.hero)){const others=heroEnemies(b,u).filter(d=>d.id!==target.id&&Math.abs((d.centerX??d.x)-u.x)<=range&&(u.hero!=='drac'||((d.centerX??d.x)-u.x)*u.direction>=0));for(const extra of others.slice(0,u.hero==='chacal'?(u.level>=12?20:20):1))normalHit(b,extra,damage,'attaque',u);}if(range>1)event(b,'shot',u.x,u.y,'',{sourceId:u.id,targetId:target.id,color:u.color|| (u.troop==='mage'?'#ba6aff':'#ffce62'),targetX:target.centerX,targetY:target.y});
    if(raider&&resources(target)){const key=target.type==='reserve'?'gold':'elixir',held=u.bag.gold+u.bag.elixir;u.bag[key]+=Math.min(10,Math.max(0,(u.carry||200)-held));event(b,'steal',u.x,u.y,'+10 '+key,{unitId:u.id,bag:{...u.bag}});}
   }
  }else{
   // L'étage vide mène directement à sa porte; seuls les pièges du trajet se déclenchent.
   if(u.floor<b.layout.floors-1&&walkTo(b,u,b.layout.doors[u.floor].x,dt)){u.transit={floor:u.floor+1,arriveAt:b.time+COMMERCIAL_RULES.doorDelay};event(b,'door-enter',u.x,u.y,'Montée',{unitId:u.id,toFloor:u.floor+1});}
  }
  if(u.troop==='pretre'&&b.time>=(u.nextHeal||0)){u.nextHeal=b.time+5;for(const a of b.units.filter(a=>a.hp>0&&a.floor===u.floor))a.hp=Math.min(a.maxHp,a.hp+20);}
 }
 if(b.status!=='running'){b.raid=battleRaidReward(b);b.pillage={...b.raid.gain};return b;}
 for(const d of b.structures.filter(d=>(d.hero||d.guard)&&d.hp>0&&d.rageHomeFloor!==undefined&&!d.transit&&!(d.freezeUntil>b.time)&&!(d.heroAction?.endAt>b.time))){const desired=d.rageUntil>b.time?d.rageTargetFloor:d.rageHomeFloor;if(desired!==d.floor){const door=b.layout.doors[d.floor].x,delta=Math.sign(door-d.x)*Math.min(Math.abs(door-d.x),.95*dt);d.x+=delta;d.centerX=d.x;d.animState='walk';if(Math.abs(door-d.x)<.01)d.transit={floor:d.floor+Math.sign(desired-d.floor),arriveAt:b.time+.3};}else if(d.rageUntil<=b.time){delete d.rageHomeFloor;delete d.rageTargetFloor;}}
 for(const d of b.structures.filter(d=>(d.hero||d.guard)&&d.hp>0&&d.transit)){if(b.time>=d.transit.arriveAt){d.floor=d.transit.floor;d.x=d.transit.landingX??b.layout.doors[d.floor].x;d.centerX=d.x;d.y=b.layout.floors-1-d.floor;d.transit=null;event(b,'door-arrive',d.x,d.y,'Arrivée par la porte',{unitId:d.id,floor:d.floor});}}
 for(const d of b.structures.filter(d=>d.mechanical&&d.hp>0&&!d.serviceDisabled)){d.homeFloor??=d.floor;d.floor=d.homeFloor;d.y=b.layout.floors-1-d.floor;if(!b.units.some(u=>u.hp>0&&u.deployed!==false&&u.spawnAt<=b.time&&u.floor===d.floor&&!u.transit)){d.patrolDirection??=1;const nx=d.x+d.patrolDirection*.45*dt;if(nx<0||nx>b.layout.slots-1)d.patrolDirection*=-1;d.x=Math.max(0,Math.min(b.layout.slots-1,nx));d.centerX=d.x;d.direction=d.patrolDirection;d.walkUntil=b.time+.2;}}
 for(const d of b.structures.filter(d=>(d.hero||d.guard)&&d.hp>0&&!d.serviceDisabled&&!d.transit&&!(d.rootedUntil>b.time)&&!(d.freezeUntil>b.time)&&!(d.heroAction?.endAt>b.time))){const candidates=b.units.filter(u=>u.hp>0&&b.time>=u.spawnAt&&!u.transit&&!(u.invisibleUntil>b.time)&&u.floor===d.floor),taunt=candidates.filter(u=>u.carapaceUntil>b.time),t=(taunt.length?taunt:candidates).sort((a,c)=>Math.abs(a.x-d.centerX)-Math.abs(c.x-d.centerX))[0];if(t&&Math.abs(t.x-d.centerX)>1.2){const delta=Math.sign(t.x-d.centerX)*Math.min(Math.abs(t.x-d.centerX),.95*dt);d.x=Math.max(0,Math.min(b.layout.slots-d.width,d.x+delta));d.centerX=d.x+(d.width-1)/2;d.direction=Math.sign(delta);d.animState='walk';d.walkUntil=b.time+.2;}}
 for(const d of b.structures.filter(d=>d.hero&&d.hp>0&&!d.serviceDisabled&&!d.transit)){d.skipHeroAttack=updateCurrentHero(b,d,dt,{hit,event,walkTo});if(!(d.freezeUntil>b.time)&&d.active&&!d.summoned&&(b.useMana||!d.usedSpells?.includes(1))&&d.hp<d.maxHp*.5){try{useCurrentHeroSpell(b,d,{hit,event});}catch{}}}
 for(const d of b.structures)d.animState=(d.attackUntil||0)>b.time?'attack':(d.walkUntil||0)>b.time?'walk':'idle';
 for(const d of b.structures.filter(d=>d.hp>0&&!d.transit&&!d.serviceDisabled&&d.disabledUntil<=b.time&&!(d.freezeUntil>b.time)&&!(d.heroAction?.endAt>b.time))){
  if(d.skipHeroAttack||b.time<d.nextAttack||b.status!=='running')continue;d.nextAttack=b.time+d.interval;
  const targets=b.units.filter(u=>u.hp>0&&b.time>=u.spawnAt&&!u.transit&&!(u.invisibleUntil>b.time)&&(d.hero||d.guard||d.solid===false?u.floor===d.floor&&targetDistance(d,u)<=d.range:v06InDefenseRange(d,u,b.layout.doors[d.floor].x))).sort((a,c)=>Number(c.carapaceUntil>b.time)-Number(a.carapaceUntil>b.time)||(d.hero||d.guard||d.solid===false?targetDistance(d,a)-targetDistance(d,c):v06DefenseDistance(d,a)-v06DefenseDistance(d,c))||a.id.localeCompare(c.id));
  if(d.effect==='heal'){for(const a of b.structures.filter(a=>a.hp>0&&a.floor===d.floor))a.hp=Math.min(a.maxHp,a.hp+30);continue;}
  if(d.effect==='shield'){for(const a of b.structures.filter(a=>a.hp>0&&a.floor===d.floor))a.shieldUntil=b.time+d.interval;continue;}
  if(!targets.length||(!d.damage&&d.type!=='glace'))continue;
  let selected=targets[0];
  if(d.type==='poison'&&targets.length>1)selected=targets.filter(u=>u.id!==d.lastTargetId).sort((a,c)=>Number(a.poisonUntil>b.time)-Number(c.poisonUntil>b.time)||a.poisonUntil-c.poisonUntil)[0]||selected;
  d.lastTargetId=selected.id;d.targetId=selected.id;d.aimX=selected.x;d.aimFloor=selected.floor;d.animState='attack';d.attackUntil=b.time+.4;d.direction=Math.sign(selected.x-d.centerX)||1;
  if(d.hero&&d.active){beginHeroStrike024(b,d,selected,d.damage);continue;}
  if(!d.hero){queueDefenseShot025(b,d,targets,selected,event);continue;}
  if(d.type==='glace'){
   if(!(selected.freezeImmunityUntil>b.time)){selected.freezeUntil=b.time+.1;selected.freezeImmunityUntil=b.time+.6;event(b,'freeze',selected.x,selected.y,'Gel bref',{targetId:selected.id,duration:.1});}
  }else if(d.type==='mortier'){
   const impactX=selected.x,impactFloor=selected.floor;for(const u of b.units.filter(u=>u.hp>0&&u.deployed!==false&&u.spawnAt<=b.time&&!u.transit&&u.floor===impactFloor&&Math.abs(u.x-impactX)<=1))normalHit(b,u,d.damage,'mortier',d);
   event(b,'mortar-impact',impactX,b.layout.floors-1-impactFloor,'Sous-munitions',{sourceId:d.id,width:2});
  }else{
   const victims=d.type==='baliste'?targets:d.type==='canon'?targets.filter(u=>u.floor===selected.floor&&Math.abs(u.x-selected.x)<=.7):d.hero==='chacal'&&!d.isMinion?targets:['morghul','drac'].includes(d.hero)?targets.slice(0,2):[selected];
   for(const u of victims){normalHit(b,u,d.damage,'défense',d);if(d.effect==='poison'){u.poisonUntil=Math.max(u.poisonUntil,b.time+d.poisonSeconds);u.poisonDPS=Math.max(u.poisonDPS||0,d.poisonDPS);}}
  }
  event(b,'shot',d.centerX,d.y,'',{sourceId:d.id,targetId:selected.id,kind:d.type,color:d.color||'#a4dbf1',targetX:selected.x,targetY:selected.y});

 }
 while(b.clearedFloors<b.layout.floors&&b.structures.filter(d=>d.floor===b.clearedFloors).every(d=>d.hp<=0)){event(b,'floor',0,b.layout.floors-1-b.clearedFloors,'Étage libéré');b.clearedFloors++;}
 b.floor=Math.min(b.layout.floors-1,b.clearedFloors);
 updateBattleOutcome(b);if(b.status==='running'&&b.units.every(u=>u.hp<=0||u.summoned))finishBattle(b,'army-lost');else if(b.status==='running'&&b.time>=(b.maxTime||900))finishBattle(b,'timeout');
 b.raid=battleRaidReward(b);b.pillage={...b.raid.gain};return b;
}

function runBattle(s,layout,stage){let b=createBattle(s,layout,stage);for(let i=0;i<(b.maxTime||900)*10+1&&b.status==='running';i++)tickBattle(b,.1);return b;}
function awardBattle(input,b,now=Date.now()){let s=clone(input),key='battle:'+b.id;if(b.id&&s.processed.includes(key))return s;s.stats.attacks++;s.stats.destroyed+=b.kills;if(b.status==='won'){s.stats.wins++;s.wallet.gold+=Math.round(550*(1+b.stage*.3));s.wallet.elixir+=Math.round(400*(1+b.stage*.3));if(b.kind==='pvp')s.rating+=20;if(!s.campaign.includes(b.stage)){s.campaign.push(b.stage);s.wallet.diamonds+=10;s.inventory[900]=(s.inventory[900]||0)+1;if(b.stage===7)s.heroes.tharos.unlocked=true;if(b.stage===15)s.heroes.brakk.unlocked=true;}}else if(b.kind==='pvp')s.rating=Math.max(0,s.rating-8);s.heroes=grantGarrisonXP(s.heroes,s.layout);s.history.unshift({at:now,status:b.status,stage:b.stage,kills:b.kills});s.history=s.history.slice(0,15);if(b.id)s.processed=[...s.processed.slice(-199),key];s.revision++;return s;}

const CLAN_INVITE_TTL=48*3600000;
function clanInvitation({kind='invitation',clanId,clanName,playerId,playerName,actorRole,targetClanId=null,now=Date.now(),existing=[]}){
 if(targetClanId)throw Error('Ce joueur appartient déjà à un clan.');
 if(!['invitation','application'].includes(kind)||!clanId||!playerId)throw Error('Demande de clan invalide.');
 if(kind==='invitation'&&!['chief','admin'].includes(actorRole))throw Error('Responsables du clan uniquement.');
 if(existing.some(x=>x.clanId===clanId&&x.playerId===playerId&&x.kind===kind&&x.status==='pending'&&x.expiresAt>now))throw Error('Une demande est déjà en attente.');
 return {id:kind+':'+clanId+':'+playerId+':'+now,kind,clanId,clanName,playerId,playerName,createdAt:now,expiresAt:now+CLAN_INVITE_TTL,status:'pending'};
}
function resolveClanInvitation(request,{accept,actorId,actorRole,playerClanId=null,members=0,now=Date.now()}){
 if(request.status!=='pending')throw Error('Cette demande a déjà été traitée.');
 if(request.expiresAt<=now)throw Error('Cette demande a expiré.');
 if(request.kind==='invitation'?actorId!==request.playerId:!['chief','admin'].includes(actorRole))throw Error('Tu ne peux pas traiter cette demande.');
 if(accept&&playerClanId)throw Error('Le joueur appartient déjà à un clan.');
 if(accept&&members>=30)throw Error('Ce clan est complet.');
 return {...request,status:accept?'accepted':'declined',resolvedAt:now};
}

// Configuration d’exposition locale : tous les exemplaires légaux, sans achat.
// Les étages de présentation supplémentaires ne sont jamais accordés à la partie.
function visualShowcase(level,{clan=false}={}){
 if(!Number.isInteger(level)||level<1||level>20)throw Error('Niveau de test entre 1 et 20.');
 const groups=[['buildings',BUILDINGS],['defenses',DEFENSES],['barricades',[BARRICADE]],['traps',TRAPS],['decorations',DECORATIONS]];
 const wanted=[];
 for(const [list,items] of groups)for(const m of items){
  if((PROGRESSION_V06.unlocks[m.id]??m.unlock??1)>level||m.requiresClan&&!clan)continue;
  for(let i=0;i<v06InstanceLimit(m.id,level);i++)wanted.push({list,type:m.id,index:i,width:footprint(m.id)});
 }
 for(let floors=Math.max(3,v06AllowedFloors(level));floors<=10;floors++){
  const l=blankCastle(level);l.floors=floors;l.doors=Array.from({length:floors},(_,floor)=>({id:'door:'+floor,floor,x:floor%2?l.slots-1:0}));l.path=[];
  let fits=true;
  for(const item of [...wanted].sort((a,b)=>(a.list==='decorations')-(b.list==='decorations')||b.width-a.width)){
   const o={id:item.type==='core'?'building:core':'showcase:'+item.type+':'+item.index,type:item.type,level:item.list==='decorations'?1:level};let done=false;
   const orderedFloors=Array.from({length:floors},(_,f)=>f).sort((a,b)=>[...l.buildings,...l.defenses,...l.barricades,...l.traps,...l.decorations].filter(o=>o.floor===a).reduce((s,o)=>s+footprint(o.type),0)-[...l.buildings,...l.defenses,...l.barricades,...l.traps,...l.decorations].filter(o=>o.floor===b).reduce((s,o)=>s+footprint(o.type),0));
   for(const f of orderedFloors)for(let x=0;x<l.slots&&!done;x++){
    if(item.list==='decorations'&&l.decorations.filter(d=>d.floor===f).length>=2)continue;
    if(!placementError(l,o,f,x)){l[item.list].push(withFloor(l,o,f,x));done=true;}
   }
   if(!done){fits=false;break;}
  }
  if(fits){l.showcase=true;l.presentationFloors=Math.max(0,floors-v06AllowedFloors(level));return {level,layout:l,total:wanted.length,quantities:Object.fromEntries([...new Set(wanted.map(i=>i.type))].map(t=>[t,wanted.filter(i=>i.type===t).length]))};}
 }
 throw Error('Le catalogue complet dépasse dix étages.');
}

// Contrat commun à l'éditeur et à la démo. L'identité d'une mission ne dépend pas de sa position.
const MAP_LAYOUT_FORMAT='blabox-map-layouts';
const MAP_LAYOUT_VERSION=2;
const MAP_DIMENSIONS={campaign:{width:3000,height:1500},war:{width:1600,height:2000}};
function validateMapLayouts(input){
 if(!input||input.format!==MAP_LAYOUT_FORMAT||input.version!==MAP_LAYOUT_VERSION)throw Error('Fichier de cartes Blabox incompatible. Cet éditeur utilise 30 étapes et le format v2.');
 const result={format:MAP_LAYOUT_FORMAT,version:MAP_LAYOUT_VERSION,maps:{}};
 for(const key of ['campaign','war']){
  const map=input.maps?.[key],dim=MAP_DIMENSIONS[key],expected=key==='campaign'?['campaign']:['ally','enemy'];
  if(!map||map.width!==dim.width||map.height!==dim.height||!Array.isArray(map.routes)||map.routes.length!==expected.length)throw Error('Dimensions ou chemins incorrects : '+key);
  const routes=[];const allIds=new Set();
  for(const routeId of expected){
   const route=map.routes.find(r=>r.id===routeId),count=key==='campaign'?30:10;
   if(!route||!Array.isArray(route.nodes)||route.nodes.length>600)throw Error('Chemin absent ou trop long : '+routeId);
   const nodes=route.nodes.map(n=>{
    if(!n||!['castle','point'].includes(n.kind)||typeof n.id!=='string'||!/^[a-z0-9:_-]{1,80}$/i.test(n.id)||allIds.has(n.id))throw Error('Point invalide ou identifiant répété.');
    allIds.add(n.id);
    if(!Number.isFinite(n.x)||!Number.isFinite(n.y)||n.x<0||n.y<0||n.x>dim.width||n.y>dim.height)throw Error('Un point sort de la carte.');
    const clean={id:n.id,kind:n.kind,x:Math.round(n.x*100)/100,y:Math.round(n.y*100)/100};
    if(n.kind==='castle'){
     if(!Number.isInteger(n.number)||n.number<1||n.number>count)throw Error('Numérotation incorrecte.');
     clean.number=n.number;
     if(key==='campaign'){if(!Number.isInteger(n.stage)||n.stage<1||n.stage>30||n.id!=='stage-'+n.stage||n.number!==n.stage)throw Error('Identité de mission incorrecte.');clean.stage=n.stage;}
     else {if(!Number.isInteger(n.slot)||n.slot<0||n.slot>9||n.id!==routeId+'-'+n.slot)throw Error('Identité de représentant incorrecte.');clean.slot=n.slot;}
    }
    return clean;
   });
   const castles=nodes.filter(n=>n.kind==='castle');
   if(castles.length!==count||new Set(castles.map(n=>n.number)).size!==count||new Set(castles.map(n=>key==='campaign'?n.stage:n.slot)).size!==count)throw Error('Il faut '+count+' châteaux distincts sur '+routeId+'.');
   if(castles.some((n,i)=>n.number!==i+1))throw Error('L’ordre du chemin doit suivre ses numéros.');
   routes.push({id:routeId,nodes});
  }
  result.maps[key]={...dim,routes};
 }
 return result;
}
function routeDots(route,spacing=28){
 const dots=[];const gap=Math.max(18,Math.min(80,Number(spacing)||28));
 for(let i=1;i<route.nodes.length;i++){
  const a=route.nodes[i-1],b=route.nodes[i],d=Math.hypot(b.x-a.x,b.y-a.y),steps=Math.max(1,Math.ceil(d/gap));
  for(let k=1;k<steps&&dots.length<6000;k++){const t=k/steps;if((a.kind==='castle'&&t*d<40)||(b.kind==='castle'&&(1-t)*d<40))continue;dots.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});}
  if(b.kind==='point')dots.push({x:b.x,y:b.y});
 }
 return dots;
}
function reorderMapCastle(route,id,number){
 const chunks=[];let prefix=[],chunk=null;
 for(const n of route.nodes){if(n.kind==='castle'){chunk=[n];chunks.push(chunk);}else if(chunk)chunk.push(n);else prefix.push(n);}
 const old=chunks.findIndex(c=>c[0].id===id),to=Number(number)-1;
 if(old<0||!Number.isInteger(to)||to<0||to>=chunks.length)throw Error('Numéro de parcours incorrect.');
 const moved=chunks.splice(old,1)[0];chunks.splice(to,0,moved);chunks.forEach((c,i)=>{c[0].number=i+1;if(route.id==='campaign'){c[0].stage=i+1;c[0].id='stage-'+(i+1);}});route.nodes=[...prefix,...chunks.flat()];return route;
}
const CAMPAIGN_CASTLE_COUNT=30;
const CAMPAIGN_ADMIN_STAGES=Object.freeze([9,15,23,30]);
const CAMPAIGN_ZONE_ENDS=Object.freeze([9,16,23,30]);

// Retourne exclusivement les événements de décor/mécanismes. Aucun son propre à un personnage.
function battleSoundEvents(frame){
 const cues=[],structures=frame.structures||[],traps=frame.traps||[],realBuilding=s=>s&&!s.hero&&!s.guard&&!s.summoned&&!s.isMinion;
 for(const e of frame.events||[]){const target=structures.find(s=>s.id===e.targetId),source=structures.find(s=>s.id===e.sourceId);let id=null;
  if(e.type==='shot'&&realBuilding(source)){
   const type=DEFENSES.find(d=>d.id===source.type)?.id;
   if(type)id='defense.'+(['caserne','necropole'].includes(type)?'gardien':type);
  }else if(e.type==='hit'&&realBuilding(target))id=['barricade','caserne-heros'].includes(target.type)?'hit.wood':['reservoir','mana'].includes(target.type)?'hit.glass':target.type==='reserve'?'hit.metal':'hit.stone';
  else if(e.type==='dead'&&realBuilding(target))id=target.type==='core'?'battle.core':'hit.collapse';
  else if(e.type==='trap'){const trap=traps.find(t=>t.id===e.trapId),effect=TRAPS.find(t=>t.id===trap?.type)?.effect;id='trap.'+({poison:'gas',slow:'sticky',root:'chain',freeze:'rune',fall:'heavy',execute:'mechanical'}[effect]||'spikes');}
  else if(e.type==='door-enter'||e.type==='door-arrive')id=e.type==='door-enter'?'door.enter':'door.arrive';
  else if(e.type==='floor')id='battle.floor';
  if(id)cues.push({id,seq:e.seq,time:e.time});
 }
 return cues;
}
;return {heroResourceCost0307,freePotionCount0307,grantFreeXP0307,HERO_PROFILES,HERO_ANIMATION_TIMINGS_024,VISUAL_HITBOXES_023,STORAGE_CAPS_023,CONSTRUCTION_SCALE_023,CONSTRUCTION_WEIGHTS_023,constructionLevelMultiplier026,constructionSeconds023,floorSeconds023,APPLICATION_VERSION,VERSION,DAY,GRID,DEFENSE_PROFILES,DEFENSES,RETIRED_DEFENSE_IDS,HEROES,TROOPS,RETIRED_TRAP_IDS,TRAP_UNLOCKS,TRAPS,BUILDINGS,BARRICADE,CASTLE_TIERS,SPEEDUPS,RULES,CHALLENGES,DECORATIONS,COSMETICS,LEGEND_SPELL_ICONS,COMMERCIAL_RULES,EMBLEM_COLORS,EMBLEM_SIGNS,TROOP_UNLOCKS,HERO_HOUSING_UNLOCKS,HERO_REWARDS,DIAMOND_PACKS,CASTLE_SKIN_FRAMES,CASTILLET_HEIGHT_ASSETS,REPLAY_HISTORY_LIMIT_025,CHAT_COLORS_025,CHAT_PRESENCE_LEASE_MS_025,joinChatPresence025,recentBattles025,validClanEmblem025,homePatrolRoster025,homePatrolPosition025,HERO_XP_RULES,heroCombatStats,heroXPTable,heroXPRequirement,heroSkillStats,garrisonBonuses,heroPassiveLabels,EARLY_LEVEL_GIFTS_021,applyEarlyLevelGifts021,smartSpeedupPlan021,clampSceneCamera021,CONSTRUCTION_020,constructionWorkers,occupiedBuilders,floorWorkers,structureLimit020,speedupPlan,consumeSpeedupPlan,cosmeticBonuses,cleanTestLayout020,ECONOMY_RULES,CONSTRUCTION_RATES,storageCapacity,constructionQuote,floorConstructionQuote,heroBonuses,defenseHeroBonuses,raidReward,battleRaidReward,settleRaid,heroPrice,unitVisualOffset,builderHeroBonus,constructionTeam,discountedConstruction,RESOURCE_SHOP,resourcePurchaseQuote,missingResourceQuote,payConstructionWithDiamonds,constructionFinishPrice,BUILDING_REQUIREMENTS,buildingLevelContext,buildingUpgradeRequirements,buildingUpgradeStatus,PROGRESSION_V06,TOWER_PROFILES_V06,v06DefenseStats,v06BalistaDirection,v06DefenseDistance,v06InDefenseRange,v06ArmyCapacity,v06ResourceCap,v06Production,v06AllowedFloors,v06FloorQuote,v06InstanceLimit,v06BuildQuote,v06HeroQuote,v06HeroStats,v06MonsterStats,v06ResearchQuote,v06UpgradeBlock,v06OccupancyErrors,v06LevelUpHero,v06StartResearch,v06SettleResearch,v06ValidatePreviewLayout,RELEASE_018,energyRechargeMs,settleEnergy,heroLevelLimit,combatHeroXP,troopUnlockQuote,startTroopUnlock,shieldReplacement,activateShield,postRaidProtection,clanCreationPrice,warSchedule,pvpSearchPrice,eligiblePvpTarget,pvpRatingDelta,botOpponent,publicCastleSnapshot,weeklyContributorPrize,contributorRewards018,campaignReward018,CAMPAIGN_ZONE_REWARDS,earnedZoneRewards,returnEpicHero,blockChatPlayer,chatPlayerBlocked,monsterResearchLimit,fundMonsterResearch,HERO_COMBAT_XP,heroHousingLimit,heroHousing,syncHeroHousing,assignHeroHousing,grantGarrisonXP,loyaltyHero,recruitUnitPrice,recruitUnitSeconds,recruitmentCount,enqueueRecruitment,settleRecruitment,cancelRecruitment,RETIRED_HERO_ALIASES_024,migrateRetiredHeroes024,CLAN_WAR_V06,CLAN_TECH_V06,v06ParisDay,v06WarIsOpen,v06WarRoster,v06WarScore,v06ClanMatch,v06CanReplaceChief,v06ClanTechQuote,v06ClaimWarReward,clanWarAdminLottery,CLAN_DONATION_RULES,CLAN_SHOP_ITEMS,CONTRIBUTOR_PRIZES,clanWeekKey,clanDonationQuote,clanDonationCooldown,clanDonationDiamonds,clanDonationWait,clanDonationAccelerationQuote,accelerateClanDonation,donateClanTechnology,clanShopQuote,visibleClanShop,restockClanShop,buyClanShopItem,clanContributorRanking,clanContributorRewards,warAttackEligibility,PROFILE_RULES,MODERATOR_WEEKLY_REWARD,clanMemberPresence,requestProfilePhoto,reviewProfilePhoto,moderatorWeeklyMail,ONBOARDING_V07,TUTORIAL_KIT_V07,v07StarterLayout,v07StarterState,v07Gates,v07TutorialEvent,ONBOARDING_V14,REWARD_ITEMS_V07,v07RewardBundle,v07RewardIsEmpty,v07ClaimGift,v07CanDeleteMail,v07NormalizeCode,v07CodeGrant,v07AudienceMatch,v07AuthorizeCreator,v07Sanction,creatorPurchaseAnalytics,PLAY_BILLING_V07,v07CheckPlayPurchase,LAYOUT_VERSION,castleSize,footprint,allSolids,placementSolids,itemWidth,castlePath,blankCastle,withFloor,placementError,placeFirstFree,syncCastle,defaultCastle,validateCastle,migrateLegacyLayout,moveDoor,retireRemovedTraps,DESTRUCTION_RULES,fixedDestructionPercent,destructionWeight,battleDestruction,updateBattleOutcome,finishBattle,MANA_RULES,manaCapacity,SPELL_RULES,RECOVERY_MINUTES,recoveryDuration,settleRecovery,heroReady,recoveryRemaining,antimagicSuppressed,spellAvailability,recordBattleRecovery,RECOVERY_ITEMS,useRecoveryItem,guardCapacity,assignMonsterGuard,helpMine,DAILY_QUESTS,ACHIEVEMENTS,HERO_JOURNEY,progressRewardOverflow,claimProgressReward,RETURN_REWARDS,returnEligibility,claimReturnReward,defenseTravel025,queueDefenseShot025,releaseDefenseShot025,heroAllies,heroEnemies,heroDamageRules,heroAfterHit,summonHeroCopy,beginHeroAction024,beginHeroStrike024,useCurrentHeroSpell,processHeroActions024,updateCurrentHero,simulateConstructionPlan023,pathDefault,createState,migrateState,structureInfo,productionRate,storeCap,walletCap,settle,durationRaw,simulateProgression,TIMER_SCALE,upgradeDuration,upgradeInfo,validateLayout,mark,applyCommand,challengeDone,stageRequirement,stageMap,createBattle,deployBattleUnit,nearestTarget,useBattleSpell,tickBattle,runBattle,awardBattle,CLAN_INVITE_TTL,clanInvitation,resolveClanInvitation,visualShowcase,MAP_LAYOUT_FORMAT,MAP_LAYOUT_VERSION,MAP_DIMENSIONS,validateMapLayouts,routeDots,reorderMapCastle,CAMPAIGN_CASTLE_COUNT,CAMPAIGN_ADMIN_STAGES,CAMPAIGN_ZONE_ENDS,battleSoundEvents};})();