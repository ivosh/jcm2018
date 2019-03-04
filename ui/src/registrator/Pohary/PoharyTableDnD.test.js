import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { ActionPrefixes, ReduxNames } from '../../constants';
import { wrapInDnDTestContext } from '../../testing';
import PoharyTable from './PoharyTable';

const actionPrefix = ActionPrefixes.POHARY_PO_STARTU;
const mockStore = configureStore();
const reduxName = ReduxNames.poharyPoStartu;
const state = { registrator: { [reduxName]: {} } };
const store = mockStore(state);
store.dispatch = jest.fn();

const pohary = [
  {
    id: '6f09b1fd371dec1e99b7e1c9',
    prijmeni: 'Sukdoláková',
    jmeno: 'Martina',
    narozeni: { rok: 1963, mesic: 12, den: 7 },
    obec: 'Zlín',
    pohary: { narok: false, neprevzato: 1, predano: 0 },
    ucasti: { dokoncene: [2016, 2013, 2012, 2011, 2010], prihlaseno: false, odstartovano: false }
  },
  {
    id: '7a09b1fd371dec1e99b7e142',
    prijmeni: 'Zralá',
    jmeno: 'Hana',
    narozeni: { den: 25, mesic: 7, rok: 1999 },
    pohary: { narok: false, neprevzato: 0, predano: 0 },
    ucasti: { dokoncene: [], prihlaseno: false, odstartovano: false }
  }
];

// Render with the test context that uses the test backend.
const PoharyTableDnD = wrapInDnDTestContext(PoharyTable);

it('can simulate a full drag and drop interaction', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <PoharyTableDnD
          actionPrefix={actionPrefix}
          narokovaneFilter={false}
          neprevzateFilter={false}
          pohary={pohary}
          popisek="se na něj přihlásili"
          reduxName={reduxName}
          textFilter=""
          canDrop={jest.fn()}
          onDrop={jest.fn()}
          onNarokovaneFilterChange={jest.fn()}
          onNeprevzateFilterChange={jest.fn()}
          onTextFilterChange={jest.fn()}
        />
      </MemoryRouter>
    </Provider>
  );

  // Obtain a reference to the backend.
  const backend = wrapper
    .find(PoharyTableDnD)
    .instance()
    .getManager()
    .getBackend();

  // Find the drag source ID and use it to simulate the dragging operation.
  expect(wrapper.find('DragSource(Pohar)')).toHaveLength(1);
  const pohar = wrapper.find('DragSource(Pohar)').instance();
  backend.simulateBeginDrag([pohar.getHandlerId()]);

  // Find the drop target.
  expect(wrapper.find('DropTarget(Pohary)')).toHaveLength(6);
  const target = wrapper.find('DropTarget(Pohary)').first();

  // Simulate a hover first to set react-dnd's internal state for the drop and endDrag.
  backend.simulateHover([target.instance().getHandlerId()]);
  // Create a dropDesult that will get read during endDrag.
  backend.simulateDrop();
  backend.simulateEndDrag();
});
