import React from 'react';
import { mount } from 'enzyme';
import { wrapInDnDTestContext } from '../../testing';
import Startujici from './Startujici';

const prihlaseni = [
  {
    id: '5a09b1fd371dec1e99b7e1c9',
    prijmeni: 'Balabák',
    jmeno: 'Roman',
    narozeni: { rok: 1956 },
    kategorie: {
      id: '5a587e1b051c181132cf83d7',
      pohlavi: 'muž',
      typ: 'půlmaraton',
      vek: { min: 60, max: 150 }
    },
    startCislo: 17,
    startCisloRequired: true
  }
];

// Render with the test context that uses the test backend.
const StartujiciDnD = wrapInDnDTestContext(Startujici);

it('can simulate a full drag and drop interaction', () => {
  const movePrihlasen = jest.fn();
  const moveOdstartovan = jest.fn();
  const wrapper = mount(
    <StartujiciDnD
      prihlaseni={prihlaseni}
      odstartovani={[]}
      moveOdstartovan={moveOdstartovan}
      movePrihlasen={movePrihlasen}
    />
  );

  // Obtain a reference to the backend.
  const backend = wrapper
    .instance()
    .getManager()
    .getBackend();

  // Find the drag source ID and use it to simulate the dragging operation.
  expect(wrapper.find('DragSource(JedenStartujici)')).toHaveLength(1);
  const prihlasen = wrapper.find('DragSource(JedenStartujici)').instance();
  backend.simulateBeginDrag([prihlasen.getHandlerId()]);

  // Find the drop target.
  expect(wrapper.find('DropTarget(StartujiciPanel)')).toHaveLength(2);
  const target = wrapper.find('DropTarget(StartujiciPanel)').last();

  // Simulate a hover first to set react-dnd's internal state for the drop and endDrag.
  backend.simulateHover([target.instance().getHandlerId()]);
  // Create a dropDesult that will get read during endDrag.
  backend.simulateDrop();
  backend.simulateEndDrag();
});
