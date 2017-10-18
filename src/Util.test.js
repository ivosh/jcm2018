import moment from 'moment';
import { convertDuration } from './Util';

it('null', () => {
  const expected = { hours: '-', mins: '--', secs: '--', subsecs: '--' };
  expect(convertDuration(null)).toEqual(expected);
});

it('nula', () => {
  const expected = { hours: '0', mins: '00', secs: '00', subsecs: '00' };
  expect(convertDuration(moment.duration(0))).toEqual(expected);
});

it('jen pár milisekund', () => {
  const expected = { hours: '0', mins: '00', secs: '00', subsecs: '00' };
  expect(convertDuration(moment.duration('PT0H0M0.006S'))).toEqual(expected);
});

it('jen pár desítek milisekund', () => {
  const expected = { hours: '0', mins: '00', secs: '00', subsecs: '06' };
  expect(convertDuration(moment.duration('PT0H0M0.060S'))).toEqual(expected);
});

it('jen pár stovek milisekund', () => {
  const expected = { hours: '0', mins: '00', secs: '00', subsecs: '64' };
  expect(convertDuration(moment.duration('PT0H0M0.640S'))).toEqual(expected);
});

it('jen pár sekund', () => {
  const expected = { hours: '0', mins: '00', secs: '07', subsecs: '64' };
  expect(convertDuration(moment.duration('PT0H0M07.640S'))).toEqual(expected);
});

it('jen pár desítek sekund', () => {
  const expected = { hours: '0', mins: '00', secs: '17', subsecs: '64' };
  expect(convertDuration(moment.duration('PT0H0M17.643S'))).toEqual(expected);
});

it('jen pár minut', () => {
  const expected = { hours: '0', mins: '03', secs: '17', subsecs: '64' };
  expect(convertDuration(moment.duration('PT0H3M17.643S'))).toEqual(expected);
});

it('jen pár hodin', () => {
  const expected = { hours: '4', mins: '53', secs: '17', subsecs: '64' };
  expect(convertDuration(moment.duration('PT4H53M17.643S'))).toEqual(expected);
});
