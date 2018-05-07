import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon, Panel } from 'react-bootstrap';
import PopisekKategorie from '../../../shared/Popisek/PopisekKategorie';
import './Casomira.css';

const Casomira = ({ typ, onRemove }) => (
  <Panel
    className={`Casomira__panel--${typ}`}
    header={
      <div className="Casomira__header">
        <PopisekKategorie typ={typ} />
        <Button className="close" onClick={onRemove}>
          <Glyphicon glyph="remove" />
        </Button>
      </div>
    }
  >
    <div>
      huh sdfijwe4t -0e9jtgpeogjm9gju pej5yh09rejghotrdjh 0e9j5yhi0 re9jkm re0yi-r6hkff0 9km6u
      rkf6juh9f6mko9
    </div>
  </Panel>
);

Casomira.propTypes = {
  typ: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Casomira;
