import React from 'react';
import ReactDOM from 'react-dom';
import Displej from './Displej';

it('počáteční stav', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Displej hours="-" mins="--" secs="--" subsecs="--" />, div);
});

it('po startu', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Displej hours="1" mins="43" secs="52" subsecs="13" />, div);
});
