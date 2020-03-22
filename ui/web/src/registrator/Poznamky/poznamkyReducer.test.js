import ucastniciTestData, {
  AKTUALNI_DATUM_KONANI,
} from '../../entities/ucastnici/ucastniciTestData';
import { getPoznamky } from './poznamkyReducer';

it('getPoznamky() - něco', () => {
  const state = ucastniciTestData;
  const selected = [
    { datum: new Date(AKTUALNI_DATUM_KONANI), lines: 1, text: 'přihlášena na startu' },
    { datum: new Date(AKTUALNI_DATUM_KONANI), lines: 1, text: 'poběží s vodičem' },
    {
      datum: new Date('2020-05-21T08:53:49.154Z'),
      lines: 4,
      text:
        'jedna moc super dlouhá poznámka\r\nkterá pokračuje na dalších a dalších\r\nřádcích dle libosti\r\naž do nekonečna',
    },
  ];

  const { entities } = state;
  expect(getPoznamky({ id: '8344bc71dec1e99b7e1d01e', ...entities })).toEqual(selected);
});

it('getPoznamky() - nic', () => {
  const state = ucastniciTestData;

  const { entities } = state;
  expect(getPoznamky({ id: '7a09b1fd371dec1e99b7e142', rok: 2018, ...entities })).toEqual([]);
});

it('getPoznamky() - vůbec nic', () => {
  const state = ucastniciTestData;

  const { entities } = state;
  expect(getPoznamky({ id: '7a09b1fd371dec1e99b7e142', rok: 2017, ...entities })).toEqual([]);
});
