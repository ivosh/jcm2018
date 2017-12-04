export const initialState = { allIds: [], byIds: {} };

const ucastniciReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_UCASTNICI':
      return action.ucastnici;
    default:
      return state;
  }
};

export default ucastniciReducer;

export const getUcastniciOverviewSorted = ({ allIds, byIds }) => {
  const ucastnici = [];
  allIds.forEach(id => {
    const ucastnik = byIds[id];
    const posledniUcast = ucastnik[ucastnik.roky[0]];

    ucastnici.push({
      id,
      prijmeni: posledniUcast.udaje.prijmeni,
      jmeno: posledniUcast.udaje.jmeno,
      narozeni: posledniUcast.udaje.narozeni.rok
    });
  });

  const collator = new Intl.Collator('cs');
  return ucastnici.sort((a, b) => {
    const prijmeniCmp = collator.compare(a.prijmeni, b.prijmeni);
    if (prijmeniCmp !== 0) {
      return prijmeniCmp;
    }

    const jmenoCmp = collator.compare(a.jmeno, b.jmeno);
    if (jmenoCmp !== 0) {
      return jmenoCmp;
    }

    return a.narozeni - b.narozeni;
  });
};
