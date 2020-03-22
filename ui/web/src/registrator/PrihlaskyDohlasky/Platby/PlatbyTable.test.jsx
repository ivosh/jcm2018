import React from 'react';
import renderer from 'react-test-renderer';
import PlatbyTable from './PlatbyTable';

const platby = [
  {
    castka: 200,
    datum: '10. 12. 2017',
    typ: 'převodem',
    poznamka: 'stále visí',
    onRemove: jest.fn(),
  },
  { castka: 20, datum: '11. 12. 2017', typ: 'hotově', onRemove: jest.fn() },
];

it('dvě platby', () => {
  const component = renderer.create(<PlatbyTable platby={platby} onRemove={jest.fn()} />);
  expect(component.toJSON()).toMatchSnapshot();
});
