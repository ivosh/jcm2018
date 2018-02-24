import React from 'react';
import renderer from 'react-test-renderer';
import { dokoncenoArr, dokoncenoStr } from '../../Util';
import Legenda from './Legenda';

it('renders dokončeno', () => {
  const legenda = dokoncenoArr.map(dokonceno => ({
    name: dokoncenoStr(dokonceno)[0],
    popisek: dokoncenoStr(dokonceno)[1]
  }));

  const component = renderer.create(<Legenda legenda={legenda} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('renders dokončeno + neaktivní', () => {
  const legenda = dokoncenoArr.map(dokonceno => ({
    name: dokoncenoStr(dokonceno)[0],
    popisek: dokoncenoStr(dokonceno)[1]
  }));
  legenda.push({ name: 'neaktivni', popisek: 'neaktivní' });

  const component = renderer.create(<Legenda legenda={legenda} />);
  expect(component.toJSON()).toMatchSnapshot();
});
