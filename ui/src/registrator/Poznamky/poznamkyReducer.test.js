import deepFreeze from 'deep-freeze';
import ucastniciTestData, {
  AKTUALNI_DATUM_KONANI
} from '../../entities/ucastnici/ucastniciTestData';
import { getPoznamky } from './poznamkyReducer';

it('getPoznamky()', () => {
  const state = ucastniciTestData;
  const selected = [
    { datum: new Date(AKTUALNI_DATUM_KONANI), lines: 1, text: 'přihlášena na startu' },
    { datum: new Date(AKTUALNI_DATUM_KONANI), lines: 1, text: 'poběží s vodičem' },
    {
      datum: new Date('2019-05-21T08:53:49.154Z'),
      lines: 4,
      text:
        'jedna moc super dlouhá poznámka\r\nkterá pokračuje na dalších a dalších\r\nřádcích dle libosti\r\naž do nekonečna'
    }
  ];
  deepFreeze(state);

  const { entities } = state;
  expect(getPoznamky({ id: '8344bc71dec1e99b7e1d01e', ...entities })).toEqual(selected);
});
