import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { DragTypes } from '../../../constants';
import StartovniCislo from './StartovniCislo';

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isDropOver: monitor.isOver() && monitor.canDrop()
});

class DroppableStartovniCislo extends PureComponent {
  constructor(props) {
    super(props);
    const { canDrop, onDrop, typ } = this.props;

    /* Mixing ...monitor.getItem() and ...dropProps will cause some attributes be overwritten.
       We prefer destination ones over source ones here. */
    this.dropTarget = {
      drop: (dropProps, monitor) => onDrop({ ...monitor.getItem(), ...dropProps, typ }),
      canDrop: (dropProps, monitor) =>
        canDrop({ ...monitor.getItem(), ...dropProps, destinationTyp: typ })
    };
  }

  render = () => {
    const { canDrop, onDrop, ...rest } = this.props;
    const Droppable = DropTarget(DragTypes.STARTOVNI_CISLO, this.dropTarget, collect)(
      StartovniCislo
    );
    return <Droppable {...rest} />;
  };
}

DroppableStartovniCislo.propTypes = {
  typ: PropTypes.string.isRequired,
  canDrop: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
};

export default DroppableStartovniCislo;
