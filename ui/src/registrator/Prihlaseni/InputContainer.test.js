import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import InputContainer from './InputContainer';
import TextInput from './TextInput';

const mockStore = configureStore();

let store;
let wrapper;
beforeEach(() => {
  const state = {
    registrator: {
      prihlaseni: {
        udaje: {
          jmeno: 'Klára'
        }
      }
    }
  };
  store = mockStore(state);
  store.dispatch = jest.fn();
  wrapper = shallow(
    <InputContainer name="udaje.jmeno" popisek="jméno" type={TextInput} store={store} />
  );
});

it('maps state and dispatch to props', () => {
  expect(wrapper.props().name).toEqual('udaje.jmeno');
  expect(wrapper.props().popisek).toEqual('jméno');
  expect(wrapper.props().value).toEqual('Klára');
  expect(wrapper.props().validationState).toEqual('success');
  expect(wrapper.props().onChange).toEqual(expect.any(Function));
});

it('maps onChange to dispatch inputChanged', () => {
  wrapper.props().onChange({ target: { value: 'Bára' } });

  expect(store.dispatch).toHaveBeenCalledWith({
    type: 'PRIHLASENI_INPUT_CHANGED',
    name: 'udaje.jmeno',
    value: 'Bára'
  });
});
