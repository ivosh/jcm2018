import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import moment from 'moment';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import StartujiciProTyp from '../../shared/StartujiciProTyp/StartujiciProTyp';
import Startujici, { Legenda, Renderer } from './Startujici';

it('renders Startujici', () => {
  const typy = ['maraton', 'půlmaraton', 'cyklo', 'koloběžka'];
  const wrapper = shallow(<Startujici typy={typy} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('renders Legenda', () => {
  const component = renderer.create(<Legenda />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('Renderer', () => {
  const startujici = [
    {
      id: '10',
      startCislo: 7,
      dokonceno: true,
      duration: moment.duration('PT4H15M32.45S')
    }
  ];

  const component = renderer.create(
    <MemoryRouter>
      <StartujiciProTyp startujici={startujici} renderer={Renderer} />
    </MemoryRouter>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
