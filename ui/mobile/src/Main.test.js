import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Main from './Main';

describe('Main snapshot', () => {
  jest.useFakeTimers();

  it('renders the loading screen', async () => {
    const tree = renderer.create(<Main />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the root without loading screen', async () => {
    const tree = renderer.create(<Main skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
