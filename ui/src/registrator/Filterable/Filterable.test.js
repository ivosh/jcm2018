import React from 'react';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Filterable from './Filterable';

jest.useFakeTimers();

it('renders', () => {
  const wrapper = shallow(
    <Filterable
      numberOfItems={0}
      onKategorieVykonuFilterChange={jest.fn()}
      onTextFilterChange={jest.fn()}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('maps DebounceInput.onChange to dispatch onTextFilterChange action', () => {
  const onTextFilterChange = jest.fn();
  const wrapper = shallow(
    <Filterable
      numberOfItems={1}
      onKategorieVykonuFilterChange={jest.fn()}
      onTextFilterChange={onTextFilterChange}
    />
  );
  expect(wrapper.find('.Filterable_input')).toHaveLength(1);
  wrapper.find('.Filterable_input').simulate('change', { target: { value: 'K' } });

  jest.runAllTimers();
  expect(onTextFilterChange).toHaveBeenCalledWith('K');
});

it('maps KategorieVykonuFilter.onClick to dispatch onKategorieVykonuFilterChange action', () => {
  const onKategorieVykonuFilterChange = jest.fn();
  const wrapper = mount(
    <Filterable
      numberOfItems={2}
      onKategorieVykonuFilterChange={onKategorieVykonuFilterChange}
      onTextFilterChange={jest.fn()}
    />
  );
  expect(wrapper.find('button')).toHaveLength(5);
  wrapper
    .find('button')
    .first()
    .simulate('click');

  expect(onKategorieVykonuFilterChange).toHaveBeenCalledWith('maraton');
});
