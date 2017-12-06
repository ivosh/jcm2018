import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import StartCisloInputContainer from './StartCisloInputContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    startujici: [
      { id: 0, cislo: 8, dokonceno: true, duration: 'PT2H32M14.2S' },
      { id: 1, cislo: 7, dokonceno: null },
      { id: 2, cislo: 5, dokonceno: null },
      { id: 3, cislo: 25, dokonceno: false }
    ]
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(
    <StartCisloInputContainer
      mezicasId={14}
      duration={moment.duration('PT4H15M21S')}
      store={store}
    />
  );
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().startujici).toBeTruthy();
  expect(wrapper.props().startujici).toMatchSnapshot();
  expect(wrapper.props()).toEqual(
    expect.objectContaining({ onCisloSubmitted: expect.any(Function) })
  );
});

it('maps onCisloSubmitted to dispatch removeMezicas and startujiciDokonceno actions', () => {
  wrapper.props().onCisloSubmitted(2);

  expect(store.dispatch).toHaveBeenCalledTimes(2);
  expect(store.dispatch).toHaveBeenCalledWith({ id: 14, type: 'REMOVE_MEZICAS' });
});
