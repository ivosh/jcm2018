import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Startujici, { Legenda } from './Startujici';

it('renders Startujici', () => {
  const typy = ['maraton', 'půlmaraton', 'cyklo', 'koloběžka'];
  const wrapper = shallow(<Startujici typy={typy} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('renders Legenda', () => {
  const component = renderer.create(<Legenda />);
  expect(component.toJSON()).toMatchSnapshot();
});
