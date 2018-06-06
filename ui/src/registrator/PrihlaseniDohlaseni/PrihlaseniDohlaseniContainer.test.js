import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import PrihlaseniDohlaseniContainer from './PrihlaseniDohlaseniContainer';

const mockStore = configureStore();
const actionPrefix = 'PRIHLASENI';
const reduxName = 'prihlaseni';
const route = 'prihlasky';

let store;
let wrapper;
beforeEach(() => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        dohlaseniFilter: false,
        prihlaseniFilter: true,
        kategorieFilter: '',
        textFilter: ''
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(
    <PrihlaseniDohlaseniContainer
      actionPrefix={actionPrefix}
      reduxName={reduxName}
      route={route}
      store={store}
    />
  );
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().actionPrefix).toEqual(actionPrefix);
  expect(wrapper.props().reduxName).toEqual(reduxName);
  expect(wrapper.props().route).toEqual(route);
  expect(wrapper.props().dohlaseniFilter).toMatchSnapshot();
  expect(wrapper.props().prihlaseniFilter).toMatchSnapshot();
  expect(wrapper.props().prihlaseniDohlaseni).toBeTruthy();
  expect(wrapper.props().prihlaseniDohlaseni).toMatchSnapshot();
});

it('maps dohlaseniFilter.onClick to dispatch dohlaseniFilterChange', () => {
  wrapper.props().dohlaseniFilter.onClick();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'PRIHLASENI_DOHLASENI_FILTER_CHANGE' });
});

it('maps prihlaseniFilter.onClick to dispatch prihlaseniFilterChange', () => {
  wrapper.props().prihlaseniFilter.onClick();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'PRIHLASENI_PRIHLASENI_FILTER_CHANGE' });
});
