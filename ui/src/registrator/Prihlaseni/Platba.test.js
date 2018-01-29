import React from 'react';
import renderer from 'react-test-renderer';
import Platba from './Platba';

it('renders', () => {
  const platba = { castka: 200, datum: '10. 12. 2017', typ: 'převodem', poznamka: 'stále visí' };
  const component = renderer.create(<Platba platba={platba} onClick={jest.fn} />);
  expect(component.toJSON()).toMatchSnapshot();
});
