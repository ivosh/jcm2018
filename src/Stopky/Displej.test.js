import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Displej from './Displej';

it('počáteční stav', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Displej duration={null} />, div);
});

it('po startu', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Displej duration={moment.duration("1:43:52.13")} />, div);
});
