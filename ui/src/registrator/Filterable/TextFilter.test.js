import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TextFilter from './TextFilter';

jest.useFakeTimers();

it('renders', () => {
  const component = renderer.create(<TextFilter onChange={jest.fn()} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('maps DebounceInput.onChange to dispatch onChange action', () => {
  const onChange = jest.fn();
  const wrapper = shallow(<TextFilter onChange={onChange} />);
  expect(wrapper.find('.TextFilter__input')).toHaveLength(1);
  wrapper.find('.TextFilter__input').simulate('change', { target: { value: 'K' } });

  jest.runAllTimers();
  expect(onChange).toHaveBeenCalledWith('K');
});
