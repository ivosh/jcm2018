import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { SortDirTypes } from '../../Util';
import UcastniciTable from './UcastniciTable';

const columns = [
  { key: 'prijmeni', label: 'příjmení', sortable: true, width: 100 },
  { key: 'jmeno', label: 'jméno', sortable: true, width: 100 },
  { key: '2012', sortable: false, width: 50 }
];

const data = [
  {
    id: '5a09b1fd371dec1e99b7e1c9',
    prijmeni: 'Balabák',
    jmeno: 'Roman',
    2012: { dokonceno: false }
  },
  {
    id: '6f09b1fd371dec1e99b7e1c9',
    prijmeni: 'Sukdoláková',
    jmeno: 'Martina',
    2012: { dokonceno: true, kategorie: 'maraton' }
  }
];

it('žádná data', () => {
  const wrapper = mount(
    <div height={500} width={500}>
      <UcastniciTable
        columns={columns}
        containerHeight={500}
        data={[]}
        fixedColumnCount={2}
        rowHeight={35}
      />
    </div>
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('dva účastníci', () => {
  const wrapper = mount(
    <div height={500} width={500}>
      <UcastniciTable
        columns={columns}
        containerHeight={500}
        data={data}
        fixedColumnCount={2}
        rowHeight={35}
      />
    </div>
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('dva účastníci, řazeno dle příjmení', () => {
  const wrapper = mount(
    <div height={500} width={500}>
      <UcastniciTable
        columns={columns}
        containerHeight={500}
        data={data}
        fixedColumnCount={2}
        rowHeight={35}
        sortColumn="prijmeni"
        sortDir={SortDirTypes.ASC}
        onSortDirChange={jest.fn()}
      />
    </div>
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});
