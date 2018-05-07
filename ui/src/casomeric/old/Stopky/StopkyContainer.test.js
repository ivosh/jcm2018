import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import moment from 'moment';
import StopkyContainer from './StopkyContainer';

const mockStore = configureStore();

let store;
let wrapper;
const onAddMezicas = jest.fn();

const setupComponent = state => {
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<StopkyContainer onAddMezicas={onAddMezicas} store={store} />);
};

it('maps state and dispatch to props', () => {
  const state = {
    casomeric: {
      maraton: {
        stopky: {
          base: new Date().toISOString(),
          running: false
        }
      }
    }
  };
  setupComponent(state);

  expect(wrapper.props()).toEqual(
    expect.objectContaining({
      base: expect.any(Date),
      running: false,
      mezicasEnabled: false,
      onAddMezicas: expect.any(Function)
    })
  );
});

it('onAddMezicas is called with a duration', () => {
  const state = {
    casomeric: {
      maraton: {
        stopky: {
          base: new Date().toISOString(),
          running: true
        }
      }
    }
  };
  setupComponent(state);

  const duration = moment.duration('PT2.3S');
  wrapper.props().onAddMezicas(duration);

  expect(onAddMezicas).toHaveBeenCalledWith(duration);
});
