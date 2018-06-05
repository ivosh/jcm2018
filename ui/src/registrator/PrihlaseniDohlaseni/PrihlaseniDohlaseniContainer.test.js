import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import PrihlaseniDohlaseniContainer from './PrihlaseniDohlaseniContainer';

const mockStore = configureStore();
const actionPrefix = 'PRIHLASENI';
const reduxName = 'prihlaseni';

let store;
let wrapper;
beforeEach(() => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        kategorieFilter: '',
        textFilter: ''
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(
    <PrihlaseniDohlaseniContainer actionPrefix={actionPrefix} reduxName={reduxName} store={store} />
  );
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().prihlaseniDohlaseni).toBeTruthy();
  expect(wrapper.props().prihlaseniDohlaseni).toMatchSnapshot();
});
