import deepFreeze from 'deep-freeze';
import ucastniciDigestReducer, { SortDirTypes } from './ucastniciDigestReducer';
import sortDirChange from './UcastniciDigestActions';

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = ucastniciDigestReducer(stateBefore, {});
  expect(stateAfter.sortColumn).toBe(undefined);
  expect(stateAfter.sortDir).toEqual(SortDirTypes.NONE);
});

it('řadit dle příjmení vzestupně', () => {
  const stateBefore = { sortColumn: undefined, sortDir: SortDirTypes.NONE };
  const stateAfter = { sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('řadit dle příjmení sestupně', () => {
  const stateBefore = { sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  const stateAfter = { sortColumn: 'prijmeni', sortDir: SortDirTypes.DESC };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, sortDirChange('prijmeni'))).toEqual(stateAfter);
});

it('řadit dle jména vzestupně', () => {
  const stateBefore = { sortColumn: 'prijmeni', sortDir: SortDirTypes.ASC };
  const stateAfter = { sortColumn: 'jmeno', sortDir: SortDirTypes.ASC };
  deepFreeze(stateBefore);

  expect(ucastniciDigestReducer(stateBefore, sortDirChange('jmeno'))).toEqual(stateAfter);
});
