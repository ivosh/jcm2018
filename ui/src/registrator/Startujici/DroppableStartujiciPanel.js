import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { DragTypes } from '../../constants';
import StartujiciPanel from './StartujiciPanel';

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
});

class DroppableStartujiciPanel extends Component {
  constructor(props) {
    super(props);
    const { dropType, onDrop } = this.props;

    const dropTarget = {
      drop: (dropProps, monitor) => {
        onDrop(monitor.getItem().id);
      }
    };

    this.Droppable = DropTarget(dropType, dropTarget, collect)(StartujiciPanel);
  }

  render = () => {
    const { dropType, onDrop, ...rest } = this.props;
    const { Droppable } = this;

    return <Droppable {...rest} />;
  };
}

DroppableStartujiciPanel.propTypes = {
  dropType: PropTypes.oneOf([DragTypes.STARTUJICI_PRIHLASEN, DragTypes.STARTUJICI_ODSTARTOVAN])
    .isRequired,
  onDrop: PropTypes.func.isRequired
};

export default DroppableStartujiciPanel;
