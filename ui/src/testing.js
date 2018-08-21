/* eslint-disable import/no-extraneous-dependencies */
/* This file is used only by jest tests. */
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';
import jwt from 'jsonwebtoken';
/* eslint-enable import/no-extraneous-dependencies */

/* Wraps a component into a DragDropContext that uses the TestBackend.
   Use as:
     const ComponentDnD = wrapInDnDTestContext(Component [, store]); */
export const wrapInDnDTestContext = (WrappedComponent, store) =>
  DragDropContext(TestBackend)(
    class DnDTestContextContainer extends PureComponent {
      render = () =>
        store ? (
          <Provider store={store}>
            <WrappedComponent {...this.props} />
          </Provider>
        ) : (
          <WrappedComponent {...this.props} />
        );
    }
  );

// For generating test jwt tokens.
global.crypto = { getRandomValues: arr => arr.fill(86) };

/* Taken from server/api/User/signIn.js. expireTime is 1. 1. 2040 (seconds since Epoch). */
export const generateTestToken = ({ username, nonce, exp = 2208988800, secret = 'jwt_secret' }) => {
  const payload = { username, nonce, exp };
  return jwt.sign(payload, secret);
};
