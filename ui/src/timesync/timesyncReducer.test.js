import deepFreeze from 'deep-freeze';
import { createSuccessFromAction } from '../store/wsAPI';
import { timesync, timesyncStart, timesyncStop } from './timesyncActions';
import timesyncReducer from './timesyncReducer';

it('na začátku', () => {
  const stateBefore = undefined;
  const stateAfter = { offset: 0, running: false, samples: [] };

  expect(timesyncReducer(stateBefore, {})).toEqual(stateAfter);
});

it('start', () => {
  const stateBefore = { offset: 0, running: false, samples: [] };
  const stateAfter = { ...stateBefore, running: true };
  deepFreeze(stateBefore);

  expect(timesyncReducer(stateBefore, timesyncStart())).toEqual(stateAfter);
});

it('stop', () => {
  const stateBefore = {
    offset: -234,
    running: true,
    samples: [{ latency: 34645, offset: 23 }, { latency: 980, offset: -34 }]
  };
  const stateAfter = { ...stateBefore, running: false };
  deepFreeze(stateBefore);

  expect(timesyncReducer(stateBefore, timesyncStop())).toEqual(stateAfter);
});

it('první response', () => {
  const stateBefore = { offset: 0, running: true, samples: [] };
  const stateAfter = { ...stateBefore, offset: 215, samples: [{ latency: 1890, offset: 215 }] };
  deepFreeze(stateBefore);

  expect(
    timesyncReducer(
      stateBefore,
      createSuccessFromAction({
        action: timesync(),
        request: { clientTime: '2018-11-30T06:15:32.4Z' },
        response: {
          response: {
            now: '2018-11-30T06:15:34.29Z',
            serverTime: '2018-11-30T06:15:33.56Z'
          }
        }
      })
    )
  ).toEqual(stateAfter);
});

it('response 5x', () => {
  const stateBefore = {
    offset: 0,
    running: true,
    samples: [
      { latency: 256, offset: 32 },
      { latency: 241, offset: 21 },
      { latency: 273, offset: 39 },
      { latency: 320, offset: -41 }
    ]
  };
  const stateAfter = {
    ...stateBefore,
    offset: 22.25,
    samples: [...stateBefore.samples, { latency: 176, offset: -3 }]
  };
  deepFreeze(stateBefore);

  expect(
    timesyncReducer(
      stateBefore,
      createSuccessFromAction({
        action: timesync(),
        request: { clientTime: '2018-11-30T06:15:32.427Z' },
        response: {
          response: {
            now: '2018-11-30T06:15:32.603Z',
            serverTime: '2018-11-30T06:15:32.512Z'
          }
        }
      })
    )
  ).toEqual(stateAfter);
});
