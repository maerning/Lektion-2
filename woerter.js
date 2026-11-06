/* Lernwortschatz Prima 1 – Lektion 1 und 2 (alle Bedeutungen) */
(function () {
const L2 = [ // [Latein, alle Bedeutungen, Wortart, Genus]
 ['ad', 'zu, bei, nach', 'p'], ['properare', 'eilen, sich beeilen', 'v'], ['forum', 'das Forum, der Marktplatz', 's', 'n'],
 ['circus', 'der Zirkus, die Rennbahn', 's', 'm'], ['diu', 'lange, lange Zeit', 'a'], ['amicus', 'der Freund', 's', 'm'],
 ['amica', 'die Freundin', 's', 'f'], ['per', 'durch', 'p'], ['via', 'der Weg, die Straße', 's', 'f'],
 ['reperire', 'finden, wiederfinden', 'v'], ['audire', 'hören', 'v'], ['itaque', 'deshalb', 'a'],
 ['iterum', 'wieder(um), zum zweiten Mal', 'a'], ['iam', 'schon, bereits, nun', 'a'], ['exspectare', 'warten, erwarten', 'v'],
 ['narrare', 'erzählen', 'v'], ['subito', 'plötzlich', 'a'], ['non iam', 'nicht mehr', 'a'], ['io!', 'Hurra! Ha! Ach!', 'i'],
 ['nos', 'uns', 'pr'], ['adiuvare', 'helfen, unterstützen', 'v'], ['vocare', 'rufen, nennen', 'v'],
 ['statim', 'sofort, auf der Stelle', 'a'], ['aedificium', 'das Gebäude, das Haus', 's', 'n'], ['bene', 'gut', 'a'],
 ['taberna', 'das Gasthaus, der Laden, die Werkstatt', 's', 'f'], ['senator', 'der Senator', 's', 'm'],
 ['ecce!', 'Schau! Schaut! Sieh da! Seht da!', 'i'], ['ante', 'vor', 'p'], ['semper', 'immer', 'a'], ['bestia', 'das Tier', 's', 'f']
];
const L1 = [
 ['cogitare', 'denken', 'v'], ['esse', 'sein', 'v'], ['venire', 'kommen', 'v'], ['dominus', 'der Herr', 's', 'm'], ['et', 'und', 'a'],
 ['domina', 'die Herrin', 's', 'f'], ['servus', 'der Sklave', 's', 'm'], ['serva', 'die Sklavin', 's', 'f'], ['stare', 'stehen', 'v'],
 ['spectare', 'zuschauen', 'v'], ['clamare', 'rufen, schreien', 'v'], ['sed', 'aber, sondern', 'a'], ['tacere', 'schweigen', 'v'],
 ['non', 'nicht', 'a'], ['ubi?', 'wo?', 'a'], ['nunc', 'jetzt, nun', 'a'], ['equus', 'das Pferd', 's', 'm'], ['etiam', 'auch, sogar', 'a'],
 ['videre', 'sehen', 'v'], ['victor', 'der Sieger', 's', 'm'], ['gaudere', 'sich freuen', 'v'], ['populus', 'das Volk', 's', 'm'],
 ['undique', 'von allen Seiten', 'a'], ['clamor', 'der Lärm', 's', 'm'], ['victoria', 'der Sieg', 's', 'f'], ['mercator', 'der Kaufmann', 's', 'm'],
 ['rogare', 'fragen, bitten', 'v'], ['ibi', 'dort', 'a'], ['frumentum', 'das Getreide', 's', 'n'], ['ridere', 'lachen', 'v'],
 ['amare', 'lieben', 'v'], ['quis?', 'wer?', 'a'], ['hic', 'hier', 'a'], ['adesse', 'da sein, helfen', 'v'], ['debere', 'müssen', 'v'],
 ['furtum', 'der Diebstahl', 's', 'n'], ['cur?', 'warum?', 'a']
];
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.random() * a.length | 0];

// Vokabel-Karten: richtige Seite = ALLE Bedeutungen; falsche = Bedeutung eines anderen Wortes
// oder (bei mehreren Bedeutungen) eine Bedeutung durch eine fremde ersetzt
function vokabeln(list, pool) {
  return shuffle(list.slice()).map(w => {
    const same = pool.filter(x => x[0] !== w[0] && x[2] === w[2]);
    const others = same.length ? same : pool.filter(x => x[0] !== w[0]);
    let wrong;
    const parts = w[1].split(', ');
    if (parts.length > 1 && w[2] !== 'i' && Math.random() < .5) {
      const other = pick(others)[1].split(', ')[0];
      parts[Math.random() * parts.length | 0] = other;
      wrong = parts.join(', ');
      if (wrong === w[1]) wrong = pick(others)[1];
    } else wrong = pick(others)[1];
    return { word: w[0], right: w[1], wrong, merke: w[0] + ' = ' + w[1] };
  });
}

// Deklination: [Nom Sg, Stamm, Klasse, Deutsch]
const SUBST = [
 ['amicus', 'amic', 'o', 'der Freund'], ['amica', 'amic', 'a', 'die Freundin'], ['via', 'vi', 'a', 'der Weg'], ['taberna', 'tabern', 'a', 'der Laden'],
 ['bestia', 'besti', 'a', 'das Tier'], ['aedificium', 'aedifici', 'n', 'das Gebäude'], ['forum', 'for', 'n', 'das Forum'], ['circus', 'circ', 'o', 'der Zirkus'],
 ['senator', 'senator', 'k', 'der Senator'], ['dominus', 'domin', 'o', 'der Herr'], ['domina', 'domin', 'a', 'die Herrin'], ['servus', 'serv', 'o', 'der Sklave'],
 ['serva', 'serv', 'a', 'die Sklavin'], ['equus', 'equ', 'o', 'das Pferd'], ['victor', 'victor', 'k', 'der Sieger'], ['mercator', 'mercator', 'k', 'der Kaufmann'],
 ['victoria', 'victori', 'a', 'der Sieg'], ['furtum', 'furt', 'n', 'der Diebstahl'], ['frumentum', 'frument', 'n', 'das Getreide']
];
const END = { a: ['a', 'am', 'ae', 'as'], o: ['us', 'um', 'i', 'os'], n: ['um', 'um', 'a', 'a'], k: ['', 'em', 'es', 'es'] };
const form = (s, i) => s[2] === 'k' && i === 0 ? s[0] : s[1] + END[s[2]][i];
const NAME = ['Nom. Sg.', 'Akk. Sg.', 'Nom. Pl.', 'Akk. Pl.'];

// Akkusativ bilden: „Akk. Pl. von amicus?“ – falsch: andere Form desselben Wortes oder falsche Deklination
function akkusativ() {
  const out = [];
  for (const s of shuffle(SUBST.slice())) {
    const i = Math.random() < .5 ? 1 : 3, right = form(s, i);
    const cand = [0, 1, 2, 3].map(k => form(s, k)).filter(f => f !== right);
    const fremd = { a: 'o', o: 'a', n: 'o', k: 'o' }[s[2]];
    const falscheDekl = s[2] === 'k' ? s[1] + (i === 1 ? 'um' : 'os') : s[1] + END[fremd][i];
    if (falscheDekl !== right) cand.push(falscheDekl, falscheDekl);
    out.push({ word: s[0], ask: (i === 1 ? 'Akkusativ Singular' : 'Akkusativ Plural') + ' von …', right, wrong: pick(cand),
      merke: NAME[i] + ' von ' + s[0] + ' = ' + right });
  }
  return out;
}

// Nominativ oder Akkusativ? Nur eindeutige Formen (keine Neutra, nicht -es)
function kasus() {
  const out = [];
  for (const s of SUBST.filter(s => s[2] !== 'n')) for (const i of [0, 1, 2, 3]) {
    if (s[2] === 'k' && i >= 2) continue;
    const f = form(s, i), nom = i % 2 === 0;
    out.push({ word: f, right: nom ? 'Nominativ' : 'Akkusativ', wrong: nom ? 'Akkusativ' : 'Nominativ', top: nom,
      merke: f + ' = ' + NAME[i] + ' (' + (nom ? 'Wer?' : 'Wen?') + ')' });
  }
  return shuffle(out);
}

window.WOERTER = { L1, L2, vokabeln, akkusativ, kasus, shuffle };
})();
