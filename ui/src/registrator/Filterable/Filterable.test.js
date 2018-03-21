import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Filterable from './Filterable';

it('renders', () => {
  const component = renderer.create(
    <Filterable
      numberOfItems={0}
      onKategorieFilterChange={jest.fn()}
      onTextFilterChange={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('maps KategorieFilter.onClick to dispatch onKategorieFilterChange action', () => {
  const onKategorieFilterChange = jest.fn();
  const wrapper = mount(
    <Filterable
      numberOfItems={2}
      onKategorieFilterChange={onKategorieFilterChange}
      onTextFilterChange={jest.fn()}
    />
  );
  expect(wrapper.find('button')).toHaveLength(5);
  wrapper
    .find('button')
    .first()
    .simulate('click');

  expect(onKategorieFilterChange).toHaveBeenCalledWith('maraton');
});
