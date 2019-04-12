import { AKTUALNI_ROK } from '../../constants';
import { sortForColumn } from '../../sort';
import { getTypKategorie } from '../../entities/rocniky/rocnikyReducer';
import { getUcastiProRok } from '../../entities/ucastnici/ucastniciReducer';

export const getPrihlaseni = ({ kategorie, rocniky, ucastnici, rok = AKTUALNI_ROK }) => {
  const ucasti = getUcastiProRok({ rok, ucastnici });
  const mapped = ucasti.map(jeden => {
    const { id, ucast } = jeden;
    const {
      udaje: { prijmeni, jmeno, narozeni },
      prihlaska,
      vykon
    } = ucast;
    if (vykon) {
      return undefined;
    }

    const { kategorie: kategorieId, startCislo } = prihlaska;
    const taKategorie = kategorie[kategorieId];
    const typKategorieRocniku = getTypKategorie({ rok, typ: taKategorie.typ, rocniky });

    return {
      id,
      prijmeni,
      jmeno,
      narozeni,
      kategorie: taKategorie,
      startCislo,
      startCisloRequired: !!typKategorieRocniku.startCisla
    };
  });
  const filtered = mapped.filter(jeden => jeden !== undefined);

  return sortForColumn({ data: filtered, sortColumn: '', sortDir: undefined });
};

export const getOdstartovani = ({ kategorie, ucastnici, rok = AKTUALNI_ROK }) => {
  const ucasti = getUcastiProRok({ rok, ucastnici });
  const mapped = ucasti.map(jeden => {
    const { id, ucast } = jeden;
    const {
      udaje: { prijmeni, jmeno, narozeni },
      vykon
    } = ucast;
    if (!vykon) {
      return undefined;
    }
    const { kategorie: kategorieId, startCislo } = vykon;

    return {
      id,
      prijmeni,
      jmeno,
      narozeni,
      kategorie: kategorie[kategorieId],
      startCislo
    };
  });
  const filtered = mapped.filter(jeden => jeden !== undefined);

  return sortForColumn({ data: filtered, sortColumn: '', sortDir: undefined });
};
