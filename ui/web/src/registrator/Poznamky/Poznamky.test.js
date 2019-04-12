import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Poznamky from './Poznamky';

const poznamky = [
  {
    datum: new Date('2019-05-24T06:13:53.000Z'),
    lines: 1,
    text: 'text poznámky',
    deletePoznamka: jest.fn(),
    modifyPoznamka: jest.fn()
  },
  {
    datum: new Date('2019-06-08T08:13:15.000Z'),
    lines: 3,
    text: 'jedna\r\ntrochu delší\r\npoznámka',
    deletePoznamka: jest.fn(),
    modifyPoznamka: jest.fn()
  }
];

it('žádná poznámka', () => {
  const component = renderer.create(<Poznamky poznamky={[]} addPoznamka={jest.fn()} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('dvě poznámky', () => {
  const component = renderer.create(<Poznamky poznamky={poznamky} addPoznamka={jest.fn()} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('handle add', async () => {
  const addPoznamka = jest.fn();
  let component;
  act(() => {
    component = renderer.create(<Poznamky poznamky={poznamky} addPoznamka={addPoznamka} />);
  });

  await act(async () => {
    await component.root.findByType('button').props.onClick();
  });

  expect(addPoznamka).toHaveBeenCalledTimes(1);
});
