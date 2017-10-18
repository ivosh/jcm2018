import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import Mezicas from './Mezicas';

const fakeOnClick = () => {};

it('jeden mezičas', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Table>
      <tbody>
        <Mezicas poradi={1} duration={moment.duration(34536)} onClick={fakeOnClick} />
      </tbody>
    </Table>,
    div
  );
});

it('tři mezičasy', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Table>
      <tbody>
        <Mezicas poradi={1} duration={moment.duration(34536)} onClick={fakeOnClick} />
        <Mezicas poradi={2} duration={moment.duration(3453678)} onClick={fakeOnClick} />
        <Mezicas poradi={3} duration={moment.duration(345369874)} onClick={fakeOnClick} />
      </tbody>
    </Table>,
    div
  );
});
