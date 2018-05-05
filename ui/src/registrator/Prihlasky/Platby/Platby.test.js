import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../../entities/ucastnici/ucastniciTestData';
import Platby from './Platby';

const mockStore = configureStore();
const state = {
  ...ucastniciTestData,
  registrator: {
    prihlasky: {
      form: {
        prihlaska: {},
        platby: []
      },
      platby: {}
    }
  }
};
const store = mockStore(state);

const predepsano220 = {
  polozky: [{ castka: 200, duvod: 'předem' }, { castka: 20, duvod: 'záloha' }],
  suma: 220
};
const provedeno220 = {
  platby: [
    {
      castka: 200,
      datum: '10. 12. 2017',
      typ: 'převodem',
      poznamka: 'stále visí',
      onRemove: jest.fn()
    },
    { castka: 20, datum: '11. 12. 2017', typ: 'hotově', onRemove: jest.fn() }
  ],
  suma: 220
};
const provedeno0 = {
  platby: [],
  suma: 0
};

it('platby v plusu', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Platby
        novaPlatbaMinified={true}
        startIndex={10}
        predepsano={predepsano220}
        provedeno={provedeno220}
        inputRef={jest.fn()}
        onAdd={jest.fn()}
        onExpand={jest.fn()}
      />
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('platby v plusu, novaPlatba expanded', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Platby
        novaPlatbaMinified={false}
        startIndex={10}
        predepsano={predepsano220}
        provedeno={provedeno220}
        inputRef={jest.fn()}
        onAdd={jest.fn()}
        onExpand={jest.fn()}
      />
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('platby v mínusu', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Platby
        novaPlatbaMinified={false}
        startIndex={10}
        predepsano={predepsano220}
        provedeno={provedeno0}
        inputRef={jest.fn()}
        onAdd={jest.fn()}
        onExpand={jest.fn()}
      />
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
