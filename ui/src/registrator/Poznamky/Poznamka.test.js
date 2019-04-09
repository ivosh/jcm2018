import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Poznamka from './Poznamka';

it('prázdná poznámka', () => {
  const component = renderer.create(
    <Poznamka
      datum={new Date('2019-05-24T06:13:53.000Z')}
      lines={1}
      text="text poznámky"
      deletePoznamka={jest.fn()}
      modifyPoznamka={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('handle delete', () => {
  const deletePoznamka = jest.fn();
  const wrapper = mount(
    <Poznamka
      datum={new Date('2019-05-24T06:13:53.000Z')}
      lines={1}
      text="text poznámky"
      deletePoznamka={deletePoznamka}
      modifyPoznamka={jest.fn()}
    />
  );

  expect(wrapper.find('.Poznamka__delete')).toHaveLength(1);
  wrapper.find('.Poznamka__delete').simulate('click');

  expect(deletePoznamka).toHaveBeenCalledTimes(1);
});

it('handle modify and click save icon', () => {
  const modifyPoznamka = jest.fn();
  const wrapper = mount(
    <Poznamka
      datum={new Date('2019-05-24T06:13:53.000Z')}
      lines={1}
      text="text poznámky"
      deletePoznamka={jest.fn()}
      modifyPoznamka={modifyPoznamka}
    />
  );

  expect(wrapper.find('textarea')).toHaveLength(1);
  wrapper.find('textarea').simulate('change', { target: { value: 'text poznámky změněný' } });
  expect(wrapper.find('.Poznamka__save')).toHaveLength(1);
  wrapper.find('.Poznamka__save').simulate('click');

  expect(modifyPoznamka).toHaveBeenCalledTimes(1);
  expect(modifyPoznamka).toHaveBeenCalledWith('text poznámky změněný');
});
