import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import MezicasyView from './MezicasyView';

const fakeOnRemoveMezicas = () => {};

it('žádný mezičas', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MezicasyView mezicasy={[]} onRemoveMezicas={fakeOnRemoveMezicas} />, div);
});

it('jeden mezičas', () => {
  const mezicasy = [{ id: 0, duration: moment.duration(234) }];
  const div = document.createElement('div');
  ReactDOM.render(<MezicasyView mezicasy={mezicasy} onRemoveMezicas={fakeOnRemoveMezicas} />, div);
});

it('tři mezičasy', () => {
  const mezicasy = [
    { id: 0, duration: moment.duration(234) },
    { id: 1, duration: moment.duration(567) },
    { id: 2, duration: moment.duration(9024) }
  ];
  const div = document.createElement('div');
  ReactDOM.render(<MezicasyView mezicasy={mezicasy} onRemoveMezicas={fakeOnRemoveMezicas} />, div);
});
