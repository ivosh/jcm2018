import deepFreeze from 'deep-freeze';
import { createSuccessFromAction } from 'ui-common/store/wsAPI';
import { signOut } from '../../auth/SignOut/SignOutActions';
import stopkyReducer from './stopkyReducer';
import { broadcastStopky, fetchStopky } from './stopkyActions';

it('nic se nestalo 1', () => {
  const stateBefore = undefined;

  const stateAfter = stopkyReducer(stateBefore, {});
  expect(stateAfter).toEqual({ byTypy: {}, typy: [], invalidated: false });
});

it('nic se nestalo 2', () => {
  const stateBefore = { byTypy: { cyklo: { running: false } }, typy: ['cyklo'] };
  const stateAfter = { ...stateBefore };
  deepFreeze(stateBefore);

  expect(stopkyReducer(stateBefore, {})).toEqual(stateAfter);
});

it('po načtení stopek', () => {
  const json = {
    code: 'ok',
    response: {
      cyklo: {
        base: '2017-12-01T07:30:00.000Z',
        delta: 'P0D',
        running: true,
        typ: 'cyklo'
      },
      koloběžka: {
        base: null,
        delta: 'PT4H0M0.32S',
        running: false,
        typ: 'koloběžka'
      },
      maraton: {
        base: null,
        delta: 'P0D',
        running: false,
        typ: 'maraton'
      },
      půlmaraton: {
        base: null,
        delta: 'PT1H23M07.34S',
        running: false,
        typ: 'půlmaraton'
      }
    },
    requestId: '0.9310306652587377'
  };

  const stateBefore = { byTypy: {}, typy: [] };
  const stateAfter = {
    byTypy: { ...json.response },
    typy: ['cyklo', 'koloběžka', 'maraton', 'půlmaraton'],
    invalidated: false
  };
  deepFreeze(stateBefore);

  expect(
    stopkyReducer(stateBefore, createSuccessFromAction({ action: fetchStopky(), response: json }))
  ).toEqual(stateAfter);
});

it('po odhlášení', () => {
  const stateBefore = {
    byTypy: {
      cyklo: {
        base: '2017-12-01T07:30:00.000Z',
        delta: 'P0D',
        running: true,
        typ: 'cyklo'
      }
    },
    typy: ['cyklo'],
    invalidated: false
  };
  const stateAfter = { ...stateBefore, invalidated: true };
  deepFreeze(stateBefore);

  expect(stopkyReducer(stateBefore, createSuccessFromAction({ action: signOut() }))).toEqual(
    stateAfter
  );
});

it('broadcastStopky - změna', () => {
  const stateBefore = {
    byTypy: {
      cyklo: {
        base: '2017-12-01T07:30:00.000Z',
        delta: 'P0D',
        running: true,
        typ: 'cyklo'
      }
    },
    typy: ['cyklo']
  };
  deepFreeze(stateBefore);

  expect(
    stopkyReducer(
      stateBefore,
      broadcastStopky({ typ: 'cyklo', base: null, delta: 'PT1H23M07.3S', running: false })
    )
  ).toMatchSnapshot();
});
