import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import StartovniCislaProTyp from '../../../shared/StartovniCislaProTyp/StartovniCislaProTyp';
import VyberStartCislo, { Renderer } from './VyberStartCislo';

it('renders VyberStartCislo', () => {
  const wrapper = shallow(<VyberStartCislo typ="koloběžka" onSelect={jest.fn()} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('Renderer', () => {
  const startovniCisla = [{ id: '10', startCislo: 7 }, { startCislo: 10 }];

  const component = renderer.create(
    <StartovniCislaProTyp
      startovniCisla={startovniCisla}
      Renderer={Renderer}
      onSelect={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('Renderer - vybrané', () => {
  const startovniCisla = [{ id: '10', startCislo: 7 }, { startCislo: 10 }];

  const component = renderer.create(
    <StartovniCislaProTyp
      startovniCisla={startovniCisla}
      vybraneStartCislo={7}
      Renderer={Renderer}
      onSelect={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('Renderer - nevybrané; někdo jiný', () => {
  const startovniCisla = [{ id: '10', startCislo: 7 }, { startCislo: 10 }];

  const component = renderer.create(
    <StartovniCislaProTyp
      startovniCisla={startovniCisla}
      vybraneId="11"
      vybraneStartCislo={7}
      Renderer={Renderer}
      onSelect={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('Renderer - onClick', () => {
  const startovniCisla = [{ startCislo: 10 }];
  const onSelect = jest.fn();
  const wrapper = mount(
    <StartovniCislaProTyp startovniCisla={startovniCisla} Renderer={Renderer} onSelect={onSelect} />
  );

  expect(wrapper.find('.StartovniCislaProTyp__item')).toHaveLength(1);
  wrapper.find('.StartovniCislaProTyp__item').simulate('click');
  expect(onSelect).toHaveBeenCalledWith(10);
});
