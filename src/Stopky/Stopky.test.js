import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Stopky from './Stopky';
import { initialState } from './stopkyReducer';

const mockStore = configureStore([]);

it('renders without crashing', () => {
  const store = mockStore(initialState);

  const stopky = mount(
    <Provider store={store}>
      <Stopky />
    </Provider>
  );
  const div = document.createElement('div');
  ReactDOM.render(stopky, div);
});
