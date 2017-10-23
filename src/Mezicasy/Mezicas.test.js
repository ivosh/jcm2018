import React from 'react';
import renderer from 'react-test-renderer';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import Mezicas from './Mezicas';

const fakeOnClick = () => {};

it('jeden mezičas', () => {
  const component = renderer.create(
    <Table>
      <tbody>
        <Mezicas poradi={1} duration={moment.duration(34536)} onClick={fakeOnClick} />
      </tbody>
    </Table>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('tři mezičasy', () => {
  const component = renderer.create(
    <Table>
      <tbody>
        <Mezicas poradi={1} duration={moment.duration(34536)} onClick={fakeOnClick} />
        <Mezicas poradi={2} duration={moment.duration(3453678)} onClick={fakeOnClick} />
        <Mezicas poradi={3} duration={moment.duration(345369874)} onClick={fakeOnClick} />
      </tbody>
    </Table>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
