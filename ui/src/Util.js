import moment from 'moment';

export const convertDuration = duration => {
  let hours;
  let mins;
  let secs;
  let subsecs;
  if (duration === null) {
    hours = '-';
    mins = '--';
    secs = '--';
    subsecs = '--';
  } else {
    hours = duration.hours().toString();

    mins = duration.minutes().toString();
    if (mins.length < 2) {
      mins = `0${mins}`;
    }

    secs = duration.seconds().toString();
    if (secs.length < 2) {
      secs = `0${secs}`;
    }

    subsecs = duration.milliseconds().toString();
    if (subsecs.length === 1) {
      subsecs = '00'; // forget rounding
    } else if (subsecs.length === 2) {
      subsecs = `0${subsecs.slice(0, 1)}`; // forget rounding
    } else {
      subsecs = subsecs.slice(0, 2);
    }
  }

  return { hours, mins, secs, subsecs };
};

/* ---------------------------------------------------------------------------------------------- */

export const narozeniToStr = narozeni => {
  const { den, mesic, rok } = narozeni;
  if (mesic && den && rok) {
    return `${den}. ${mesic}. ${rok}`;
  }
  if (rok) {
    return `${rok}`;
  }
  return '';
};

/* ---------------------------------------------------------------------------------------------- */

export const numberValid = (value, validate) => {
  if ((value === undefined || value === '') && !validate) {
    return undefined;
  }

  const cislo = parseInt(value, 10);
  return Number.isNaN(cislo) ? 'error' : 'success';
};

export const validDatumFormats = ['D.M.YYYY', 'D. M. YYYY', moment.ISO_8601];

export const datumValid = value =>
  validDatumFormats.some(format => moment(value, format, true).isValid());

export const parseDatum = value =>
  validDatumFormats.reduce((accumulator, format) => {
    if (!accumulator && moment(value, format, true).isValid()) {
      return moment.utc(value, format, true).toJSON();
    }
    return accumulator;
  }, undefined) || value;

/* ---------------------------------------------------------------------------------------------- */

export const dokoncenoArr = [true, false, null];

export const dokoncenoStr = dokonceno => {
  if (dokonceno === true) {
    return ['dokonceno', 'dokončeno'];
  } else if (dokonceno === false) {
    return ['nedokonceno', 'nedokončeno'];
  }
  return ['na-trase', 'na trase'];
};

const barvy = {
  maraton: ['176', '255', '181'],
  půlmaraton: ['255', '131', '122'],
  cyklo: ['239', '224', '35'],
  koloběžka: ['80', '124', '239'],
  pěší: ['215', '147', '255']
};
export const barvaProTypKategorie = (typKategorie, alpha = '1.0') => {
  const barva = barvy[typKategorie];
  if (barva) {
    return `rgba(${barva[0]}, ${barva[1]}, ${barva[2]}, ${alpha})`;
  }
  return '';
};

/* ---------------------------------------------------------------------------------------------- */

export const SortDirTypes = { NONE: 'none', ASC: 'asc', DESC: 'desc' };

export const reverseSortDirType = sortDirType => {
  switch (sortDirType) {
    case SortDirTypes.ASC:
      return SortDirTypes.DESC;
    case SortDirTypes.DESC:
      return SortDirTypes.ASC;
    default:
      return SortDirTypes.ASC;
  }
};

/* ---------------------------------------------------------------------------------------------- */

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
