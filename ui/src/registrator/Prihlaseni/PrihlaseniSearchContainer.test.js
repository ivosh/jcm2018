import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import PrihlaseniSearchContainer from './PrihlaseniSearchContainer';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlaseni: {
        udaje: {
          prijmeni: 'Bala'
        }
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<PrihlaseniSearchContainer store={store} />);
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().options).toMatchSnapshot();
  expect(wrapper.props().onChange).toEqual(expect.any(Function));
  expect(wrapper.props().onSelect).toEqual(expect.any(Function));
});

it('maps onChange to dispatch inputChanged action', () => {
  wrapper.props().onChange('hu');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'PRIHLASENI_INPUT_CHANGED',
    name: 'udaje.prijmeni',
    value: 'hu'
  });
});

it('maps onSelect to dispatch ucastnikSelected action - existující přihláška', () => {
  wrapper.props().onSelect({ id: '5a09b1fd371dec1e99b7e1c9' });

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'PRIHLASENI_UCASTNIK_SELECTED',
    id: '5a09b1fd371dec1e99b7e1c9',
    udaje: {
      jmeno: 'Roman',
      narozeni: { rok: 1956 },
      obec: 'Ostrava 2',
      pohlavi: 'muž',
      prijmeni: 'Balabák',
      stat: 'Česká republika'
    },
    prihlaska: {
      datum: '2018-06-09T00:00:00.000Z',
      kategorie: '5a587e1b051c181132cf83d7',
      typ: 'půlmaraton',
      startCislo: 17,
      kod: '10728864'
    },
    platby: [{ castka: 250, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }]
  });
});

it('maps onSelect to dispatch ucastnikSelected action - starší účast', () => {
  wrapper.props().onSelect({ id: '6f09b1fd371dec1e99b7e1c9' });

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'PRIHLASENI_UCASTNIK_SELECTED',
    id: '6f09b1fd371dec1e99b7e1c9',
    udaje: {
      prijmeni: 'Sukdoláková',
      jmeno: 'Martina',
      narozeni: { rok: 1963, mesic: 12, den: 7 },
      pohlavi: 'žena',
      obec: 'Zlín',
      stat: 'Česká republika'
    }
  });
});
