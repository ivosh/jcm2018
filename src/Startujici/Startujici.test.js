import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import Startujici from './Startujici';

it('žádný startující', () => {
  const component = renderer.create(<Startujici startujici={[]} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('jeden startující', () => {
  const startujici = [
    { id: 0, cislo: 1, dokonceno: null },
    { id: 1, cislo: 3, dokonceno: null },
    { id: 10, cislo: 7, dokonceno: true, duration: moment.duration('PT4H15M32.45S') },
    { id: 2, cislo: 25, dokonceno: false }
  ];

  const component = renderer.create(<Startujici startujici={startujici} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('třináct startujících', () => {
  const startujici = [
    { id: 0, cislo: 7, dokonceno: null },
    { id: 1, cislo: 4, dokonceno: null },
    { id: 10, cislo: 16, dokonceno: true, duration: moment.duration('PT4H15M32.45S') },
    { id: 2, cislo: 25, dokonceno: false },
    { id: 3, cislo: 9, dokonceno: true, duration: moment.duration('PT2H17M29.14S') },
    { id: 12, cislo: 15, dokonceno: true, duration: moment.duration('PT3H59M59.01S') },
    { id: 9, cislo: 1, dokonceno: false },
    { id: 29, cislo: 8, dokonceno: null },
    { id: 5, cislo: 59, dokonceno: null },
    { id: 11, cislo: 43, dokonceno: null },
    { id: 18, cislo: 42, dokonceno: false },
    { id: 10, cislo: 33, dokonceno: true, duration: moment.duration('PT3H30M22.45S') },
    { id: 7, cislo: 21, dokonceno: false },
    { id: 13, cislo: 24, dokonceno: true, duration: moment.duration('PT3H33M14.15S') },
    { id: 34, cislo: 25, dokonceno: null },
    { id: 14, cislo: 22, dokonceno: null },
    { id: 58, cislo: 30, dokonceno: null },
    { id: 15, cislo: 23, dokonceno: true, duration: moment.duration('PT3H27M42.38S') },
    { id: 59, cislo: 26, dokonceno: null }
  ];

  const component = renderer.create(<Startujici startujici={startujici} />);
  expect(component.toJSON()).toMatchSnapshot();
});
