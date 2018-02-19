import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../../entities/ucastnici/ucastniciTestData';
import PlatbyContainer from './PlatbyContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          validatePlatba: false,
          prihlaska: { typ: 'cyklo' },
          platby: [
            {
              castka: 200,
              datum: '2018-05-01T00:00:00.000Z',
              typ: 'převodem',
              poznamka: 'stále visí'
            },
            { castka: 20, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }
          ],
          novaPlatba: {
            castka: 150,
            datum: 'rozepsáno',
            typ: 'složenkou',
            poznamka: undefined
          }
        }
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<PlatbyContainer startIndex={10} store={store} inputRef={jest.fn()} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().predepsano).toMatchSnapshot();
  expect(wrapper.props().provedeno).toMatchSnapshot();
});

it('maps onAdd to dispatch addValidatedPlatba', () => {
  wrapper.props().onAdd();

  expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
});

it('maps provedeno.platby[0].onRemove to dispatch removePlatba action', () => {
  wrapper.props().provedeno.platby[0].onRemove();

  expect(store.dispatch).toHaveBeenCalledWith({ type: 'PRIHLASKY_REMOVE_PLATBA', idx: 0 });
});
