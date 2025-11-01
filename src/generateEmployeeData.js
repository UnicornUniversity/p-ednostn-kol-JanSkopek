/**
 * @template T
 * @param {T[]} arr
 * @returns {T}
 */
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/**
 * Náhodné datum narození tak, aby věk byl v intervalu <minAge, maxAge>.
 * @returns {string} ISO datetime
 */
function randomBirthdate(minAge, maxAge) {
  const now = Date.now();
  const yearMs = 365.25 * 24 * 60 * 60 * 1000;
  const fromTs = now - maxAge * yearMs;
  const toTs = now - minAge * yearMs;
  return new Date(fromTs + Math.random() * (toTs - fromTs)).toISOString();
}

const maleNames = [
  "Jan","Jakub","Tomáš","Lukáš","Petr","Jiří","Michal","Martin","Filip","Matěj",
  "Josef","Václav","Daniel","Ondřej","Adam","Šimon","Marek","Dominik","Karel","Radek",
  "Jaroslav","Roman","Patrik","Vojtěch","Aleš","David","Viktor","Richard","Miroslav","Oldřich",
  "Stanislav","Bohumil","Robert","Břetislav","Rostislav","Libor","Marcel","Dalibor","Erik","Igor",
  "Vladimír","Milan","Bohdan","Hynek","Sebastian","Tadeáš","Rudolf","Otakar","Eduard","Jindřich",
  "Vít","Štěpán","Ivo","Bohuslav","Radim","Albert","Samuel","Vratislav","Robin","Alan"
];

const femaleNames = [
  "Anna","Jana","Eliška","Tereza","Adéla","Karolína","Natálie","Lucie","Kristýna","Veronika",
  "Barbora","Nikola","Markéta","Klára","Kateřina","Monika","Zuzana","Alžběta","Amálie","Magdaléna",
  "Gabriela","Lenka","Petra","Michaela","Hana","Šárka","Simona","Denisa","Iveta","Ivana",
  "Aneta","Andrea","Marie","Sofie","Laura","Nela","Sára","Ema","Julie","Liliana",
  "Vendula","Sabina","Dagmar","Božena","Věra","Jitka","Růžena","Lea","Ilona","Justýna",
  "Dominika","Irena","Blanka","Helena","Renata","Radka","Žaneta","Jiřina","Alice","Romana"
];

const maleSurnames = [
  "Novák","Svoboda","Novotný","Dvořák","Černý","Procházka","Kučera","Veselý","Horák","Němec",
  "Marek","Pospíšil","Král","Pokorný","Jelínek","Růžička","Beneš","Fiala","Sedláček","Doležal",
  "Zeman","Kolář","Navrátil","Čermák","Urban","Vaněk","Bláha","Kříž","Kovář","Kopecký",
  "Kostka","Sýkora","Hruška","Malý","Bartoš","Musil","Říha","Šimek","Mach","Ptáček",
  "Konečný","Holub","Matoušek","Soukup","Kratochvíl","Šálek","Kašpar","Hubáček","Hrubý","Vávra",
  "Březina","Trnka","Šťastný","Havel","Volf","Pavlík","Slavík","Čech","Janda","Štěpánek"
];

const femaleSurnames = maleSurnames.map(s => (s.endsWith("á") ? s : s + "ová"));
const WORKLOADS = [10, 20, 30, 40];

/** @param {{age:{min:number,max:number}}} dtoIn */
function createRandomEmployee(dtoIn) {
  const gender = Math.random() < 0.5 ? "male" : "female";
  const name = gender === "male" ? pick(maleNames) : pick(femaleNames);
  const surname = gender === "male" ? pick(maleSurnames) : pick(femaleSurnames);
  const workload = pick(WORKLOADS);
  const birthdate = randomBirthdate(dtoIn.age.min, dtoIn.age.max);
  return { gender, birthdate, name, surname, workload };
}

/**
 * @param {{count:number, age:{min:number,max:number}}} dtoIn
 * @returns {Array<{gender:string,birthdate:string,name:string,surname:string,workload:number}>}
 */
export function generateEmployeeData(dtoIn) {
  const count = Math.max(0, Number(dtoIn?.count ?? 0));
  const min = Number(dtoIn?.age?.min ?? 18);
  const max = Number(dtoIn?.age?.max ?? 60);
  if (!Number.isFinite(count) || !Number.isFinite(min) || !Number.isFinite(max) || min > max) {
    throw new Error("Invalid dtoIn for generateEmployeeData");
  }
  const out = [];
  for (let i = 0; i < count; i++) out.push(createRandomEmployee({ age: { min, max } }));
  return out;
}
