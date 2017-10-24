import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ValidatedCislo from './ValidatedCislo';

const fakeOnCisloSubmitted = () => {};

it('žádní startující', () => {
  const startujici = [];

  const component = renderer.create(
    <ValidatedCislo startujici={startujici} onCisloSubmitted={fakeOnCisloSubmitted} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('dva startující na trase', () => {
  const startujici = [{ id: 4, cislo: 15, dokonceno: null }, { id: 5, cislo: 7, dokonceno: null }];

  const component = renderer.create(
    <ValidatedCislo startujici={startujici} onCisloSubmitted={fakeOnCisloSubmitted} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('jeden startující na trase a jeden dokončil', () => {
  const startujici = [{ id: 4, cislo: 15, dokonceno: null }, { id: 5, cislo: 7, dokonceno: null }];

  const wrapper = mount(
    <ValidatedCislo startujici={startujici} onCisloSubmitted={fakeOnCisloSubmitted} />
  );

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('div')).toHaveLength(1);
  expect(wrapper.find('div').hasClass('has-success')).toEqual(false);
  expect(wrapper.find('div').hasClass('has-error')).toEqual(false);

  wrapper.find('input').simulate('change', { target: { value: 1 } });
  expect(wrapper.find('div').hasClass('has-success')).toEqual(false);
  expect(wrapper.find('div').hasClass('has-error')).toEqual(true);

  wrapper.find('input').simulate('change', { target: { value: 15 } });
  expect(wrapper.find('div').hasClass('has-error')).toEqual(false);
  expect(wrapper.find('div').hasClass('has-success')).toEqual(true);
});
