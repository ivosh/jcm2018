import { TIMESYNC_LAST_SAMPLES } from '../constants';

const computeSample = ({ clientTime, now, serverTime }) => {
  const latency = new Date(now).getTime() - new Date(clientTime).getTime(); // roundtrip
  const delta = new Date(serverTime).getTime() - new Date(now).getTime();
  return { latency, offset: delta + latency / 2 };
};

const mean = array => array.reduce((prev, cur) => prev + cur) / array.length;

const median = array => {
  array.sort((a, b) => a - b);
  const middle = array.length / 2;
  return middle % 1 === 0 ? array[middle] : (array[middle - 0.5] + array[middle + 0.5]) / 2;
};

const variance = array => {
  const prumer = mean(array);
  return array.reduce((prev, cur) => prev + (cur - prumer) ** 2, 0) / array.length;
};

const standardDeviation = array => Math.sqrt(variance(array));

const computeOffset = samples => {
  if (samples.length === 0) {
    return null;
  }
  if (samples.length === 1) {
    return Math.round(samples[0].offset);
  }

  const latencies = samples.map(sample => sample.latency);
  const limit = median(latencies) + standardDeviation(latencies);

  const filtered = samples.filter(sample => sample.latency < limit);
  const offsets = filtered.map(sample => sample.offset);
  return offsets.length > 0 ? Math.round(mean(offsets)) : null;
};

const initialState = {
  offset: 0,
  running: false,
  samples: []
};

const timesyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TIMESYNC_START':
      return { ...initialState, running: true };
    case 'TIMESYNC_STOP':
      return { ...state, running: false };
    case 'TIMESYNC_SUCCESS': {
      const {
        request: { clientTime },
        response: { now, serverTime }
      } = action;
      const lastSamples = [...state.samples, computeSample({ clientTime, now, serverTime })];
      const samples = lastSamples.slice(-TIMESYNC_LAST_SAMPLES);
      const offset = computeOffset(samples) || state.offset;
      return { ...state, offset, samples };
    }
    default:
      return state;
  }
};

export default timesyncReducer;
