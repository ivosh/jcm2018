import React from 'react';
import renderer from 'react-test-renderer';
import LoadingIndicator from './LoadingIndicator';

it('renders', () => {
  const component = renderer.create(<LoadingIndicator />);
  expect(component.toJSON()).toMatchSnapshot();
});
