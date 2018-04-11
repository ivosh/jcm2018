import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { DragTypes } from '../../constants';
import JedenStartujici from './JedenStartujici';

const dragSource = {
  beginDrag: ({ dragType, id }) => ({ dragType, id })
};

const collectDrag = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const DraggableJedenStartujici = ({ dragType, ...rest }) => {
  const Draggable = DragSource(dragType, dragSource, collectDrag)(JedenStartujici);

  return <Draggable {...rest} />;
};

DraggableJedenStartujici.propTypes = {
  dragType: PropTypes.oneOf([DragTypes.STARTUJICI_PRIHLASEN, DragTypes.STARTUJICI_ODSTARTOVAN])
    .isRequired
};

export default DraggableJedenStartujici;
