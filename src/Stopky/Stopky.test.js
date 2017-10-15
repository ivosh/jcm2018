import React from 'react';
import ReactDOM from 'react-dom';
import Stopky from './Stopky';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Stopky />, div);
});