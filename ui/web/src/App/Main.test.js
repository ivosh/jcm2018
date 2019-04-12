import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Main from './Main';

it('it renders', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Main />
    </MemoryRouter>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
