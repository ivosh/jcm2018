import React from 'react';
import PropTypes from 'prop-types';
import Rozdil from './Rozdil';
import './Rozdily.css';

const Rozdily = ({ rozdily }) => (
  <div className="Rozdily">
    {rozdily.map(rozdil => (
      <Rozdil key={rozdil.name} {...rozdil} />
    ))}
  </div>
);

Rozdily.propTypes = {
  rozdily: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rozdil: PropTypes.shape({
        hours: PropTypes.string.isRequired,
        mins: PropTypes.string.isRequired,
        secs: PropTypes.string.isRequired,
        subsecs: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired
};

export default Rozdily;
