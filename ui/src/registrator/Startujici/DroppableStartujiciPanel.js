import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import StartujiciPanel from './StartujiciPanel';

class DroppableStartujiciPanel extends Component {
  render = () => <StartujiciPanel {...this.props} />;
}

// :TODO: When decorators are supported by babel for ES7, do: @DragDropContext(HTML5Backend)
export default DragDropContext(HTML5Backend)(DroppableStartujiciPanel);
