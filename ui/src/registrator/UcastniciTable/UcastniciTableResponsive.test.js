import React from 'react';
import renderer from 'react-test-renderer';
import UcastniciTableResponsive from './UcastniciTableResponsive';

it('renders', () => {
  const component = renderer.create(
    <UcastniciTableResponsive columns={[]} data={[]} fixedColumnCount={0} rowHeight={30} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});
