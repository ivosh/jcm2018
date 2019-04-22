import PropTypes from 'prop-types';

const PopisekVeku = ({ vek }) =>
  `${vek.min} ${vek.max === 150 ? 'let a více' : `- ${vek.max} let`}`;

PopisekVeku.propTypes = {
  vek: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
  }).isRequired
};

export default PopisekVeku;
