import deepFreeze from 'deep-freeze';
import moment from 'moment';
import startujiciReducer, {
  getDokoncenoWithCisloClass,
  getStartujiciWithoutDuration
} from './startujiciReducer';
import { dokonceno, naTrase, nedokonceno } from './StartujiciActions';

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

it('jeden byl na trase a dokončil', () => {
  const stateBefore = [
    { id: 1, cislo: 42, dokonceno: null },
    { id: 2, cislo: 12, dokonceno: null }
  ];
  const stateAfter = [stateBefore[0], { id: 2, cislo: 12, dokonceno: true, duration: 'PT2.432S' }];
  deepFreeze(stateBefore);

  expect(startujiciReducer(stateBefore, dokonceno(2, moment.duration(2432)))).toEqual(stateAfter);
});

it('jeden byl na trase a nedokončil', () => {
  const stateBefore = [
    { id: 1, cislo: 42, dokonceno: null },
    { id: 2, cislo: 12, dokonceno: null }
  ];
  const stateAfter = [stateBefore[0], { id: 2, cislo: 12, dokonceno: false, duration: null }];
  deepFreeze(stateBefore);

  expect(startujiciReducer(stateBefore, nedokonceno(2))).toEqual(stateAfter);
});

it('jeden téměř dokončil ale je zase na trase', () => {
  const stateBefore = [
    { id: 1, cislo: 42, dokonceno: null },
    { id: 2, cislo: 12, dokonceno: true, duration: 'PT0.045S' }
  ];
  const stateAfter = [stateBefore[0], { id: 2, cislo: 12, dokonceno: null, duration: undefined }];
  deepFreeze(stateBefore);

  expect(startujiciReducer(stateBefore, naTrase(2))).toEqual(stateAfter);
});

it('jeden nedokončil ale je zase na trase', () => {
  const stateBefore = [
    { id: 1, cislo: 42, dokonceno: null },
    { id: 2, cislo: 12, dokonceno: false, duration: null }
  ];
  const stateAfter = [stateBefore[0], { id: 2, cislo: 12, dokonceno: null }];
  deepFreeze(stateBefore);

  expect(startujiciReducer(stateBefore, naTrase(2))).toEqual(stateAfter);
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
