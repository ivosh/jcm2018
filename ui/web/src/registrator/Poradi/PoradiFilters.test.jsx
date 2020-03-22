import React from 'react';
import renderer from 'react-test-renderer';
import PoradiFilters from './PoradiFilters';

const kategorieFilters = [
  { active: true, typ: 'maraton', onClick: jest.fn() },
  { typ: 'cyklo', onClick: jest.fn() },
];
const kategorieSubFilters = [
  { id: '1', active: true, typ: 'maraton', zkratka: '1M', onClick: jest.fn() },
  { id: '2', typ: 'maraton', zkratka: '2M', onClick: jest.fn() },
  { id: '3', typ: 'maraton', zkratka: '3M', onClick: jest.fn() },
];

it('renders kategorie filters', () => {
  const component = renderer.create(
    <PoradiFilters
      kategorieFilters={kategorieFilters}
      kategorieSubFilters={[]}
      kategorieSubFiltersVisible={false}
      numberOfItems={10}
      textFilter=""
      onTextFilterChange={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders kategorie subFilters', () => {
  const component = renderer.create(
    <PoradiFilters
      kategorieFilters={[kategorieFilters[0]]}
      kategorieSubFilters={kategorieSubFilters}
      kategorieSubFiltersVisible={true}
      numberOfItems={2}
      textFilter=""
      onTextFilterChange={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});
