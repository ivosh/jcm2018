import React from 'react';
import PropTypes from 'prop-types';

const StartovniCislo = ({ classNames, startCislo, connectDropTarget }) =>
  connectDropTarget(<div className={classNames}>{startCislo}</div>);

StartovniCislo.propTypes = {
  classNames: PropTypes.string.isRequired,
  startCislo: PropTypes.number,
  connectDropTarget: PropTypes.func.isRequired
};

export default StartovniCislo;
