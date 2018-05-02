import moment from 'moment';

const zeroDuration = moment.duration(0).toJSON();

export const initialState = {
  base: null, // a Date when running
  delta: zeroDuration, // a duration when not running
  running: false
};

const stopkyProTypReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STOPKY_START':
      if (!state.running) {
        const base = new Date(
          action.now.getTime() - moment.duration(state.delta).valueOf()
        ).toJSON();
        return { ...state, running: true, base, delta: zeroDuration };
      }
      return state;
    case 'STOPKY_STOP': {
      if (state.running) {
        const delta = moment
          .duration(action.now.getTime() - new Date(state.base).getTime())
          .toJSON();
        return { ...state, running: false, base: null, delta };
      }
      return state;
    }
    case 'STOPKY_CHANGE': {
      if (state.running) {
        return { ...state, base: new Date(new Date(state.base).getTime() - action.step).toJSON() };
      }
      if (action.step >= 0) {
        return {
          ...state,
          delta: moment
            .duration(state.delta)
            .add(action.step)
            .toJSON()
        };
      }

      const delta = moment.duration(state.delta).subtract(-action.step);
      if (delta >= 0) {
        return { ...state, delta: delta.toJSON() };
      }
      return state;
    }
    default:
      return state;
  }
};

export default stopkyProTypReducer;

export const getCudly = () => [
  { popisek: '+10', step: 10 * 60 * 60 * 1000 },
  { popisek: '+1', step: 60 * 60 * 1000 },
  { popisek: '+10', step: 10 * 60 * 1000 },
  { popisek: '+1', step: 60 * 1000 },
  { popisek: '+10', step: 10 * 1000 },
  { popisek: '+1', step: 1000 },
  { popisek: '+10', step: 100 },
  { popisek: '+1', step: 10 },
  { popisek: '-10', step: -10 * 60 * 60 * 1000 },
  { popisek: '-1', step: -60 * 60 * 1000 },
  { popisek: '-10', step: -10 * 60 * 1000 },
  { popisek: '-1', step: -60 * 1000 },
  { popisek: '-10', step: -10 * 1000 },
  { popisek: '-1', step: -1000 },
  { popisek: '-10', step: -100 },
  { popisek: '-1', step: -10 }
];
