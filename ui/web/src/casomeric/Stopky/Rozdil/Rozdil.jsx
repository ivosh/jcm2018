import React from 'react';
import PropTypes from 'prop-types';

const Rozdil = ({ name, rozdil }) => (
  <>
    <div>{name}</div>
    <div>
      {rozdil.hours}:{rozdil.mins}:{rozdil.secs},{rozdil.subsecs}
    </div>
  </>
);

Rozdil.propTypes = {
  name: PropTypes.string.isRequired,
  rozdil: PropTypes.shape({
    hours: PropTypes.string.isRequired,
    mins: PropTypes.string.isRequired,
    secs: PropTypes.string.isRequired,
    subsecs: PropTypes.string.isRequired,
  }).isRequired,
};

export default Rozdil;
