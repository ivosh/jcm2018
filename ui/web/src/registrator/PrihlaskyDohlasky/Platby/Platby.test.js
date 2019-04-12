import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../../entities/ucastnici/ucastniciTestData';
import Platby from './Platby';

const mockStore = configureStore();
const actionPrefix = 'PRIHLASKY_YYY';
const reduxName = 'prihlasky_yyy';

const state = {
  ...ucastniciTestData,
  registrator: {
    [reduxName]: {
      form: {
        udaje: {},
        prihlaska: {},
        platby: []
      },
      platby: {}
    }
  }
};
const store = mockStore(state);

const predepsano270 = {
  polozky: [{ castka: 250, duvod: 'na místě' }, { castka: 20, duvod: 'záloha' }],
  suma: 270
};
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
        actionPrefix={actionPrefix}
        novaPlatbaMinified={true}
        predepsano={predepsano220}
        provedeno={provedeno220}
        reduxName={reduxName}
        startIndex={10}
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
        actionPrefix={actionPrefix}
        novaPlatbaMinified={false}
        predepsano={predepsano220}
        provedeno={provedeno220}
        reduxName={reduxName}
        startIndex={10}
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
        actionPrefix={actionPrefix}
        novaPlatbaMinified={false}
        predepsano={predepsano220}
        provedeno={provedeno0}
        reduxName={reduxName}
        startIndex={10}
        inputRef={jest.fn()}
        onAdd={jest.fn()}
        onExpand={jest.fn()}
      />
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('platby částečně v mínusu', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Platby
        actionPrefix={actionPrefix}
        novaPlatbaMinified={false}
        predepsano={predepsano270}
        provedeno={provedeno220}
        reduxName={reduxName}
        startIndex={10}
        inputRef={jest.fn()}
        onAdd={jest.fn()}
        onExpand={jest.fn()}
      />
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
