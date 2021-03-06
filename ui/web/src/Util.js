import moment from 'moment';

export const narozeniToStr = (narozeni) => {
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

export const datumValid = (value) =>
  validDatumFormats.some((format) => moment(value, format, true).isValid());

export const parseDatum = (value) =>
  validDatumFormats.reduce((accumulator, format) => {
    if (!accumulator && moment(value, format, true).isValid()) {
      return moment.utc(value, format, true).toJSON();
    }
    return accumulator;
  }, undefined) || value;

/* ---------------------------------------------------------------------------------------------- */

export const dokoncene = {
  dokonceno: {
    name: 'dokonceno',
    popisek: 'dokončeno',
    value: true,
  },
  nedokonceno: {
    name: 'nedokonceno',
    popisek: 'nedokončeno',
    value: false,
  },
  'na-trase': {
    name: 'na-trase',
    popisek: 'na trase',
    value: null,
  },
};

export const findDokonceno = (value) =>
  Object.values(dokoncene).find((item) => item.value === value) || dokoncene['na-trase'];
