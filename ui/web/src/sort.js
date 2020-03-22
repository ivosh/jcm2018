import moment from 'moment';

export const SortDirTypes = { NONE: 'none', ASC: 'asc', DESC: 'desc' };

export const reverseSortDirType = (sortDirType) => {
  switch (sortDirType) {
    case SortDirTypes.ASC:
      return SortDirTypes.DESC;
    case SortDirTypes.DESC:
      return SortDirTypes.ASC;
    default:
      return SortDirTypes.ASC;
  }
};

// Forces 'null' to be the last (desc = false) or first (desc = true).
// Note that 'undefined' is never passed to the sort method (virtue of Array.prototype.sort).
export const numberAndUndefinedSortMethod = (a, b, desc = false) => {
  if (a && b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return +1;
    }
    return 0; // a tie
  }

  if (!a && !b) {
    return 0; // both null or undefined
  }
  if (a) {
    return desc ? +1 : -1;
  }
  return desc ? -1 : +1;
};

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

      return numberAndUndefinedSortMethod(a.den, b.den, desc);
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

export const datumSortMethod = (a, b) => a.getTime() - b.getTime();

export const kategorieSortMethod = (a, b) => {
  let rv = csStringSortMethod(a.typ, b.typ);
  if (rv !== 0) {
    return rv;
  }

  if (a.pohlavi) {
    rv = csStringSortMethod(a.pohlavi, b.pohlavi);
    if (rv !== 0) {
      return rv;
    }
  }

  if (a.vek && b.vek) {
    return a.vek.min - b.vek.min;
  }

  return 0;
};

export const prijmeniJmenoNarozeniSortMethod = (a, b, desc = false) => {
  const prijmeniCmp = csStringSortMethod(a.prijmeni, b.prijmeni);
  if (prijmeniCmp !== 0) {
    return prijmeniCmp;
  }

  const jmenoCmp = csStringSortMethod(a.jmeno, b.jmeno);
  if (jmenoCmp !== 0) {
    return jmenoCmp;
  }

  return narozeniSortMethod(a.narozeni, b.narozeni, desc);
};

export const dokoncenoSortMethod = (a, b) => {
  if (a === b) {
    return 0;
  }

  if (a === undefined || a === null) {
    return +1;
  }
  if (b === undefined || b === null) {
    return -1;
  }

  if (a === true && b === false) {
    return -1;
  }
  return +1; // a === false, b === true
};

export const casSortMethod = (a, b, desc = false) => {
  const c = a ? moment.duration(a).asMilliseconds() : undefined;
  const d = b ? moment.duration(b).asMilliseconds() : undefined;
  return numberAndUndefinedSortMethod(c, d, desc);
};

export const dokoncenoCasSortMethod = (a, b, desc = false) => {
  const dokoncenoCmp = dokoncenoSortMethod(a.dokonceno, b.dokonceno);
  if (dokoncenoCmp !== 0) {
    return dokoncenoCmp;
  }

  return casSortMethod(a.cas, b.cas, desc);
};

export const sortForColumn = ({ data, sortColumn, sortDir, extraSortMethods = {} }) => {
  const desc = sortDir === SortDirTypes.DESC;

  const sortMethods = {
    absPoradi: (a, b) => numberAndUndefinedSortMethod(a.absPoradi, b.absPoradi, desc),
    cas: (a, b) => casSortMethod(a.cas, b.cas, desc),
    datum: (a, b) => datumSortMethod(a.datum, b.datum),
    dokonceno: (a, b) => dokoncenoSortMethod(a.dokonceno, b.dokonceno),
    email: (a, b) => csStringSortMethod(a.email, b.email),
    jmeno: (a, b) => csStringSortMethod(a.jmeno, b.jmeno),
    kategorie: (a, b) => kategorieSortMethod(a.kategorie, b.kategorie),
    narozeni: (a, b) => narozeniSortMethod(a.narozeni, b.narozeni, desc),
    obec: (a, b) => csStringSortMethod(a.obec, b.obec),
    prijmeni: (a, b) => csStringSortMethod(a.prijmeni, b.prijmeni),
    relPoradi: (a, b) => numberAndUndefinedSortMethod(a.relPoradi, b.relPoradi, desc),
    startCislo: (a, b) => numberAndUndefinedSortMethod(a.startCislo, b.startCislo, desc),
    zaplaceno: (a, b) => a.zaplaceno - b.zaplaceno,
    ...extraSortMethods,
  };

  const sortMethod = sortMethods[sortColumn] || prijmeniJmenoNarozeniSortMethod;
  const sorted = data.slice().sort(sortMethod);

  if (desc) {
    sorted.reverse();
  }

  return sorted;
};
