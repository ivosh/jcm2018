import React from 'react';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import KategorieFilter from './KategorieFilter';

it('renders active', () => {
  const wrapper = shallow(
    <KategorieFilter typKategorie="pěší" active={true} onClick={jest.fn()} />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('renders nonactive', () => {
  const wrapper = shallow(<KategorieFilter typKategorie="koloběžka" onClick={jest.fn()} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('maps onClick to dispatch onClick action', () => {
  const onClick = jest.fn();
  const wrapper = mount(<KategorieFilter typKategorie="půlmaraton" onClick={onClick} />);
  expect(wrapper.find('button')).toHaveLength(1);
  wrapper.find('button').simulate('click');

  expect(onClick).toHaveBeenCalledTimes(1);
});
