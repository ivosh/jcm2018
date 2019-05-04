import React from 'react';
import renderer from 'react-test-renderer';
import Root from './Root';

describe('Root snapshot', () => {
  jest.useFakeTimers();

  it('renders the loading screen', async () => {
    const component = renderer.create(<Root />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
