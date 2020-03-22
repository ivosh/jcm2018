import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import VitezoveContainer from './VitezoveContainer';
import Vitezove from './Vitezove';

const mockStore = configureStore();

const defaultState = {
  ...ucastniciTestData,
  registrator: {
    vitezove: {
      kategorieFilter: '',
      kategorieSubFilter: '',
      textFilter: '',
    },
  },
};

let store;
let component;
const setup = (state = defaultState) => {
  store = mockStore(state);
  store.dispatch = jest.fn();
  const container = renderer.create(<VitezoveContainer store={store} />);
  component = container.root.findByType(Vitezove);
  expect(component).toBeTruthy();
};

beforeEach(() => setup());

it('maps state and dispatch to props - default', () => {
  expect(component.props.kategorieFilters).toMatchSnapshot();
  expect(component.props.kategorieSubFilters).toEqual([]);
  expect(component.props.kategorieSubFiltersVisible).toBe(false);
  expect(component.props.vitezove).toMatchSnapshot();
});

it('maps state and dispatch to props - non-default', () => {
  const state = {
    ...defaultState,
    registrator: {
      vitezove: {
        kategorieFilter: 'maraton',
        kategorieSubFilter: '5a587e1a051c181132cf83ba',
      },
    },
  };
  setup(state);

  expect(component.props.kategorieFilters).toMatchSnapshot();
  expect(component.props.kategorieSubFilters).toMatchSnapshot();
  expect(component.props.kategorieSubFiltersVisible).toBe(true);
  expect(component.props.vitezove).toMatchSnapshot();
});

it('maps kategorieFilters[4].onClick() to dispatch kategorieFilterChange action', async () => {
  await component.props.kategorieFilters[3].onClick();

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'VITEZOVE_KATEGORIE_FILTER_CHANGE',
    kategorieFilter: 'koloběžka',
  });
});

it('maps kategorieSubFilters[1].onClick() to dispatch kategorieSubFilterChange action', async () => {
  const state = {
    ...defaultState,
    registrator: {
      vitezove: {
        kategorieFilter: 'maraton',
        kategorieSubFilter: '',
        textFilter: '',
      },
    },
  };
  setup(state);
  await component.props.kategorieSubFilters[1].onClick();

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'VITEZOVE_KATEGORIE_SUB_FILTER_CHANGE',
    kategorieSubFilter: '5a587e1a051c181132cf83ba',
  });
});
