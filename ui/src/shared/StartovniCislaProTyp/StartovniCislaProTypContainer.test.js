import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import StartovniCislaProTypContainer from './StartovniCislaProTypContainer';

const mockStore = configureStore();

let store;
beforeEach(() => {
  const state = ucastniciTestData;
  store = mockStore(state);
  store.dispatch = jest.fn();
});

it('maps state to props - půlmaraton, startovní čísla, přihlášky', () => {
  const wrapper = shallow(
    <StartovniCislaProTypContainer
      jenStartujici={false}
      odstartovani={false}
      typ="půlmaraton"
      Renderer={jest.fn()}
      store={store}
    />
  );
  expect(wrapper.props().startovniCisla).toBeTruthy();
  expect(wrapper.props().startovniCisla).toMatchSnapshot();
});

it('maps state to props - půlmaraton, startující, přihlášky', () => {
  const wrapper = shallow(
    <StartovniCislaProTypContainer
      jenStartujici={true}
      odstartovani={false}
      typ="půlmaraton"
      Renderer={jest.fn()}
      store={store}
    />
  );
  expect(wrapper.props().startovniCisla).toBeTruthy();
  expect(wrapper.props().startovniCisla).toMatchSnapshot();
});

it('maps state to props - půlmaraton, startovní čísla, odstartováni', () => {
  const wrapper = shallow(
    <StartovniCislaProTypContainer
      jenStartujici={false}
      odstartovani={true}
      typ="půlmaraton"
      Renderer={jest.fn()}
      store={store}
    />
  );
  expect(wrapper.props().startovniCisla).toBeTruthy();
  expect(wrapper.props().startovniCisla).toMatchSnapshot();
});

it('maps state to props - půlmaraton, startující, odstartováni', () => {
  const wrapper = shallow(
    <StartovniCislaProTypContainer
      jenStartujici={true}
      odstartovani={true}
      typ="půlmaraton"
      Renderer={jest.fn()}
      store={store}
    />
  );
  expect(wrapper.props().startovniCisla).toBeTruthy();
  expect(wrapper.props().startovniCisla).toMatchSnapshot();
});
