import React from 'react';
import renderer from 'react-test-renderer';
import Settings from './Settings';

it('renders', () => {
  const component = renderer.create(<Settings connected={true} />);
  expect(component.toJSON()).toMatchSnapshot();
});
