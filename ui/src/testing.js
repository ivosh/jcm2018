/* eslint-disable import/no-extraneous-dependencies */
/* This file is used only by jest tests. */
import React, { PureComponent } from 'react';
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';
/* eslint-enable import/no-extraneous-dependencies */

/* Wraps a component into a DragDropContext that uses the TestBackend.
   Use as:
     const ComponentDnD = wrapInDnDTestContext(Component); */
// eslint-disable-next-line import/prefer-default-export
export const wrapInDnDTestContext = WrappedComponent =>
  DragDropContext(TestBackend)(
    class DnDTestContextContainer extends PureComponent {
      render = () => <WrappedComponent {...this.props} />;
    }
  );
