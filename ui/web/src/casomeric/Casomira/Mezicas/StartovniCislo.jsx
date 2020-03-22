import React from 'react';
import PropTypes from 'prop-types';
import './StartovniCislo.css';

const StartovniCislo = ({ classNames, isDropOver, startCislo, connectDropTarget }) =>
  connectDropTarget(
    <div className={`${classNames} ${isDropOver ? 'casomeric-StartovniCislo--isDropOver' : ''}`}>
      {startCislo}
    </div>
  );

StartovniCislo.propTypes = {
  classNames: PropTypes.string.isRequired,
  isDropOver: PropTypes.bool,
  startCislo: PropTypes.number,
  connectDropTarget: PropTypes.func.isRequired,
};

export default StartovniCislo;
