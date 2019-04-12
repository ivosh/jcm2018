import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { ActionPrefixes, ReduxNames } from '../../constants';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import PoradiContainer from './PoradiContainer';

const actionPrefix = ActionPrefixes.PORADI;
const mockStore = configureStore();
const reduxName = ReduxNames.poradi;

const defaultState = {
  ...ucastniciTestData,
  registrator: {
    [reduxName]: {
      kategorieFilter: '',
      kategorieSubFilter: '',
      textFilter: ''
    }
  }
};

let store;
let wrapper;
const setup = (state = defaultState) => {
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(<PoradiContainer store={store} />);
};

beforeEach(() => setup());

it('maps state and dispatch to props - default', () => {
  expect(wrapper.props().actionPrefix).toEqual(actionPrefix);
  expect(wrapper.props().kategorieFilters).toMatchSnapshot();
  expect(wrapper.props().kategorieSubFilters).toEqual([]);
  expect(wrapper.props().kategorieSubFiltersVisible).toBe(false);
  expect(wrapper.props().poradi).toMatchSnapshot();
  expect(wrapper.props().reduxName).toEqual(reduxName);
  expect(wrapper.props().textFilter).toEqual('');
});

it('maps state and dispatch to props - non-default', () => {
  const state = {
    ...defaultState,
    registrator: {
      [reduxName]: {
        kategorieFilter: 'maraton',
        kategorieSubFilter: '5a587e1a051c181132cf83ba',
        textFilter: ''
      }
    }
  };
  setup(state);

  expect(wrapper.props().kategorieFilters).toMatchSnapshot();
  expect(wrapper.props().kategorieSubFilters).toMatchSnapshot();
  expect(wrapper.props().kategorieSubFiltersVisible).toBe(true);
  expect(wrapper.props().poradi).toMatchSnapshot();
  expect(wrapper.props().textFilter).toEqual('');
});

it('maps kategorieFilters[4].onClick() to dispatch kategorieFilterChange action', () => {
  wrapper.props().kategorieFilters[4].onClick();

  expect(store.dispatch).toHaveBeenCalledWith({
    type: `${actionPrefix}_KATEGORIE_FILTER_CHANGE`,
    typKategorie: 'pěší'
  });
});

it('maps kategorieSubFilters[1].onClick() to dispatch kategorieSubFilterChange action', () => {
  const state = {
    ...defaultState,
    registrator: {
      [reduxName]: {
        kategorieFilter: 'maraton',
        kategorieSubFilter: '',
        textFilter: ''
      }
    }
  };
  setup(state);
  wrapper.props().kategorieSubFilters[1].onClick();

  expect(store.dispatch).toHaveBeenCalledWith({
    type: `${actionPrefix}_KATEGORIE_SUB_FILTER_CHANGE`,
    kategorieSubFilter: '5a587e1a051c181132cf83ba'
  });
});

it('maps onTextFilterChange to dispatch textFilterChange action', () => {
  wrapper.props().onTextFilterChange('Kl');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: `${actionPrefix}_TEXT_FILTER_CHANGE`,
    textFilter: 'Kl'
  });
});
