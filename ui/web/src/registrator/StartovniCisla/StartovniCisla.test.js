import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import moment from 'moment';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import StartovniCislaProTyp from '../../shared/StartovniCislaProTyp/StartovniCislaProTyp';
import StartovniCisla, { Renderer } from './StartovniCisla';

it('renders StartovniCisla - přihlášeni', () => {
  const typy = ['maraton', 'půlmaraton', 'cyklo', 'koloběžka'];
  const wrapper = shallow(
    <StartovniCisla odstartovani={false} typy={typy} onOdstartovaniChange={jest.fn()} />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('renders StartovniCisla - odstartováni', () => {
  const typy = ['maraton', 'půlmaraton', 'cyklo', 'koloběžka'];
  const wrapper = shallow(
    <StartovniCisla odstartovani={true} typy={typy} onOdstartovaniChange={jest.fn()} />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('Renderer', () => {
  const startovniCisla = [
    {
      id: '10',
      startCislo: 7,
      dokonceno: true,
      duration: moment.duration('PT4H15M32.45S')
    }
  ];

  const component = renderer.create(
    <MemoryRouter>
      <StartovniCislaProTyp
        odstartovani={false}
        startovniCisla={startovniCisla}
        Renderer={Renderer}
      />
    </MemoryRouter>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
