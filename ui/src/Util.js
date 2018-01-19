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
  maraton: '#b0ffb5',
  půlmaraton: '#ff837a',
  cyklo: '#efe023',
  koloběžka: '#405ced',
  pěší: '#d793ff'
};
export const barvaProTypKategorie = typKategorie => barvy[typKategorie] || '';
