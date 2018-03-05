export const initialState = { allIds: [], byIds: {}, invalidated: false };

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
  return { ...state, allIds, byIds };
};

const ucastniciReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BROADCAST_UCASTNIK': {
      const { id, roky, ...ucasti } = action.data;
      const updated = { ...state, byIds: { ...state.byIds, [id]: { roky, ...ucasti } } };
      return state.byIds[id] ? updated : { ...updated, allIds: [...updated.allIds, id] };
    }
    case 'FETCH_UCASTNICI_SUCCESS':
      return { ...action.data, invalidated: false };
    case 'PRIHLASKY_SAVE_SUCCESS': {
      const { id, rok, udaje, prihlaska, platby } = action;
      const state1 = updateUcast(state, id, rok, 'udaje', udaje);
      const state2 = updateUcast(state1, id, rok, 'prihlaska', prihlaska);
      return updateUcast(state2, id, rok, 'platby', platby);
    }
    case 'SIGN_OUT_SUCCESS':
      return initialState;
    case 'WEBSOCKET_DISCONNECTED':
      return { ...state, invalidated: true };
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
