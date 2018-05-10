import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { DragTypes } from '../../../constants';
import LegendaItem from './LegendaItem';

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isDropOver: monitor.isOver() && monitor.canDrop()
});

class DroppableLegendaItem extends PureComponent {
  constructor(props) {
    super(props);
    const { canDrop, onDrop, typ } = this.props;

    this.dropTarget = {
      drop: (dropProps, monitor) => onDrop({ ...dropProps, ...monitor.getItem(), typ }),
      canDrop: (dropProps, monitor) =>
        canDrop({ ...dropProps, ...monitor.getItem(), destinationTyp: typ })
    };
  }

  render = () => {
    const { canDrop, onDrop, ...rest } = this.props;
    const Droppable = DropTarget(DragTypes.STARTOVNI_CISLO, this.dropTarget, collect)(LegendaItem);
    return <Droppable {...rest} />;
  };
}

DroppableLegendaItem.propTypes = {
  typ: PropTypes.string.isRequired,
  canDrop: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
};

export default DroppableLegendaItem;
