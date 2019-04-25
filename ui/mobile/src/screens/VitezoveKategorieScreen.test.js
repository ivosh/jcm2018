import React from 'react';
import renderer from 'react-test-renderer';
import VitezoveKategorieScreen from './VitezoveKategorieScreen';

it('renders', () => {
  const component = renderer.create(<VitezoveKategorieScreen />);
  expect(component.toJSON()).toMatchSnapshot();
});
