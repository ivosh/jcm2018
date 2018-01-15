import deepFreeze from 'deep-freeze';
import moment from 'moment';
import startujiciReducer, {
  getDokoncenoWithCisloClass,
  getStartujiciWithoutDuration,
  getStartujiciSorted
} from './startujiciReducer';
import { startujiciDokonceno, startujiciNaTrase, startujiciNedokonceno } from './StartujiciActions';

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = startujiciReducer(stateBefore, {});
  expect(stateAfter).toEqual([]);
});

it('dva startující', () => {
  const stateBefore = [
    { id: 1, cislo: 42, dokonceno: null },
    { id: 2, cislo: 12, dokonceno: null }
  ];
  const stateAfter = [...stateBefore];
  deepFreeze(stateBefore);

  expect(startujiciReducer(stateBefore, {})).toEqual(stateAfter);
});

it('jeden byl na trase a dokončil [moment]', () => {
  const stateBefore = [
    { id: 1, cislo: 42, dokonceno: null },
    { id: 2, cislo: 12, dokonceno: null }
  ];
  const stateAfter = [stateBefore[0], { id: 2, cislo: 12, dokonceno: true, duration: 'PT2.432S' }];
  deepFreeze(stateBefore);

  expect(startujiciReducer(stateBefore, startujiciDokonceno(2, moment.duration(2432)))).toEqual(
    stateAfter
  );
});

it('jeden byl na trase a dokončil [string]', () => {
  const stateBefore = [
    { id: 1, cislo: 42, dokonceno: null },
    { id: 2, cislo: 12, dokonceno: null }
  ];
  const stateAfter = [stateBefore[0], { id: 2, cislo: 12, dokonceno: true, duration: 'PT2.432S' }];
  deepFreeze(stateBefore);

  expect(startujiciReducer(stateBefore, startujiciDokonceno(2, 'PT2.432S'))).toEqual(stateAfter);
});

it('jeden byl na trase a nedokončil', () => {
  const stateBefore = [
    { id: 1, cislo: 42, dokonceno: null },
    { id: 2, cislo: 12, dokonceno: null }
  ];
  const stateAfter = [stateBefore[0], { id: 2, cislo: 12, dokonceno: false, duration: null }];
  deepFreeze(stateBefore);

  expect(startujiciReducer(stateBefore, startujiciNedokonceno(2))).toEqual(stateAfter);
});

it('jeden téměř dokončil ale je zase na trase', () => {
  const stateBefore = [
    { id: 1, cislo: 42, dokonceno: null },
    { id: 2, cislo: 12, dokonceno: true, duration: 'PT0.045S' }
  ];
  const stateAfter = [stateBefore[0], { id: 2, cislo: 12, dokonceno: null, duration: undefined }];
  deepFreeze(stateBefore);

  expect(startujiciReducer(stateBefore, startujiciNaTrase(2))).toEqual(stateAfter);
});

it('jeden nedokončil ale je zase na trase', () => {
  const stateBefore = [
    { id: 1, cislo: 42, dokonceno: null },
    { id: 2, cislo: 12, dokonceno: false, duration: null }
  ];
  const stateAfter = [stateBefore[0], { id: 2, cislo: 12, dokonceno: null }];
  deepFreeze(stateBefore);

  expect(startujiciReducer(stateBefore, startujiciNaTrase(2))).toEqual(stateAfter);
});

it('getDokoncenoWithCisloClass', () => {
  const state = [
    { id: 1, cislo: 42, dokonceno: null },
    { id: 2, cislo: 12, dokonceno: true, duration: 'PT0.045S' }
  ];
  deepFreeze(state);
  const selected = [{ id: 2, cislo: 12, duration: moment.duration(45), cisloClass: 'hah' }];

  expect(getDokoncenoWithCisloClass(state, 'hah')).toEqual(selected);
});

it('getStartujiciWithoutDuration', () => {
  const state = [
    { id: 1, cislo: 42, dokonceno: null },
    { id: 2, cislo: 12, dokonceno: true, duration: 'PT0.045S' }
  ];
  deepFreeze(state);
  const selected = [{ id: 1, cislo: 42, dokonceno: null }, { id: 2, cislo: 12, dokonceno: true }];

  expect(getStartujiciWithoutDuration(state)).toEqual(selected);
});

it('getStartujiciSorted', () => {
  const state = [
    { id: 1, cislo: 42, dokonceno: null },
    { id: 2, cislo: 12, dokonceno: true, duration: 'PT0.045S' }
  ];
  deepFreeze(state);
  const selected = [
    { id: 2, cislo: 12, dokonceno: true, duration: moment.duration(45) },
    { id: 1, cislo: 42, dokonceno: null }
  ];

  expect(getStartujiciSorted(state)).toEqual(selected);
});
