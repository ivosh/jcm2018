import deepFreeze from 'deep-freeze';
import moment from 'moment';
import mezicasyReducer from './mezicasyReducer';
import { addMezicas, removeMezicas } from './MezicasyActions';

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = mezicasyReducer(stateBefore, {});
  expect(stateAfter).toEqual([]);
});

it('přidej jeden', () => {
  const stateBefore = [];
  const stateAfter = [{ id: 0, duration: moment.duration(12601) }];
  deepFreeze(stateBefore);

  expect(mezicasyReducer(stateBefore, addMezicas(moment.duration('PT12.601S')))).toEqual(
    stateAfter
  );
});

it('přidej další', () => {
  const stateBefore = [{ id: 0, duration: moment.duration('PT5.4S') }];
  const stateAfter = [stateBefore[0], { id: 1, duration: moment.duration('PT12.601S') }];
  deepFreeze(stateBefore);

  expect(mezicasyReducer(stateBefore, addMezicas(moment.duration(12601)))).toEqual(stateAfter);
});

it('měj mezičasy seřazené I.', () => {
  const stateBefore = [
    { id: 0, duration: moment.duration('PT4.950S') },
    { id: 1, duration: moment.duration('PT12.101S') }
  ];
  const stateAfter = [stateBefore[0], { id: 2, duration: moment.duration(5600) }, stateBefore[1]];
  deepFreeze(stateBefore);

  expect(mezicasyReducer(stateBefore, addMezicas(moment.duration('PT5.600S')))).toEqual(stateAfter);
});

it('měj mezičasy seřazené II.', () => {
  const stateBefore = [
    { id: 0, duration: moment.duration(435) },
    { id: 1, duration: moment.duration(678) }
  ];
  const stateAfter = [{ id: 3, duration: moment.duration(123) }, stateBefore[0], stateBefore[1]];
  deepFreeze(stateBefore);

  expect(mezicasyReducer(stateBefore, addMezicas(moment.duration(123)))).toEqual(stateAfter);
});

it('vyndej první', () => {
  const stateBefore = [
    { id: 0, duration: moment.duration(124) },
    { id: 1, duration: moment.duration(456) }
  ];
  const stateAfter = [stateBefore[1]];
  deepFreeze(stateBefore);

  expect(mezicasyReducer(stateBefore, removeMezicas(0))).toEqual(stateAfter);
});

it('vyndej neexistující', () => {
  const stateBefore = [
    { id: 0, duration: moment.duration(123) },
    { id: 2, duration: moment.duration(456) }
  ];
  const stateAfter = [stateBefore[0], stateBefore[1]];
  deepFreeze(stateBefore);

  expect(mezicasyReducer(stateBefore, removeMezicas(1))).toEqual(stateAfter);
});
