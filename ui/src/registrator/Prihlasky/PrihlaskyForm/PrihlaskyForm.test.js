import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import ucastniciTestData from '../../../entities/ucastnici/ucastniciTestData';
import PrihlaskyForm from './PrihlaskyForm';

const mockStore = configureStore();
const state = {
  ...ucastniciTestData,
  registrator: {
    prihlasky: {
      form: {
        errorCode: '',
        errorMessage: '',
        showError: false,
        saved: false,
        saving: true,
        ucastnikId: '---id---',
        validateForm: false,
        udaje: { narozeni: {} },
        prihlaska: {},
        platby: [],
        novaPlatba: {}
      }
    }
  }
};
const store = mockStore(state);

it('prázdný formulář', () => {
  const wrapper = shallow(
    <PrihlaskyForm
      saved={false}
      saving={false}
      existujiciUcastnik={false}
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
    <PrihlaskyForm
      saved={false}
      saving={false}
      existujiciUcastnik={true}
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
    <PrihlaskyForm
      errorCode="chybový kód"
      errorMessage="Popisek chyby, která se stala."
      showError={true}
      saved={false}
      saving={false}
      existujiciUcastnik={true}
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
    <PrihlaskyForm
      errorCode="chybový kód"
      errorMessage="Popisek chyby, která se stala."
      showError={false}
      saved={true}
      saving={false}
      existujiciUcastnik={true}
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
      <PrihlaskyForm
        saved={false}
        saving={false}
        existujiciUcastnik={true}
        onHideError={jest.fn()}
        onHideModal={jest.fn()}
        onReset={jest.fn()}
        onSubmit={onSubmit}
      />
    </Provider>
  );
  expect(wrapper.find('form')).toHaveLength(1);

  wrapper.find('form').simulate('submit');
  expect(onSubmit).toHaveBeenCalledWith();
});

it('handle form reset', () => {
  const onReset = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <PrihlaskyForm
        saved={false}
        saving={false}
        existujiciUcastnik={true}
        onHideError={jest.fn()}
        onHideModal={jest.fn()}
        onReset={onReset}
        onSubmit={jest.fn()}
      />
    </Provider>
  );
  expect(wrapper.find('.btn-danger')).toHaveLength(1);

  wrapper.find('.btn-danger').simulate('click');
  expect(onReset).toHaveBeenCalledWith();
});

it('handle Enter key and move focus', () => {
  const wrapper = mount(
    <Provider store={store}>
      <PrihlaskyForm
        saved={false}
        saving={false}
        existujiciUcastnik={true}
        onHideError={jest.fn()}
        onHideModal={jest.fn()}
        onReset={jest.fn()}
        onSubmit={jest.fn()}
      />
    </Provider>
  );

  expect(wrapper.find({ id: 'udaje.jmeno' })).toHaveLength(1);
  const focus = jest.fn();
  wrapper.find({ id: 'udaje.jmeno' }).instance().focus = focus;

  expect(wrapper.find(PrihlaskyForm)).toHaveLength(1);
  wrapper
    .find(PrihlaskyForm)
    .instance()
    .handleKeyPress({ event: { which: 13, preventDefault: jest.fn() }, index: 0 });
  expect(focus).toHaveBeenCalledWith();
});

it('handle Enter key and move focus from last to first', () => {
  const wrapper = mount(
    <Provider store={store}>
      <PrihlaskyForm
        saved={false}
        saving={false}
        existujiciUcastnik={true}
        onHideError={jest.fn()}
        onHideModal={jest.fn()}
        onReset={jest.fn()}
        onSubmit={jest.fn()}
      />
    </Provider>
  );

  expect(wrapper.find({ id: 'udaje.prijmeni' })).toHaveLength(1);
  const focus = jest.fn();
  wrapper.find({ id: 'udaje.prijmeni' }).instance().focus = focus;

  expect(wrapper.find(PrihlaskyForm)).toHaveLength(1);
  wrapper
    .find(PrihlaskyForm)
    .instance()
    .handleKeyPress({ event: { which: 13, preventDefault: jest.fn() }, index: 18 });
  expect(focus).toHaveBeenCalledWith();
});
