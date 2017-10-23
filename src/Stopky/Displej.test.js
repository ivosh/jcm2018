import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import Displej from './Displej';

it('počáteční stav', () => {
  const component = renderer.create(<Displej duration={null} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('po startu', () => {
  const component = renderer.create(<Displej duration={moment.duration('1:43:52.13')} />);
  expect(component.toJSON()).toMatchSnapshot();
});
