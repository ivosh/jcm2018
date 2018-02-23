import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import StartujiciProTypContainer from './StartujiciProTypContainer';

const mockStore = configureStore();

let store;
beforeEach(() => {
  const state = ucastniciTestData;
  store = mockStore(state);
  store.dispatch = jest.fn();
});

it('maps state to props - půlmaraton, startovní čísla, přihlášky', () => {
  const wrapper = shallow(
    <StartujiciProTypContainer
      jenStartujici={false}
      odstartovani={false}
      typ="půlmaraton"
      renderer={jest.fn()}
      store={store}
    />
  );
  expect(wrapper.props().startujici).toBeTruthy();
  expect(wrapper.props().startujici).toMatchSnapshot();
});

it('maps state to props - půlmaraton, startující, přihlášky', () => {
  const wrapper = shallow(
    <StartujiciProTypContainer
      jenStartujici={true}
      odstartovani={false}
      typ="půlmaraton"
      renderer={jest.fn()}
      store={store}
    />
  );
  expect(wrapper.props().startujici).toBeTruthy();
  expect(wrapper.props().startujici).toMatchSnapshot();
});

it('maps state to props - půlmaraton, startovní čísla, odstartováni', () => {
  const wrapper = shallow(
    <StartujiciProTypContainer
      jenStartujici={false}
      odstartovani={true}
      typ="půlmaraton"
      renderer={jest.fn()}
      store={store}
    />
  );
  expect(wrapper.props().startujici).toBeTruthy();
  expect(wrapper.props().startujici).toMatchSnapshot();
});

it('maps state to props - půlmaraton, startující, odstartováni', () => {
  const wrapper = shallow(
    <StartujiciProTypContainer
      jenStartujici={true}
      odstartovani={true}
      typ="půlmaraton"
      renderer={jest.fn()}
      store={store}
    />
  );
  expect(wrapper.props().startujici).toBeTruthy();
  expect(wrapper.props().startujici).toMatchSnapshot();
});
