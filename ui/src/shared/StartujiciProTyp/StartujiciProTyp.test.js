import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import moment from 'moment';
import StartujiciProTyp from './StartujiciProTyp';

const testRenderer = ({ startCislo }) => (
  <div key={startCislo} className="StartujiciProTyp-item">
    {startCislo}
  </div>
);
testRenderer.propTypes = {
  startCislo: PropTypes.number.isRequired
};

it('žádný startující', () => {
  const component = renderer.create(<StartujiciProTyp startujici={[]} renderer={testRenderer} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('jeden startující', () => {
  const startujici = [
    {
      id: '10',
      startCislo: 7,
      dokonceno: true,
      duration: moment.duration('PT4H15M32.45S')
    }
  ];

  const component = renderer.create(
    <StartujiciProTyp startujici={startujici} renderer={testRenderer} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('třináct startujících', () => {
  const startujici = [
    { id: '0', startCislo: 7, dokonceno: null },
    { id: '1', startCislo: 4, dokonceno: null },
    {
      id: '10',
      startCislo: 16,
      dokonceno: true,
      duration: moment.duration('PT4H15M32.45S')
    },
    { id: '2', startCislo: 25, dokonceno: false },
    {
      id: '3',
      startCislo: 9,
      dokonceno: true,
      duration: moment.duration('PT2H17M29.14S')
    },
    {
      id: '12',
      startCislo: 15,
      dokonceno: true,
      duration: moment.duration('PT3H59M59.01S')
    },
    { id: '9', startCislo: 1, dokonceno: false },
    { id: '29', startCislo: 8, dokonceno: null },
    { id: '5', startCislo: 59, dokonceno: null },
    { id: '11', startCislo: 43, dokonceno: null },
    { id: '18', startCislo: 42, dokonceno: false },
    {
      id: '10',
      startCislo: 33,
      dokonceno: true,
      duration: moment.duration('PT3H30M22.45S')
    },
    { id: '7', startCislo: 21, dokonceno: false },
    {
      id: '13',
      startCislo: 24,
      dokonceno: true,
      duration: moment.duration('PT3H33M14.15S')
    },
    { id: '34', startCislo: 27, dokonceno: null },
    { id: '14', startCislo: 22, dokonceno: null },
    { id: '58', startCislo: 30, dokonceno: null },
    {
      id: '15',
      startCislo: 23,
      dokonceno: true,
      duration: moment.duration('PT3H27M42.38S')
    },
    { id: '59', startCislo: 26, dokonceno: null }
  ];

  const component = renderer.create(
    <StartujiciProTyp startujici={startujici} renderer={testRenderer} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});
