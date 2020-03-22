import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { DragTypes } from '../../constants';
import { isTypeDraggable, TYPY_POHARU } from './PoharyActions';
import Pohar from './Pohar';

const dragSource = {
  beginDrag: ({ id, type }) => ({ id, type, source: true }),
  canDrag: ({ type }) => isTypeDraggable(type),
};

const collectDrag = (connect, monitor) => ({
  dragAllowed: monitor.canDrag(),
  connectDragSource: connect.dragSource(),
});

class DraggablePohar extends PureComponent {
  constructor(props) {
    super(props);
    this.Draggable = DragSource(DragTypes.POHAR, dragSource, collectDrag)(Pohar);
  }

  render = () => {
    const { Draggable } = this;
    return <Draggable {...this.props} />;
  };
}

DraggablePohar.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(TYPY_POHARU).isRequired,
};

export default DraggablePohar;
