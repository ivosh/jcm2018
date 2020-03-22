import React from 'react';
import renderer from 'react-test-renderer';
import VitezoveFilters from './VitezoveFilters';

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
    <VitezoveFilters
      kategorieFilters={kategorieFilters}
      kategorieSubFilters={[]}
      kategorieSubFiltersVisible={false}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders kategorie subFilters', () => {
  const component = renderer.create(
    <VitezoveFilters
      kategorieFilters={[kategorieFilters[0]]}
      kategorieSubFilters={kategorieSubFilters}
      kategorieSubFiltersVisible={true}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});
