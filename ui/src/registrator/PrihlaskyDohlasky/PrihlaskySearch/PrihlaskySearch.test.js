import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import PrihlaskySearch from './PrihlaskySearch';

const options = [
  { id: '===id1===', prijmeni: 'Hudec', jmeno: 'Jiří', narozeni: { rok: 1956 }, kod: '===kod1===' },
  { id: '===id2===', prijmeni: 'Suchá', jmeno: 'Jana', narozeni: { rok: 1967 }, kod: '===kod2===' },
  { id: '===id3===', prijmeni: 'Kryl', jmeno: 'Jan', narozeni: { rok: 2001 } }
];

it('renders', () => {
  const component = renderer.create(
    <PrihlaskySearch options={options} onChange={jest.fn()} onSelect={jest.fn()} />
  );

  // Typeahead component contains dynamic 'aria-owns' prop. This destroys snapshot testing.
  const json = component.toJSON();
  const input = json.children[0].children[0].children[0].children[0];
  expect(input.type).toEqual('input');
  expect(input.props['aria-owns']).toEqual(expect.stringContaining('rbt-menu-'));
  input.props['aria-owns'] = 'rbt-menu-*';
  expect(json).toMatchSnapshot();
});

it('handle select', () => {
  const onSelect = jest.fn();

  const wrapper = mount(
    <PrihlaskySearch options={options} onChange={jest.fn()} onSelect={onSelect} />
  );
  expect(wrapper.find('.rbt-input-main')).toHaveLength(1);

  wrapper.find('.rbt-input-main').simulate('change', { target: { value: 'hu' } });
  wrapper.find('.rbt-input-main').simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 });
  expect(onSelect).toHaveBeenCalledWith(options[0]);
});
