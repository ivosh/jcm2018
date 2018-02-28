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
