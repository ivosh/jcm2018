import { narozeniToStr, findDokonceno } from './Util';

it('narozeniToStr - celé datum', () => {
  expect(narozeniToStr({ den: 7, mesic: 12, rok: 1956 })).toEqual('7. 12. 1956');
});

it('narozeniToStr - jen rok', () => {
  expect(narozeniToStr({ rok: 1956 })).toEqual('1956');
});

it('narozeniToStr - vůbec nic', () => {
  expect(narozeniToStr({})).toEqual('');
});

it('findDokonceno - true', () => {
  expect(findDokonceno(true)).toMatchSnapshot();
});

it('findDokonceno - false', () => {
  expect(findDokonceno(false)).toMatchSnapshot();
});

it('findDokonceno - null', () => {
  expect(findDokonceno(null)).toMatchSnapshot();
  expect(findDokonceno(undefined)).toEqual(findDokonceno(null));
});
