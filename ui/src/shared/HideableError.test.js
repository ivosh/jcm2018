import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import HideableError from './HideableError';

it('it renders', () => {
  const component = renderer.create(
    <HideableError
      code="chybový kód"
      message="Dlouhý popisek chyby"
      title="Chyba při něčem!"
      onHideError={jest.fn()}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('handle hide error', () => {
  const onHideError = jest.fn();

  const wrapper = mount(
    <HideableError
      code="chybový kód"
      message="Dlouhý popisek chyby"
      title="Chyba při něčem!"
      onHideError={onHideError}
    />
  );
  expect(wrapper.find('button.close')).toHaveLength(1);

  wrapper.find('button.close').simulate('click');
  expect(onHideError).toHaveBeenCalledWith();
});
