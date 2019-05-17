import React from 'react';
import PropTypes from 'prop-types';
import './Clovek.css';

const Clovek = ({ children }) => (
  <div className="Clovek">
    <div className="Clovek__hlava" />
    <div className="Clovek__cedule">{children}</div>
    <div className="Clovek__ruce">
      <div className="Clovek__ruka--leva" />
      <div className="Clovek__telo" />
      <div className="Clovek__ruka--prava" />
    </div>
    <div className="Clovek__nohy">
      <div className="Clovek__noha--leva" />
      <div className="Clovek__noha--prava" />
    </div>
  </div>
);

Clovek.propTypes = {
  children: PropTypes.node.isRequired
};

export default Clovek;
