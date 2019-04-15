import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { Button, Glyphicon } from 'react-bootstrap';
import { convertDuration } from '../../../Util';
import DroppableStartovniCislo from './DroppableStartovniCislo';
import './Mezicas.css';

const Mezicas = ({
  poradi,
  cas,
  dokonceno,
  startCislo,
  typ,
  canDrop,
  onDrop,
  onRemove,
  onEdit
}) => {
  const duration = convertDuration(cas);

  return (
    <React.Fragment>
      <div className="Mezicasy__cell Mezicas__poradi">{poradi}.</div>
      <div className="Mezicasy__leftCell Mezicas__cas">
        {cas && `${duration.hours}:${duration.mins}:${duration.secs},${duration.subsecs}`}
      </div>
      <DroppableStartovniCislo
        cas={cas}
        classNames="Mezicasy__middleCell Mezicas__startCislo"
        dokonceno={dokonceno}
        startCislo={startCislo}
        typ={typ}
        canDrop={canDrop}
        onDrop={onDrop}
      />
      <div className="Mezicasy__cell Mezicas__buttons">
        <Button bsSize="small" className="Mezicas__button--remove" onClick={onRemove}>
          <Glyphicon glyph="remove" />
        </Button>
        <Button bsSize="small" className="Mezicas__button--edit" onClick={onEdit} disabled={true}>
          <Glyphicon glyph="edit" />
        </Button>
      </div>
    </React.Fragment>
  );
};

Mezicas.propTypes = {
  cas: momentPropTypes.momentDurationObj,
  dokonceno: PropTypes.bool,
  poradi: PropTypes.number.isRequired,
  startCislo: PropTypes.number,
  typ: PropTypes.string.isRequired,
  canDrop: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

Mezicas.defaultProps = {
  cas: undefined,
  dokonceno: undefined,
  startCislo: undefined
};

export default Mezicas;
