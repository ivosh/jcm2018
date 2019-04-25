import moment from 'moment';
import convertDuration from 'ui-common/convertDuration';
import { AKTUALNI_ROK, TYPY_KATEGORII } from '../../constants';
import { findDokonceno } from '../../Util';
import { getKategorieProTyp } from '../../entities/rocniky/rocnikyReducer';
import { getPoradiSorted } from '../Poradi/poradiReducer';

const months = [
  'ledna',
  'února',
  'března',
  'dubna',
  'května',
  'června',
  'července',
  'srpna',
  'září',
  'října',
  'listopadu',
  'prosince'
];

const pohlaviMnozne = { muž: 'muži', žena: 'ženy' };

const popisekKategorie = ({ pohlavi, vek, typ }) => {
  if (!pohlavi) {
    return typ.toUpperCase().substring(0, 1);
  }
  if (!vek) {
    return pohlaviMnozne[pohlavi];
  }
  if (vek.max === 150) {
    return `${pohlaviMnozne[pohlavi]} ${vek.min} a více`;
  }
  return `${pohlaviMnozne[pohlavi]} ${vek.min}-${vek.max}`;
};

const popisekTypu = {
  maraton: 'maratonci',
  půlmaraton: 'půlmaratonci',
  cyklo: 'cyklisté',
  koloběžka: 'koloběžky',
  pěší: 'turisté'
};

export const getVysledky = ({ rocniky, ucastnici, rok = AKTUALNI_ROK }) => {
  const rocnik = rocniky.byRoky[rok];
  const date = new Date(rocnik.datum);

  const vysledky = {
    title: 'Výsledková listina',
    subtitle: `Jirkovský crossmarathon a Jirkovský půlmarathon ${rok}`,
    datum: `${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`,
    summary: { startovalo: 0, dokoncilo: 0 },
    typy: {}
  };

  TYPY_KATEGORII.forEach(typ => {
    const stats = { startovalo: 0, dokoncilo: 0 };
    const poradi = getPoradiSorted({
      kategorieFilter: typ,
      sortColumn: 'absPoradi',
      rocniky,
      ucastnici,
      rok
    });

    const ucastniciProTyp = poradi.map(
      ({
        id,
        prijmeni,
        jmeno,
        narozeni,
        obec,
        stat,
        klub,
        kategorie,
        startCislo,
        dokonceno,
        cas,
        absPoradi,
        relPoradi
      }) => {
        const { zkratka } = kategorie;
        let casAsText;
        if (dokonceno) {
          const duration = convertDuration(moment.duration(cas));
          casAsText = `${duration.hours}:${duration.mins}:${duration.secs},${duration.subsecs}`;
        } else {
          casAsText = findDokonceno(dokonceno).popisek;
        }
        const ucastnik = {
          id,
          prijmeni,
          jmeno,
          narozeni: narozeni.rok,
          misto: `${klub || obec}${stat !== 'Česká republika' ? ` (${stat})` : ''}`,
          kategorie,
          startCislo,
          dokonceno,
          cas: casAsText,
          absPoradi,
          relPoradi
        };

        if (!stats[zkratka]) {
          stats[zkratka] = {
            startovalo: 0,
            dokoncilo: 0,
            popisek: popisekKategorie(kategorie),
            zkratka
          };
        }
        stats[zkratka].startovalo += 1;
        stats.startovalo += 1;
        vysledky.summary.startovalo += 1;
        if (dokonceno) {
          stats[zkratka].dokoncilo += 1;
          stats.dokoncilo += 1;
          vysledky.summary.dokoncilo += 1;
        }

        return ucastnik;
      }
    );

    const kategorieProTyp = getKategorieProTyp({ typ, rocniky, rok });
    const vsechnyZkratky = kategorieProTyp.list.map(({ zkratka }) =>
      stats[zkratka] ? zkratka : undefined
    );
    const zkratky = vsechnyZkratky.filter(zkratka => zkratka);

    vysledky.typy[typ] = {
      popisek: popisekTypu[typ],
      startCisla: !!rocnik.kategorie[typ].startCisla,
      stats,
      typ,
      ucastnici: ucastniciProTyp,
      zkratky
    };
  });

  return vysledky;
};
