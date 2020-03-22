import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';

const Platba = ({ platba: { castka, datum, typ, poznamka }, onClick }) => (
  <tr>
    <td>{castka} Kč</td>
    <td>{datum}</td>
    <td>{typ}</td>
    <td>{poznamka}</td>
    <td>
      <Button bsStyle="danger" bsSize="xsmall" onClick={onClick}>
        <Glyphicon glyph="remove" />
      </Button>
    </td>
  </tr>
);

Platba.propTypes = {
  platba: PropTypes.shape({
    castka: PropTypes.number.isRequired,
    datum: PropTypes.string.isRequired,
    typ: PropTypes.string.isRequired,
    poznamka: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Platba;
