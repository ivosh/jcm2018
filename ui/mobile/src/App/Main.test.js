import React from 'react';
import renderer from 'react-test-renderer';
import Main from './Main';

it('renders', () => {
  const component = renderer.create(<Main />);
  expect(component.toJSON()).toMatchSnapshot();
});
