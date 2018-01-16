import React from 'react';
import renderer from 'react-test-renderer';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import Mezicas from './Mezicas';

it('jeden mezičas', () => {
  const component = renderer.create(
    <Table>
      <tbody>
        <Mezicas poradi={1} duration={moment.duration(34536)} cislo="" onClick={jest.fn()} />
      </tbody>
    </Table>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('tři mezičasy', () => {
  const component = renderer.create(
    <Table>
      <tbody>
        <Mezicas poradi={1} duration={moment.duration(34536)} cislo="" onClick={jest.fn()} />
        <Mezicas poradi={2} duration={moment.duration(3453678)} cislo="" onClick={jest.fn()} />
        <Mezicas poradi={3} duration={moment.duration(345369874)} cislo="" onClick={jest.fn()} />
      </tbody>
    </Table>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
