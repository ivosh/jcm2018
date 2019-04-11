import React from 'react';
import renderer, { act } from 'react-test-renderer';
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

it('handle delete', async () => {
  const deletePoznamka = jest.fn();
  let component;
  act(() => {
    component = renderer.create(
      <Poznamka
        datum={new Date('2019-05-24T06:13:53.000Z')}
        lines={1}
        text="text poznámky"
        deletePoznamka={deletePoznamka}
        modifyPoznamka={jest.fn()}
      />
    );
  });

  await act(async () => {
    await component.root.findByProps({ className: 'Poznamka__delete' }).props.onClick();
  });

  expect(deletePoznamka).toHaveBeenCalledTimes(1);
});

it('handle modify and click save icon', async () => {
  const modifyPoznamka = jest.fn();
  let component;
  act(() => {
    component = renderer.create(
      <Poznamka
        datum={new Date('2019-05-24T06:13:53.000Z')}
        lines={1}
        text="text poznámky"
        deletePoznamka={jest.fn()}
        modifyPoznamka={modifyPoznamka}
      />
    );
  });

  await act(async () => {
    await component.root
      .findByType('textarea')
      .props.onChange({ target: { value: 'text poznámky změněný' } });
  });
  await act(async () => {
    await component.root.findByProps({ className: 'Poznamka__save' }).props.onClick();
  });

  expect(modifyPoznamka).toHaveBeenCalledTimes(1);
  expect(modifyPoznamka).toHaveBeenCalledWith('text poznámky změněný');
});
