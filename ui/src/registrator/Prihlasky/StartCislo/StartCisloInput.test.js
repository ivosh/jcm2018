import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import StartCisloInput from './StartCisloInput';

it('renders not showing', () => {
  const wrapper = shallow(
    <StartCisloInput
      enabled={true}
      showing={false}
      value="10"
      inputRef={jest.fn()}
      onChange={jest.fn()}
      onHide={jest.fn()}
      onShow={jest.fn()}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('renders showing', () => {
  const wrapper = shallow(
    <StartCisloInput
      enabled={true}
      showing={true}
      value="10"
      inputRef={jest.fn()}
      onChange={jest.fn()}
      onHide={jest.fn()}
      onShow={jest.fn()}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('renders disabled', () => {
  const wrapper = shallow(
    <StartCisloInput
      enabled={false}
      showing={false}
      value=""
      inputRef={jest.fn()}
      onChange={jest.fn()}
      onHide={jest.fn()}
      onShow={jest.fn()}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});
