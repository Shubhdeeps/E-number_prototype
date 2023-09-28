const responseText = `FAZER MUST PÕRANDALEIB
390 g (neto) viilutatud
Tume rukki- ja nisujahust magushapu põrandaleib.
Koostisosad: rukis (rukkijahu, rukkilinnasejahu), joogivesi, nisujahu,
suhkur, nisugluteen, odralinnaseekstrakt, pärm, jodeeritud sool,
paksendajad E466 ja E412, emulgaator E482.
Toode on kiudaineallikas ja valguallikas.
Võib sisaldada maapähkleid, pähkleid, seesamiseemnete ja piimatoodete jääke.`;

const regex = /E\d{3,4}[a-zA-Z]?/g;

function processText(text) {
  const matches = text.match(regex);

  if (matches) {
    return matches;
  } else {
    return [];
  }
}
const processed = processText(responseText);
console.log(processed);
