export interface Animal {
  name: string;
  emoji: string;
  years: string;
  elem: string;
  trait: string;
}

export const animals: Animal[] = [
  { name:"Rat",  emoji:"🐀", years:"2024, 2012, 2000", elem:"Water", trait:"Quick-witted, resourceful, and versatile. Rats are natural survivors who charm everyone they meet." },
  { name:"Ox",  emoji:"🐂", years:"2025, 2013, 2001", elem:"Earth", trait:"Diligent, dependable, and strong. The Ox builds slowly but builds to last." },
  { name:"Tiger",  emoji:"🐅", years:"2026, 2014, 2002", elem:"Wood", trait:"Brave, competitive, and unpredictable. Tigers lead with passion and a touch of chaos." },
  { name:"Rabbit", emoji:"🐇", years:"2027, 2015, 2003", elem:"Wood", trait:"Gentle, elegant, and empathetic. Rabbits create harmony wherever they go." },
  { name:"Dragon", emoji:"🐉", years:"2028, 2016, 2004", elem:"Earth", trait:"Confident, ambitious, and magnetic. Dragons are born leaders who inspire awe." },
  { name:"Snake",  emoji:"🐍", years:"2029, 2017, 2005", elem:"Fire", trait:"Wise, intuitive, and enigmatic. Snakes see what others miss." },
  { name:"Horse",  emoji:"🐎", years:"2030, 2018, 2006", elem:"Fire", trait:"Energetic, free-spirited, and adventurous. Horses live life at full gallop." },
  { name:"Goat",   emoji:"🐐", years:"2031, 2019, 2007", elem:"Earth", trait:"Creative, calm, and compassionate. Goats find beauty in the quiet moments." },
  { name:"Monkey", emoji:"🐒", years:"2032, 2020, 2008", elem:"Metal", trait:"Clever, playful, and inventive. Monkeys solve any problem with a grin." },
  { name:"Rooster",emoji:"🐓", years:"2033, 2021, 2009", elem:"Metal", trait:"Observant, confident, and precise. Roosters wake the world with their voice." },
  { name:"Dog",    emoji:"🐕", years:"2034, 2022, 2010", elem:"Earth", trait:"Loyal, honest, and protective. Dogs stand by their people through anything." },
  { name:"Pig",    emoji:"🐖", years:"2035, 2023, 2011", elem:"Water", trait:"Generous, warm, and easygoing. Pigs enjoy life and share that joy freely." },
];

export const NAMES = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
export const ELEM_CYCLE = ["Wood","Fire","Earth","Metal","Water"];

// compat[a][b] = [score, label, desc, rank]
const compat: Record<number, Record<number, [number, string, string, number]>> = {
  0:{ 0:[70,"Rat + Rat","Two clever minds, but someone needs to lead.",50],  1:[85,"Rat + Ox","A classic pair. The Ox provides stability, the Rat brings ideas.",8],  2:[55,"Rat + Tiger","The Rat plans, the Tiger acts — friction is likely.",41],  3:[60,"Rat + Rabbit","Polite but distant. Both are too cautious to truly connect.",39],
    4:[92,"Rat + Dragon","Dynamic duo. Both ambitious — they build empires together.",0],  5:[75,"Rat + Snake","Intellectual chemistry. Deep conversations, but watch for manipulation.",20],  6:[41,"Rat + Horse","Different rhythms. One rushes, the other calculates.",48],  7:[44,"Rat + Goat","The Rat is too direct for the sensitive Goat. Misunderstandings abound.",47],
    8:[88,"Rat + Monkey","A playful, brilliant pair. They keep each other sharp and laughing.",4],  9:[72,"Rat + Rooster","Both detail-oriented, but the Rooster's criticism can sting.",27],  10:[65,"Rat + Dog","Loyal but wary. They care deeply but struggle to trust.",34],  11:[78,"Rat + Pig","Warm and comfortable. The Pig's generosity softens the Rat's edge.",17] },
  1:{ 0:[85,"Ox + Rat","A powerful foundation. The Rat dreams, the Ox builds.",8],  1:[50,"Ox + Ox","Two oxen in the same field — stubborn meets stubborn.",51],  2:[52,"Ox + Tiger","The Tiger's impulsiveness frustrates the methodical Ox.",46],  3:[48,"Ox + Rabbit","The Rabbit wants ease, the Ox wants work. Mismatched values.",53],
    4:[70,"Ox + Dragon","Mutual respect, but the Dragon's flair can overwhelm the Ox.",26],  5:[89,"Ox + Snake","Quiet trust built over time. Rock-solid and loyal.",2],  6:[43,"Ox + Horse","The Horse's freedom feels reckless to the steady Ox. Fundamental rhythm mismatch.",42],  7:[38,"Ox + Goat","Stubborn meets sensitive — a recipe for frustration.",54],
    8:[74,"Ox + Monkey","The Monkey's tricks annoy the honest Ox. Trust is fragile.",22],  9:[86,"Ox + Rooster","Both hardworking and traditional. A match made in duty.",5],  10:[62,"Ox + Dog","Loyal and steady, but both can be too serious.",36],  11:[68,"Ox + Pig","Peaceful and comfortable. The Pig's warmth thaws the Ox.",29] },
  2:{ 0:[55,"Tiger + Rat","The Rat calculates, the Tiger leaps — very different styles.",41],  1:[52,"Tiger + Ox","Speed vs endurance. They admire each other but rarely align.",46],  2:[45,"Tiger + Tiger","Too much fire in one room. Passion burns bright but fast.",55],  3:[66,"Tiger + Rabbit","The Tiger protects, the Rabbit soothes. It can work with effort.",31],
    4:[76,"Tiger + Dragon","A powerhouse pairing. Both bold, both magnetic.",18],  5:[38,"Tiger + Snake","The Tiger's bluntness terrifies the subtle Snake.",56],  6:[87,"Tiger + Horse","Fire meets fire — explosive chemistry, never boring.",3],  7:[80,"Tiger + Goat","The Tiger leads, the Goat follows. It works if the Tiger is gentle.",13],
    8:[34,"Tiger + Monkey","The Tiger's directness clashes with the Monkey's cunning. Both want to lead, neither wants to follow.",48],  9:[56,"Tiger + Rooster","The Rooster's criticism triggers the Tiger's rage.",40],  10:[82,"Tiger + Dog","Built on loyalty and adventure. A ride-or-die pair.",11],  11:[84,"Tiger + Pig","The Pig calms the Tiger's fire. A surprising but strong match.",9] },
  3:{ 0:[60,"Rabbit + Rat","Politeness without passion. They never truly clash, but never truly connect.",39],  1:[48,"Rabbit + Ox","One wants ease, the other wants work. Hard to find common ground.",53],  2:[66,"Rabbit + Tiger","The Tiger provides excitement, the Rabbit provides calm. Balanced.",31],  3:[55,"Rabbit + Rabbit","Too similar. They understand each other but lack spark.",43],
    4:[36,"Rabbit + Dragon","The Dragon overwhelms the gentle Rabbit. Mismatched energy.",57],  5:[71,"Rabbit + Snake","Both appreciate beauty and depth. A refined, cultured pair.",24],  6:[63,"Rabbit + Horse","The Rabbit craves peace, the Horse craves freedom. Tricky.",35],  7:[89,"Rabbit + Goat","A dream pairing. Both gentle, artistic, deeply in sync.",2],
    8:[64,"Rabbit + Monkey","The Monkey's mischief unsettles the Rabbit's peace.",33],  9:[35,"Rabbit + Rooster","The Rabbit wants calm, the Rooster stirs the nest. Constant friction.",58],  10:[83,"Rabbit + Dog","Built on loyalty and kindness. A warm, protective bond.",10],  11:[81,"Rabbit + Pig","Gentle and generous. They create a cozy, loving home.",12] },
  4:{ 0:[92,"Dragon + Rat","Empire builders. Both driven, they push each other higher.",0],  1:[70,"Dragon + Ox","Respectful but distant. The Dragon's flair is lost on the Ox.",26],  2:[76,"Dragon + Tiger","Two titans. They can rule together or rival each other.",18],  3:[36,"Dragon + Rabbit","The Dragon is too intense for the delicate Rabbit.",57],
    4:[40,"Dragon + Dragon","Too much ego. Two dragons create storms, not calm.",52],  5:[73,"Dragon + Snake","The Snake's wisdom grounds the Dragon's ambition. Strong.",23],  6:[67,"Dragon + Horse","Both love the spotlight, but they compete for it.",30],  7:[77,"Dragon + Goat","The Dragon inspires, the Goat supports. A creative pair.",16],
    8:[90,"Dragon + Monkey","A brilliant alliance. Wit meets power.",1],  9:[86,"Dragon + Rooster","Precision meets vision. The Rooster's attention to detail brings the Dragon's grand ideas to life. A power couple.",15],  10:[33,"Dragon + Dog","The Dog's honesty feels like betrayal to the proud Dragon. Opposite values collide.",49],  11:[69,"Dragon + Pig","The Pig's warmth softens the Dragon's edge. Works with effort.",28] },
  5:{ 0:[75,"Snake + Rat","Deep intellectual connection, but trust is fragile.",20],  1:[89,"Snake + Ox","Quiet devotion. They understand each other without words.",2],  2:[38,"Snake + Tiger","The Tiger's bluntness terrifies the subtle Snake.",56],  3:[71,"Snake + Rabbit","Both refined and elegant. A cultured, harmonious pair.",24],
    4:[73,"Snake + Dragon","Wisdom meets power. The Snake advises, the Dragon acts.",23],  5:[53,"Snake + Snake","Too introspective. Deep understanding but little action.",44],  6:[59,"Snake + Horse","The Horse's restlessness exhausts the contemplative Snake.",38],  7:[78,"Snake + Goat","Both creative and intuitive. An artistic match.",17],
    8:[85,"Snake + Monkey","A clever pair. They scheme and dream together.",6],  9:[82,"Snake + Rooster","Both sharp and perceptive. A formidable team.",11],  10:[72,"Snake + Dog","Cautious but caring. They protect each other quietly.",25],  11:[35,"Snake + Pig","The Snake's depth feels like secrecy to the open-hearted Pig. Trust is hard to build.",49] },
  6:{ 0:[41,"Horse + Rat","One charges, the other plans. Hard to synchronize.",48],  1:[58,"Horse + Ox","Patience vs speed. The Ox frustrates the Horse.",42],  2:[87,"Horse + Tiger","Explosive chemistry. Both love freedom and adventure.",3],  3:[63,"Horse + Rabbit","The Rabbit wants peace, the Horse wants motion. Compromise needed.",35],
    4:[67,"Horse + Dragon","Both love the stage, but neither wants to play backup.",30],  5:[59,"Horse + Snake","The Snake's stillness frustrates the active Horse.",38],  6:[48,"Horse + Horse","Two free spirits — fun but directionless together.",52],  7:[86,"Horse + Goat","A classic complementary match. The Horse brings passion, the Goat brings warmth. Together they balance each other perfectly.",19],
    8:[61,"Horse + Monkey","Fun and chaotic. Laughter comes easy, commitment doesn't.",37],  9:[57,"Horse + Rooster","The Rooster's structure cramps the Horse's style.",45],  10:[80,"Horse + Dog","Adventurous and loyal. A partnership built on trust.",13],  11:[74,"Horse + Pig","The Pig grounds the Horse. A surprisingly stable pair.",21] },
  7:{ 0:[44,"Goat + Rat","The Rat is too sharp for the gentle Goat. Words wound.",47],  1:[38,"Goat + Ox","Stubborn vs sensitive — both feel unheard.",54],  2:[80,"Goat + Tiger","The Tiger leads, the Goat follows. Works if the Tiger is kind.",13],  3:[89,"Goat + Rabbit","Soulmates. Both gentle, artistic, deeply empathetic.",2],
    4:[77,"Goat + Dragon","The Dragon inspires the Goat's creativity. A supportive match.",16],  5:[78,"Goat + Snake","Both intuitive and creative. They speak an unspoken language.",17],  6:[76,"Goat + Horse","The Horse sweeps the Goat off their feet. Romantic.",19],  7:[48,"Goat + Goat","Two dreamers — lovely but lost without a leader.",51],
    8:[79,"Goat + Monkey","The Monkey charms the Goat. Playful and affectionate.",14],  9:[68,"Goat + Rooster","The Rooster's criticism crushes the Goat's spirit. Delicate.",30],  10:[56,"Goat + Dog","The Dog's worry weighs on the carefree Goat. Draining.",43],  11:[84,"Goat + Pig","A warm, generous pair. They build a cozy life together.",8] },
  8:{ 0:[88,"Monkey + Rat","A brilliant, playful pair. They never run out of fun ideas.",4],  1:[74,"Monkey + Ox","The Ox doesn't trust the Monkey's tricks. Fragile bond.",22],  2:[44,"Monkey + Tiger","Both want to lead. Power struggles are inevitable.",48],  3:[64,"Monkey + Rabbit","The Monkey's chaos unsettles the Rabbit's peace.",33],
    4:[90,"Monkey + Dragon","Wit meets power. A formidable alliance.",1],  5:[85,"Monkey + Snake","Scheming together or saving the world — they're a team.",6],  6:[61,"Monkey + Horse","Fun and flighty. Great laughs, shallow roots.",37],  7:[79,"Monkey + Goat","The Monkey charms the Goat. A playful, warm pair.",14],
    8:[52,"Monkey + Monkey","Too much trickery. Neither trusts the other.",45],  9:[76,"Monkey + Rooster","Both sharp-tongued. They either laugh together or fight.",18],  10:[69,"Monkey + Dog","The Dog's loyalty clashes with the Monkey's fickleness.",29],  11:[42,"Monkey + Pig","The Pig trusts, the Monkey schemes. Disappointment looms.",50] },
  9:{ 0:[72,"Rooster + Rat","Both meticulous, but the Rooster's criticism stings.",27],  1:[86,"Rooster + Ox","A traditional, hardworking pair. They build a solid life.",5],  2:[56,"Rooster + Tiger","The Rooster's nagging triggers the Tiger's rage.",40],  3:[35,"Rooster + Rabbit","One stirs, the other retreats. Constant tension.",58],
    4:[79,"Rooster + Dragon","Precision meets vision. The Rooster makes the Dragon's dreams real.",15],  5:[82,"Rooster + Snake","Both sharp and perceptive. They read each other perfectly.",11],  6:[57,"Rooster + Horse","The Rooster's structure irritates the free Horse.",45],  7:[68,"Rooster + Goat","The Rooster's bluntness hurts the Goat's feelings. Fragile.",30],
    8:[76,"Rooster + Monkey","Both witty. Great banter, but can cut deep.",18],  9:[46,"Rooster + Rooster","Too much crowing. Both want to be heard, neither listens.",54],  10:[40,"Rooster + Dog","The Rooster's criticism wears down the loyal Dog.",52],  11:[54,"Rooster + Pig","The Pig's mess drives the neat Rooster crazy.",44] },
  10:{0:[65,"Dog + Rat","Loyal and cautious. They care but struggle to fully trust.",34],  1:[62,"Dog + Ox","Both steady and serious. A reliable if quiet pair.",36],  2:[82,"Dog + Tiger","Ride-or-die. Built on loyalty and shared adventure.",11],  3:[83,"Dog + Rabbit","Warm and protective. A loving, safe bond.",10],
    4:[47,"Dog + Dragon","The Dog's honesty challenges the Dragon's pride. Tricky.",49],  5:[72,"Dog + Snake","Cautious but deeply caring. They watch each other's backs.",25],  6:[80,"Dog + Horse","Adventurous and fiercely loyal. A partnership built on trust.",13],  7:[56,"Dog + Goat","The Dog's worry drains the carefree Goat.",43],
    8:[69,"Dog + Monkey","The Dog values loyalty, the Monkey values fun. Mismatch.",29],  9:[40,"Dog + Rooster","The Rooster's criticism erodes the Dog's devotion.",52],  10:[54,"Dog + Dog","Two loyal hearts, but both prone to worry. They need a spark.",46],  11:[73,"Dog + Pig","Warm and honest. The Pig's joy lifts the Dog's spirits.",22] },
  11:{0:[78,"Pig + Rat","Warm and indulgent. The Pig's generosity wins the Rat.",17],  1:[68,"Pig + Ox","Peaceful and comfortable. A calm, stable home.",29],  2:[84,"Pig + Tiger","The Pig tames the Tiger. A surprising, powerful bond.",9],  3:[81,"Pig + Rabbit","Gentle and cozy. They build a warm, loving nest.",12],
    4:[69,"Pig + Dragon","The Pig softens the Dragon. Works with mutual effort.",28],  5:[43,"Pig + Snake","The Pig is too open for the secretive Snake. Trust issues.",49],  6:[74,"Pig + Horse","The Pig grounds the restless Horse. A stable pair.",21],  7:[84,"Pig + Goat","Generous and warm. They create a beautiful life together.",8],
    8:[42,"Pig + Monkey","The Monkey takes advantage of the trusting Pig.",50],  9:[54,"Pig + Rooster","The Rooster's neatness vs the Pig's easygoing mess.",44],  10:[73,"Pig + Dog","Warm and honest. The Dog's loyalty meets the Pig's warmth.",22],  11:[60,"Pig + Pig","Two indulgent hearts. Blissful but maybe too comfortable.",38] }
};

const SELF_SCORE = [70,50,45,55,40,53,48,48,52,46,54,60];
const SANHE_SCORE: [number,number,number][] = [[0,4,92],[0,8,90],[4,8,91],[1,5,90],[1,9,88],[5,9,86],[2,6,89],[2,10,87],[6,10,85],[3,7,90],[3,11,85],[7,11,87]];
const LIUHE_SCORE: [number,number,number][]  = [[0,1,87],[2,11,86],[3,10,86],[4,9,86],[5,8,87],[6,7,86]];
const LIUCHONG_SCORE: [number,number,number][]= [[0,6,35],[1,7,36],[2,8,34],[3,9,32],[4,10,33],[5,11,35]];
const LIUHAI_SCORE: [number,number,number][]  = [[0,7,42],[1,6,43],[2,5,40],[3,4,38],[8,11,41],[9,10,42]];

export function getScore(a: number, b: number) {
  if (a === -1 || b === -1) return null;
  const row = compat[a]?.[b] || compat[b]?.[a];
  if (!row) return null;
  return { score: row[0], label: row[1], desc: row[2], rank: row[3] };
}

export function authoritativeScore(a: number, b: number): number {
  if (a === b) return SELF_SCORE[a];
  const p = (x: number, y: number) => (a===x&&b===y)||(a===y&&b===x);
  for (const [x,y,s] of LIUCHONG_SCORE) if (p(x,y)) return s;
  for (const [x,y,s] of LIUHAI_SCORE) if (p(x,y)) return s;
  for (const [x,y,s] of LIUHE_SCORE) if (p(x,y)) return s;
  for (const [x,y,s] of SANHE_SCORE) if (p(x,y)) return s;
  const seed = (a * 13 + b * 7) % 17;
  return 62 + seed;
}

export function genDeep(a: number, b: number, s: number, animalsList: Animal[]): string {
  const A = animalsList[a], B = animalsList[b];
  if(s>=80) return `${A.name} and ${B.name} are one of the most naturally compatible pairings in the zodiac. Their energies harmonize with little effort — they understand each other intuitively. ${A.name} brings out the best in ${B.name}, and vice versa. This kind of connection doesn't need to be forced; it flows.`;
  if(s>=65) return `${A.name} and ${B.name} have genuine chemistry, but the relationship needs intention to stay strong. Their differences aren't dealbreakers — they're opportunities. When both are willing to adapt, this pairing can be deeply fulfilling. The key: don't assume the other sees things the way you do.`;
  if(s>=50) return `${A.name} and ${B.name} approach life from very different angles. On a good day, that difference is fascinating. On a bad day, it's frustrating. This connection requires both people to actively listen and meet halfway. It's not a natural fit, but it can work with real effort from both sides.`;
  return `${A.name} and ${B.name} have fundamentally different needs and communication styles. What feels natural to one feels wrong to the other. Growth is possible — but this relationship demands patience, generosity, and a willingness to stretch far outside each person's comfort zone. It's a steep climb, but the view at the top can be worth it.`;
}

export function genElem(a: number, b: number, animalsList: Animal[]): string {
  const eA = animalsList[a].elem, eB = animalsList[b].elem;
  if(eA === eB) return `Both share the ${eA} element. This creates a natural understanding — they speak the same emotional language. But too much of the same energy can lead to stagnation if they don't push each other to grow.`;
  const iA = ELEM_CYCLE.indexOf(eA), iB = ELEM_CYCLE.indexOf(eB);
  if((iA+1)%5 === iB) return `${eA} (${animalsList[a].name}) nourishes ${eB} (${animalsList[b].name}) in the generating cycle — Wood → Fire → Earth → Metal → Water. This is a naturally supportive dynamic: one feeds the other's growth.`;
  if((iB+1)%5 === iA) return `${eB} (${animalsList[b].name}) nourishes ${eA} (${animalsList[a].name}) in the generating cycle. This creates a caring flow of energy where one naturally supports the other's development.`;
  return `${eA} (${animalsList[a].name}) and ${eB} (${animalsList[b].name}) are different but complementary. Each brings something the other lacks, creating balance through contrast rather than harmony through sameness.`;
}

export function getAllPairings() {
  const all: { i: number; j: number; score: number; desc: string }[] = [];
  for (let i = 0; i < 12; i++) {
    for (let j = i + 1; j < 12; j++) {
      const d = getScore(i, j);
      all.push({ i, j, score: authoritativeScore(i, j), desc: d?.desc ?? "" });
    }
  }
  return all;
}
