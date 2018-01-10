import React from 'react';
import renderer from 'react-test-renderer';
import SignOut from './SignOut';

it('renders', () => {
  const history = { push: jest.fn() };
  const component = renderer.create(<SignOut history={history} signOut={jest.fn()} />);
  expect(component.toJSON()).toMatchSnapshot();
});
