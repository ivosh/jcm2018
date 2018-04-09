import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../constants';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import './JedenStartujici.css';

const JedenStartujici = ({
  connectDragSource,
  id,
  prijmeni,
  jmeno,
  narozeni,
  kategorie,
  startCislo
}) => (
  <React.Fragment>
    {connectDragSource(
      <div className="StartujiciPanel__cell JedenStartujici__prijmeni" id={id}>
        <span className="JedenStartujici__grip" />
        {prijmeni}
      </div>
    )}
    <div className="StartujiciPanel__leftCell JedenStartujici__jmeno">{jmeno}</div>
    <div className="StartujiciPanel__middleCell JedenStartujici__narozeni">{narozeni.rok}</div>
    <div
      className={`StartujiciPanel__middleCell JedenStartujici__kategorie JedenStartujici__kategorie--${
        kategorie.typ
      }`}
    >
      <PopisekKategorie {...kategorie} />
    </div>
    <div className="StartujiciPanel__cell JedenStartujici__startCislo">{startCislo}</div>
  </React.Fragment>
);

JedenStartujici.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  prijmeni: PropTypes.string.isRequired,
  jmeno: PropTypes.string.isRequired,
  narozeni: PropTypes.shape({
    rok: PropTypes.number.isRequired
  }).isRequired,
  kategorie: PropTypes.shape({
    typ: PropTypes.string.isRequired
  }).isRequired,
  startCislo: PropTypes.number
};

const dragSource = {
  beginDrag(props) {
    return { id: props.id };
  }
};

const collectDrag = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

// :TODO: When decorators are supported by babel in ES7, do:
// @DragSource(ItemTypes.JEDEN_STARTUJICI, dragSource, collect)
export default DragSource(ItemTypes.JEDEN_STARTUJICI, dragSource, collectDrag)(JedenStartujici);
