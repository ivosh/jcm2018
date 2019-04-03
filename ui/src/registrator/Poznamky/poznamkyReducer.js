import { AKTUALNI_ROK } from '../../constants';

// eslint-disable-next-line import/prefer-default-export
export const getPoznamky = ({ id, rok = AKTUALNI_ROK, ucastnici }) => {
  const ucastnik = ucastnici.byIds[id];

  const ucast = ucastnik[rok];
  if (!ucast) {
    return [];
  }

  const { poznamky = [] } = ucast;
  return poznamky.map(({ datum, ...rest }) => ({ datum: new Date(datum), ...rest }));
};
