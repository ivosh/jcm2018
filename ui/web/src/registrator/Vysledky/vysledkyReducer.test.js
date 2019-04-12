import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { getVysledky } from './vysledkyReducer';

it('getVysledky() - test db', () => {
  const vysledky = getVysledky({ ...ucastniciTestData.entities });

  expect(vysledky).toMatchSnapshot();
});
