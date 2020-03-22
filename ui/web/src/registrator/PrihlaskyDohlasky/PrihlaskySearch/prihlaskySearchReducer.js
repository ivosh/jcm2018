import { AKTUALNI_ROK } from '../../../constants';
import { prijmeniJmenoNarozeniSortMethod } from '../../../sort';

export const getSearchOptions = ({ ucastnici }) => {
  const selected = ucastnici.allIds.map((id) => {
    const ucastnik = ucastnici.byIds[id];
    const posledniRok = ucastnik.roky[0];
    const { prijmeni, jmeno, narozeni } = ucastnik[posledniRok].udaje;
    const result = { id, prijmeni, jmeno, narozeni };
    if (ucastnik[AKTUALNI_ROK]) {
      result.kod = ucastnik[AKTUALNI_ROK].prihlaska.kod;
    }
    return result;
  });
  return selected.sort(prijmeniJmenoNarozeniSortMethod);
};
