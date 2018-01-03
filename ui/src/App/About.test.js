import React from 'react';
import renderer from 'react-test-renderer';
import About from './About';

it('it renders', () => {
  const component = renderer.create(<About />);
  expect(component.toJSON()).toMatchSnapshot();
});
