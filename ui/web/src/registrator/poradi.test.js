import { getKategorie } from '../entities/rocniky/rocnikyReducer';
import ucastniciTestData from '../entities/ucastnici/ucastniciTestData';
import { computePoradiProVsechny } from './poradi';

it('computePoradiProVsechny()', () => {
  const kategorieProRocnik = getKategorie({ rocniky: ucastniciTestData.entities.rocniky });
  const {
    maraton: { list: maraton },
    cyklo: { list: cyklo },
    pěší: { list: pěší },
  } = kategorieProRocnik.typy;
  const data = [
    { kategorie: cyklo[4], dokonceno: false, cas: undefined },
    { kategorie: cyklo[2], dokonceno: true, cas: 'PT2H15M32.5S' },
    { kategorie: cyklo[2], dokonceno: true, cas: 'PT2H13M45.59S' },
    { kategorie: maraton[3], dokonceno: false, cas: undefined },
    { kategorie: cyklo[1], dokonceno: true, cas: 'PT2H14M21.6S' },
    { kategorie: maraton[3], dokonceno: undefined, cas: undefined },
    { kategorie: maraton[8], dokonceno: undefined, cas: undefined },
    { kategorie: maraton[7], dokonceno: false, cas: undefined },
    { kategorie: maraton[5], dokonceno: undefined, cas: undefined },
    { kategorie: pěší[0], dokonceno: true },
    { kategorie: maraton[0], dokonceno: true, cas: 'PT2H06M32.32S' },
    { kategorie: maraton[3], dokonceno: true, cas: 'PT1H15M21.5S' },
    { kategorie: maraton[7], dokonceno: true, cas: 'PT3H21M56.23S' },
  ];
  const expected = [
    { kategorie: maraton[3], dokonceno: true, cas: 'PT1H15M21.5S', absPoradi: 1, relPoradi: 1 },
    { kategorie: maraton[0], dokonceno: true, cas: 'PT2H06M32.32S', absPoradi: 2, relPoradi: 1 },
    { kategorie: maraton[7], dokonceno: true, cas: 'PT3H21M56.23S', absPoradi: 3, relPoradi: 1 },
    { kategorie: maraton[3], dokonceno: false, cas: undefined },
    { kategorie: maraton[7], dokonceno: false, cas: undefined },
    { kategorie: maraton[3], dokonceno: undefined, cas: undefined },
    { kategorie: maraton[5], dokonceno: undefined, cas: undefined },
    { kategorie: maraton[8], dokonceno: undefined, cas: undefined },
    { kategorie: cyklo[2], dokonceno: true, cas: 'PT2H13M45.59S', absPoradi: 1, relPoradi: 1 },
    { kategorie: cyklo[1], dokonceno: true, cas: 'PT2H14M21.6S', absPoradi: 2, relPoradi: 1 },
    { kategorie: cyklo[2], dokonceno: true, cas: 'PT2H15M32.5S', absPoradi: 3, relPoradi: 2 },
    { kategorie: cyklo[4], dokonceno: false, cas: undefined },
    { kategorie: pěší[0], dokonceno: true },
  ];

  expect(computePoradiProVsechny({ data, kategorieProRocnik })).toEqual(expected);
});
