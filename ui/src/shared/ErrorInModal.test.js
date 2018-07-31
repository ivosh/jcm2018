import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ErrorInModal from './ErrorInModal';

it('it renders showing', () => {
  const wrapper = shallow(
    <div>
      <ErrorInModal
        code="chybový kód"
        message="Dlouhý popisek chyby"
        show={true}
        title="Chyba při něčem!"
        onHide={jest.fn()}
      />
    </div>
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('it renders not showing', () => {
  const component = renderer.create(
    <div>
      <ErrorInModal
        code="chybový kód"
        message="Dlouhý popisek chyby"
        show={false}
        title="Chyba při něčem!"
        onHide={jest.fn()}
      />
    </div>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('handle hide error', () => {
  const onHide = jest.fn();

  const wrapper = mount(
    <div>
      <ErrorInModal
        code="chybový kód"
        message="Dlouhý popisek chyby"
        show={true}
        title="Chyba při něčem!"
        onHide={onHide}
      />
    </div>
  );
  expect(wrapper.find('button.close')).toHaveLength(1);

  wrapper.find('button.close').simulate('click');
  expect(onHide).toHaveBeenCalledWith(expect.any(Object));
});
