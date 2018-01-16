import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Prihlaseni from './Prihlaseni';

it('při načítání', () => {
  const component = renderer.create(
    <Prihlaseni
      fetching={true}
      saving={false}
      existujiciUcastnik={false}
      fetchUcastnici={jest.fn()}
      onHideError={jest.fn()}
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
      saving={false}
      existujiciUcastnik={false}
      fetchUcastnici={jest.fn()}
      onHideError={jest.fn()}
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
      saving={false}
      existujiciUcastnik={true}
      fetchUcastnici={jest.fn()}
      onHideError={jest.fn()}
      onReset={jest.fn()}
      onSubmit={jest.fn()}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('formulář s existujícím účastníkem při ukládání', () => {
  const wrapper = shallow(
    <Prihlaseni
      fetching={false}
      saving={true}
      existujiciUcastnik={true}
      fetchUcastnici={jest.fn()}
      onHideError={jest.fn()}
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
      saving={false}
      existujiciUcastnik={true}
      fetchUcastnici={jest.fn()}
      onHideError={jest.fn()}
      onReset={jest.fn()}
      onSubmit={jest.fn()}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});
