import React from 'react';
import renderer from 'react-test-renderer';
import Root from './Root';

jest.useFakeTimers();

// The component does some async work, so wait until it has finished.
it('renders', async done => {
  const component = renderer.create(<Root />);
  expect(component.toJSON()).toMatchSnapshot();
  done();
});
