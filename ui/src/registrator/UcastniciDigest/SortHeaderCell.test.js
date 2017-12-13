import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { SortDirTypes } from './ucastniciDigestReducer';
import SortHeaderCell from './SortHeaderCell';

it('renders the default', () => {
  const component = renderer.create(
    <SortHeaderCell onSortDirChange={jest.fn()} sortDir={SortDirTypes.NONE}>
      příjmení
    </SortHeaderCell>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders jméno sestupně', () => {
  const component = renderer.create(
    <SortHeaderCell onSortDirChange={jest.fn()} sortDir={SortDirTypes.DESC}>
      jméno
    </SortHeaderCell>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('maps onClick to dispatch onSortDirChange action', () => {
  const onSortDirChange = jest.fn();
  const wrapper = mount(
    <SortHeaderCell onSortDirChange={onSortDirChange} sortDir={SortDirTypes.ASC}>
      jméno
    </SortHeaderCell>
  );
  expect(wrapper.find('a')).toHaveLength(1);
  wrapper.find('a').simulate('click');

  expect(onSortDirChange).toHaveBeenCalled();
});
