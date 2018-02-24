import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../../entities/ucastnici/ucastniciTestData';
import InputContainer from './InputContainer';
import TextInput from './TextInput';

const mockStore = configureStore();

const inputRef = jest.fn();
let store;
let wrapper;
beforeEach(() => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          udaje: {
            jmeno: 'Klára'
          }
        }
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(
    <InputContainer
      index={1}
      name="udaje.jmeno"
      popisek="jméno"
      type={TextInput}
      store={store}
      inputRef={inputRef}
    />
  );
});

it('maps state and dispatch to props - jmeno', () => {
  expect(wrapper.props().name).toEqual('udaje.jmeno');
  expect(wrapper.props().popisek).toEqual('jméno');
  expect(wrapper.props().value).toEqual('Klára');
  expect(wrapper.props().validationState).toEqual('success');
  expect(wrapper.props().inputRef).toEqual(expect.any(Function));
  expect(wrapper.props().onChange).toEqual(expect.any(Function));
});

it('maps onChange to dispatch inputChanged', () => {
  wrapper.props().onChange({ target: { value: 'Bára' } });

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'PRIHLASKY_INPUT_CHANGED',
    name: 'udaje.jmeno',
    value: 'Bára'
  });
});

it('maps inputRef to dispatch inputRef with index', () => {
  wrapper.props().inputRef({ ref: 'ref' });

  expect(inputRef).toHaveBeenCalledWith(1, { ref: 'ref' });
});

it('maps state to props - narození - jen rok', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          validateForm: false,
          udaje: {
            narozeni: { den: undefined, mesic: undefined, rok: 1981 }
          }
        }
      }
    }
  };
  store = mockStore(state);
  wrapper = shallow(
    <InputContainer
      index={0}
      name="udaje.narozeni"
      popisek="narození"
      type={TextInput}
      store={store}
      inputRef={jest.fn()}
    />
  );

  expect(wrapper.props().name).toEqual('udaje.narozeni');
  expect(wrapper.props().popisek).toEqual('narození');
  expect(wrapper.props().value).toEqual('1981');
  expect(wrapper.props().validationState).toEqual('warning');
});

it('maps state to props - narození - celé', () => {
  const state = {
    ...ucastniciTestData,
    registrator: {
      prihlasky: {
        form: {
          validateForm: false,
          udaje: {
            narozeni: { den: 1, mesic: 6, rok: 1981 }
          }
        }
      }
    }
  };
  store = mockStore(state);
  wrapper = shallow(
    <InputContainer
      index={1}
      name="udaje.narozeni"
      popisek="narození"
      type={TextInput}
      store={store}
      inputRef={jest.fn()}
    />
  );

  expect(wrapper.props().name).toEqual('udaje.narozeni');
  expect(wrapper.props().popisek).toEqual('narození');
  expect(wrapper.props().value).toEqual('1. 6. 1981');
  expect(wrapper.props().validationState).toEqual('success');
});
