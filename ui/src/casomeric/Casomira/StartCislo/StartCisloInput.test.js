import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import StartCisloInput from './StartCisloInput';

it('žádní startující', () => {
  const startujici = [];

  const component = renderer.create(
    <StartCisloInput startujici={startujici} onCisloSubmitted={jest.fn()} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('dva startující na trase', () => {
  const startujici = [{ id: 4, cislo: 15, dokonceno: null }, { id: 5, cislo: 7, dokonceno: null }];

  const component = renderer.create(
    <StartCisloInput startujici={startujici} onCisloSubmitted={jest.fn()} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('jeden startující na trase a jeden dokončil', () => {
  const startujici = [{ id: 4, cislo: 15, dokonceno: null }, { id: 5, cislo: 7, dokonceno: null }];

  const wrapper = mount(<StartCisloInput startujici={startujici} onCisloSubmitted={jest.fn()} />);

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('div')).toHaveLength(1);
  expect(wrapper.find('div').hasClass('has-success')).toEqual(false);
  expect(wrapper.find('div').hasClass('has-error')).toEqual(false);
  expect(wrapper.find('div').hasClass('has-warning')).toEqual(false);

  wrapper.find('input').simulate('change', { target: { value: 1 } });
  expect(wrapper.find('div').hasClass('has-error')).toEqual(true);
  expect(wrapper.find('div').hasClass('has-success')).toEqual(false);
  expect(wrapper.find('div').hasClass('has-warning')).toEqual(false);

  wrapper.find('input').simulate('change', { target: { value: 15 } });
  expect(wrapper.find('div').hasClass('has-success')).toEqual(true);
  expect(wrapper.find('div').hasClass('has-error')).toEqual(false);
  expect(wrapper.find('div').hasClass('has-warning')).toEqual(false);
});

it('špatný vstup', () => {
  const startujici = [{ id: 4, cislo: 15, dokonceno: false }, { id: 5, cislo: 7, dokonceno: null }];

  const wrapper = mount(<StartCisloInput startujici={startujici} onCisloSubmitted={jest.fn()} />);
  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('div')).toHaveLength(1);

  wrapper.find('input').simulate('change', { target: { value: 'huhu' } });
  expect(wrapper.find('div').hasClass('has-error')).toEqual(true);
  expect(wrapper.find('div').hasClass('has-success')).toEqual(false);
  expect(wrapper.find('div').hasClass('has-warning')).toEqual(false);

  wrapper.find('input').simulate('change', { target: { value: 15 } });
  expect(wrapper.find('div').hasClass('has-warning')).toEqual(true);
  expect(wrapper.find('div').hasClass('has-error')).toEqual(false);
  expect(wrapper.find('div').hasClass('has-success')).toEqual(false);
});

it('handle succesfull form submit', () => {
  const startujici = [{ id: 4, cislo: 15, dokonceno: null }, { id: 5, cislo: 7, dokonceno: null }];

  const onCisloSubmitted = jest.fn();
  const wrapper = mount(
    <StartCisloInput startujici={startujici} onCisloSubmitted={onCisloSubmitted} />
  );
  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('form')).toHaveLength(1);

  wrapper.find('input').simulate('change', { target: { value: 15 } });
  expect(wrapper.find('div').hasClass('has-success')).toEqual(true);
  wrapper.find('form').simulate('submit');
  expect(onCisloSubmitted).toHaveBeenCalledWith(4);
});

it('unsuccesfull form submit is not handled', () => {
  const startujici = [{ id: 4, cislo: 15, dokonceno: null }, { id: 5, cislo: 7, dokonceno: null }];

  const onCisloSubmitted = jest.fn();
  const wrapper = mount(
    <StartCisloInput startujici={startujici} onCisloSubmitted={onCisloSubmitted} />
  );
  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('form')).toHaveLength(1);

  wrapper.find('input').simulate('change', { target: { value: 8 } });
  expect(wrapper.find('div').hasClass('has-error')).toEqual(true);
  wrapper.find('form').simulate('submit');
  expect(onCisloSubmitted).not.toHaveBeenCalled();
});
