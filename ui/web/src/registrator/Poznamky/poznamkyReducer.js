import { AKTUALNI_ROK } from '../../constants';

const countLines = text => {
  let lines = text ? 1 : 0;
  let index = -1;

  do {
    index = text.indexOf('\n', index + 1);
    if (index >= 0) {
      lines += 1;
    }
  } while (index >= 0);

  return lines;
};

export const getPoznamky = ({ id, rok = AKTUALNI_ROK, ucastnici }) => {
  const ucastnik = ucastnici.byIds[id];

  const ucast = ucastnik[rok];
  if (!ucast) {
    return [];
  }

  const { poznamky = [] } = ucast;
  return poznamky.map(({ datum, text }) => ({
    datum: new Date(datum),
    lines: countLines(text),
    text
  }));
};
