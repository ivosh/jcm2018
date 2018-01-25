import React from 'react';
import renderer from 'react-test-renderer';
import LoadingButton from './LoadingButton';

it('renders - not loading', () => {
  const component = renderer.create(<LoadingButton text="čudl" />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders - loading', () => {
  const component = renderer.create(<LoadingButton loading={true} text="čudl" />);
  expect(component.toJSON()).toMatchSnapshot();
});
