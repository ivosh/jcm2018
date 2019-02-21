import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { DragTypes } from '../../constants';
import { TYPY_POHARU } from './PoharyActions';
import Pohary from './Pohary';

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isDropOver: monitor.isOver() && monitor.canDrop()
});

class DroppablePohary extends PureComponent {
  constructor(props) {
    super(props);
    const { type, canDrop, onDrop } = this.props;

    this.dropTarget = {
      drop: (dropProps, monitor) =>
        onDrop({ source: monitor.getItem(), destination: { ...dropProps, type } }),
      canDrop: (dropProps, monitor) =>
        canDrop({ source: monitor.getItem(), destination: { ...dropProps, type } })
    };
  }

  render = () => {
    const { canDrop, onDrop, ...rest } = this.props;
    const Droppable = DropTarget(DragTypes.POHAR, this.dropTarget, collect)(Pohary);
    return <Droppable {...rest} />;
  };
}

DroppablePohary.propTypes = {
  type: PropTypes.oneOf(TYPY_POHARU).isRequired,
  canDrop: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
};

export default DroppablePohary;
