import React from 'react';
import renderer from 'react-test-renderer';
import StartCisloBox from './StartCisloBox';

it('test', () => {
  const component = renderer.create(<StartCisloBox cislo={15} />);
  expect(component.toJSON()).toMatchSnapshot();
});
