import React from 'react';
import renderer from 'react-test-renderer';
import Root from './Root';

jest.useFakeTimers();

it('renders', async () => {
  const component = renderer.create(<Root />);
  expect(component.toJSON()).toMatchSnapshot();
});
