import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import PrihlaseniSearch from './PrihlaseniSearch';

const options = [
  { id: '===id1===', prijmeni: 'Hudec', jmeno: 'Jiří', narozeni: { rok: 1956 }, kod: '===kod1===' },
  { id: '===id2===', prijmeni: 'Suchá', jmeno: 'Jana', narozeni: { rok: 1967 }, kod: '===kod2===' },
  { id: '===id3===', prijmeni: 'Kryl', jmeno: 'Jan', narozeni: { rok: 2001 } }
];

it('renders', () => {
  const component = renderer.create(
    <PrihlaseniSearch options={options} onChange={jest.fn()} onSelect={jest.fn()} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('handle input change', () => {
  const onChange = jest.fn();

  const wrapper = mount(
    <PrihlaseniSearch options={options} onChange={onChange} onSelect={jest.fn()} />
  );
  expect(wrapper.find('.rbt-input-main')).toHaveLength(1);

  wrapper.find('.rbt-input-main').simulate('change', { target: { value: 'hu' } });
  expect(onChange).toHaveBeenCalledWith('hu');
});

it('handle select', () => {
  const onSelect = jest.fn();

  const wrapper = mount(
    <PrihlaseniSearch options={options} onChange={jest.fn()} onSelect={onSelect} />
  );
  expect(wrapper.find('.rbt-input-main')).toHaveLength(1);

  wrapper.find('.rbt-input-main').simulate('change', { target: { value: 'hu' } });
  wrapper.find('.rbt-input-main').simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 });
  expect(onSelect).toHaveBeenCalledWith(options[0]);
});
