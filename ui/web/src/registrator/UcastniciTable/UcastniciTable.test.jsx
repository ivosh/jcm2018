import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { SortDirTypes } from '../../sort';
import UcastniciTable from './UcastniciTable';

const columns = [
  { key: 'prijmeni', label: 'příjmení', sortable: true, width: 100 },
  { key: 'jmeno', label: 'jméno', sortable: true, width: 100 },
  {
    key: '2012',
    cellDataFormatter: ({ cellData }) => cellData.dokonceno,
    sortable: false,
    width: 50,
  },
];

const data = [
  {
    id: '5a09b1fd371dec1e99b7e1c9',
    prijmeni: 'Balabák',
    jmeno: 'Roman',
    2012: { dokonceno: false },
  },
  {
    id: '6f09b1fd371dec1e99b7e1c9',
    prijmeni: 'Sukdoláková',
    jmeno: 'Martina',
    2012: { dokonceno: true, kategorie: 'maraton' },
  },
];

const commonProps = {
  columns,
  containerHeight: 500,
  containerWidth: 500,
  data,
  fixedColumnCount: 2,
  rowHeight: 35,
};

it('žádná data', () => {
  const wrapper = mount(<UcastniciTable {...commonProps} data={[]} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('dva účastníci', () => {
  const wrapper = mount(<UcastniciTable {...commonProps} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('dva účastníci, řazeno dle příjmení', () => {
  const wrapper = mount(
    <UcastniciTable
      {...commonProps}
      containerWidth={200}
      sortColumn="prijmeni"
      sortDir={SortDirTypes.ASC}
      onSortDirChange={jest.fn()}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('maps onClick to onSortDirChange for jméno', () => {
  const onSortDirChange = jest.fn();
  const wrapper = mount(
    <UcastniciTable
      {...commonProps}
      sortColumn="prijmeni"
      sortDir={SortDirTypes.ASC}
      onSortDirChange={onSortDirChange}
    />
  );

  expect(wrapper.find('button')).toHaveLength(2);
  expect(wrapper.find('button').last()).toHaveLength(1);
  wrapper.find('button').last().simulate('click');

  expect(onSortDirChange).toHaveBeenCalledWith('jmeno');
});
