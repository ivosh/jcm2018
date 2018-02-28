import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import StartujiciProTyp from '../../../shared/StartujiciProTyp/StartujiciProTyp';
import VyberStartCislo, { Renderer } from './VyberStartCislo';

it('renders VyberStartCislo', () => {
  const wrapper = shallow(<VyberStartCislo typ="koloběžka" onSelect={jest.fn()} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('Renderer', () => {
  const startujici = [{ id: '10', startCislo: 7 }, { startCislo: 10 }];

  const component = renderer.create(
    <StartujiciProTyp startujici={startujici} renderer={Renderer} onSelect={jest.fn()} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('Renderer - onClick', () => {
  const startujici = [{ startCislo: 10 }];
  const onSelect = jest.fn();
  const wrapper = mount(
    <StartujiciProTyp startujici={startujici} renderer={Renderer} onSelect={onSelect} />
  );

  expect(wrapper.find('.StartujiciProTyp-item')).toHaveLength(1);
  wrapper.find('.StartujiciProTyp-item').simulate('click');
  expect(onSelect).toHaveBeenCalledWith(10);
});
