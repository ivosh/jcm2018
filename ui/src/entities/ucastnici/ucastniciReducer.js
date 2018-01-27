export const initialState = { allIds: [], byIds: {} };

// První element je vždycky nejvyšší rok.
const addRokAndSort = (roky, rok) => [...roky, rok].sort((a, b) => b - a);

const updateUcast = (state, id, rok, name, obj) => {
  let { allIds, byIds } = state;

  let ucastnik = byIds[id];
  if (!ucastnik) {
    ucastnik = { roky: [] };
    allIds = [...allIds, id];
  }

  let ucast = ucastnik[rok];
  if (!ucast) {
    ucast = {};
    ucastnik = { ...ucastnik, roky: addRokAndSort(ucastnik.roky, rok) };
  }

  ucast = { ...ucast, [name]: obj };
  ucastnik = { ...ucastnik, [rok]: ucast };
  byIds = { ...byIds, [id]: ucastnik };
  return { allIds, byIds };
};

const ucastniciReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_UCASTNICI_SUCCESS':
      return action.data;
    case 'PRIHLASENI_SAVE_SUCCESS': {
      const { id, rok, udaje, prihlaska } = action;
      const stateUpdated = updateUcast(state, id, rok, 'udaje', udaje);
      return updateUcast(stateUpdated, id, rok, 'prihlaska', prihlaska);
    }
    case 'SIGN_OUT_SUCCESS':
      return initialState;
    default:
      return state;
  }
};

export default ucastniciReducer;

// Forces 'null' to be the last (desc = false) or first (desc = true).
// Note that 'undefined' is never passed to the sort method (virtue of Array.prototype.sort).
export const narozeniSortMethod = (a, b, desc = false) => {
  if (a && b) {
    if (a.rok < b.rok) {
      return -1;
    }
    if (a.rok > b.rok) {
      return +1;
    }

    if (a.mesic && b.mesic) {
      if (a.mesic < b.mesic) {
        return -1;
      }
      if (a.mesic > b.mesic) {
        return +1;
      }

      if (a.den && b.den) {
        if (a.den < b.den) {
          return -1;
        }
        if (a.den > b.den) {
          return +1;
        }
        return 0; // a tie
      }

      if (!a.den && !b.den) {
        return 0; // both null or undefined
      }
      if (a.den) {
        return desc ? +1 : -1;
      }
      return desc ? -1 : +1;
    }

    if (!a.mesic && !b.mesic) {
      return 0; // both null or undefined
    }
    if (a.mesic) {
      return desc ? +1 : -1;
    }
    return desc ? -1 : +1;
  }

  if (!a && !b) {
    return 0; // both null
  }
  if (a) {
    return desc ? +1 : -1;
  }
  return desc ? -1 : +1;
};

const collator = new Intl.Collator('cs');
export const csStringSortMethod = (a, b) => collator.compare(a, b);

export const prijmeniJmenoNarozeniSortMethod = (a, b) => {
  const prijmeniCmp = csStringSortMethod(a.prijmeni, b.prijmeni);
  if (prijmeniCmp !== 0) {
    return prijmeniCmp;
  }

  const jmenoCmp = csStringSortMethod(a.jmeno, b.jmeno);
  if (jmenoCmp !== 0) {
    return jmenoCmp;
  }

  return narozeniSortMethod(a.narozeni, b.narozeni);
};
