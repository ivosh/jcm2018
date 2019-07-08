import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import PokladnaContainer from './PokladnaContainer';
import Pokladna from './Pokladna';

const mockStore = configureStore();
const defaultState = { ...ucastniciTestData };

let component;
const setup = (state = defaultState) => {
  const store = mockStore(state);
  store.dispatch = jest.fn();
  const container = renderer.create(<PokladnaContainer store={store} />);
  component = container.root.findByType(Pokladna);
  expect(component).toBeTruthy();
};

beforeEach(() => setup());

it('maps state to props - default', () => {
  expect(component.props.pokladna).toMatchSnapshot();
});
