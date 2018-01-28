import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../entities/ucastnici/ucastniciTestData';
import Prihlaseni from './Prihlaseni';

const mockStore = configureStore();
const state = {
  ...ucastniciTestData,
  registrator: {
    prihlaseni: {
      errorCode: '',
      errorMessage: '',
      showError: false,
      fetching: false,
      saved: false,
      saving: true,
      ucastnikId: '---id---',
      validateEmpty: false,
      udaje: { narozeni: {} },
      prihlaska: {},
      platby: [],
      novaPlatba: {}
    }
  }
};
const store = mockStore(state);

it('při načítání', () => {
  const component = renderer.create(
    <Prihlaseni
      fetching={true}
      saved={false}
      saving={false}
      existujiciUcastnik={false}
      fetchUcastnici={jest.fn()}
      onHideError={jest.fn()}
      onHideModal={jest.fn()}
      onReset={jest.fn()}
      onSubmit={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('prázdný formulář', () => {
  const wrapper = shallow(
    <Prihlaseni
      fetching={false}
      saved={false}
      saving={false}
      existujiciUcastnik={false}
      fetchUcastnici={jest.fn()}
      onHideError={jest.fn()}
      onHideModal={jest.fn()}
      onReset={jest.fn()}
      onSubmit={jest.fn()}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('formulář s existujícím účastníkem', () => {
  const wrapper = shallow(
    <Prihlaseni
      fetching={false}
      saved={false}
      saving={false}
      existujiciUcastnik={true}
      fetchUcastnici={jest.fn()}
      onHideError={jest.fn()}
      onHideModal={jest.fn()}
      onReset={jest.fn()}
      onSubmit={jest.fn()}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('formulář s chybou', () => {
  const wrapper = shallow(
    <Prihlaseni
      errorCode="chybový kód"
      errorMessage="Popisek chyby, která se stala."
      showError={true}
      fetching={false}
      saved={false}
      saving={false}
      existujiciUcastnik={true}
      fetchUcastnici={jest.fn()}
      onHideError={jest.fn()}
      onHideModal={jest.fn()}
      onReset={jest.fn()}
      onSubmit={jest.fn()}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('formulář po uložení', () => {
  const wrapper = shallow(
    <Prihlaseni
      errorCode="chybový kód"
      errorMessage="Popisek chyby, která se stala."
      showError={false}
      fetching={false}
      saved={true}
      saving={false}
      existujiciUcastnik={true}
      fetchUcastnici={jest.fn()}
      onHideError={jest.fn()}
      onHideModal={jest.fn()}
      onReset={jest.fn()}
      onSubmit={jest.fn()}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('handle succesfull form submit', () => {
  const onSubmit = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <Prihlaseni
        fetching={false}
        saved={false}
        saving={false}
        existujiciUcastnik={true}
        fetchUcastnici={jest.fn()}
        onHideError={jest.fn()}
        onHideModal={jest.fn()}
        onReset={jest.fn()}
        onSubmit={onSubmit}
      />
    </Provider>
  );
  expect(wrapper.find('form')).toHaveLength(1);

  wrapper.find('form').simulate('submit');
  expect(onSubmit).toHaveBeenCalled();
});

it('handle form reset', () => {
  const onReset = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <Prihlaseni
        fetching={false}
        saved={false}
        saving={false}
        existujiciUcastnik={true}
        fetchUcastnici={jest.fn()}
        onHideError={jest.fn()}
        onHideModal={jest.fn()}
        onReset={onReset}
        onSubmit={jest.fn()}
      />
    </Provider>
  );
  expect(wrapper.find('.btn-danger')).toHaveLength(1);

  wrapper.find('.btn-danger').simulate('click');
  expect(onReset).toHaveBeenCalled();
});
