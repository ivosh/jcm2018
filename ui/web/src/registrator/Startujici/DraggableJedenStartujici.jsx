import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { DragTypes } from '../../constants';
import JedenStartujici from './JedenStartujici';

const dragSource = {
  beginDrag: ({ dragType, id }) => ({ dragType, id }),
};

const collectDrag = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

class DraggableJedenStartujici extends PureComponent {
  constructor(props) {
    super(props);
    const { dragType } = this.props;
    this.Draggable = DragSource(dragType, dragSource, collectDrag)(JedenStartujici);
  }

  render = () => {
    const { Draggable } = this;
    return <Draggable {...this.props} />;
  };
}

DraggableJedenStartujici.propTypes = {
  dragType: PropTypes.oneOf([DragTypes.STARTUJICI_PRIHLASEN, DragTypes.STARTUJICI_ODSTARTOVAN])
    .isRequired,
};

export default DraggableJedenStartujici;
