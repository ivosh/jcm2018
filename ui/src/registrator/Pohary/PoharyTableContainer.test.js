import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { API_POHAR_PREDAN } from '../../common';
import { ActionPrefixes, ReduxNames } from '../../constants';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import { WS_API } from '../../store/wsAPI';
import { POHAR_NEPREVZATO, POHAR_PREDANO, POHAR_PREDAN } from './PoharyActions';
import PoharyTableContainer from './PoharyTableContainer';

const actionPrefix = ActionPrefixes.POHARY_PRED_STARTEM;
const mockStore = configureStore();
const reduxName = ReduxNames.poharyPredStartem;

let store;
let wrapper;
beforeEach(() => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      [reduxName]: {
        narokovanePrihlaskouFilter: true,
        narokovaneStartemFilter: false,
        neprevzateFilter: false,
        textFilter: ''
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(
    <PoharyTableContainer actionPrefix={actionPrefix} reduxName={reduxName} store={store} />
  );
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().narokovaneFilter).toBe(true);
  expect(wrapper.props().neprevzateFilter).toBe(false);
  expect(wrapper.props().popisek).toBeTruthy();
  expect(wrapper.props().textFilter).toEqual('');
  expect(wrapper.props().pohary).toBeTruthy();
  expect(wrapper.props().pohary).toMatchSnapshot();
  expect(wrapper.props().canDrop).toEqual(expect.any(Function));
});

it('maps onDrop to dispatch poharPredan action', () => {
  wrapper.props().onDrop({
    source: { type: POHAR_NEPREVZATO, id: 'ab57345309fc23' },
    destination: { type: POHAR_PREDANO }
  });

  expect(store.dispatch).toHaveBeenCalledWith({
    [WS_API]: {
      type: POHAR_PREDAN,
      endpoint: API_POHAR_PREDAN,
      normalize: expect.any(Function),
      request: {
        id: 'ab57345309fc23'
      },
      title: 'předávání poháru'
    }
  });
});

it('maps onNarokovaneFilterChange to dispatch narokovanePrihlaskouFilterChange action', () => {
  wrapper.props().onNarokovaneFilterChange();

  expect(store.dispatch).toHaveBeenCalledWith({
    type: `${actionPrefix}_NAROKOVANE_PRIHLASKOU_FILTER_CHANGE`
  });
});

it('maps onNeprevzateFilterChange to dispatch neprevzateFilterChange action', () => {
  wrapper.props().onNeprevzateFilterChange();

  expect(store.dispatch).toHaveBeenCalledWith({ type: `${actionPrefix}_NEPREVZATE_FILTER_CHANGE` });
});

it('maps onTextFilterChange to dispatch textFilterChange action', () => {
  wrapper.props().onTextFilterChange('Kl');

  expect(store.dispatch).toHaveBeenCalledWith({
    type: `${actionPrefix}_TEXT_FILTER_CHANGE`,
    textFilter: 'Kl'
  });
});
