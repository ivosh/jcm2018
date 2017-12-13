import Dimensions from 'react-dimensions';
import PropTypes from 'prop-types';
import UcastniciDigest from './UcastniciDigest';

const UcastniciDigestResponsive = Dimensions({
  getHeight: () => window.innerHeight - 100,
  getWidth: () => window.innerWidth - 100,
  containerStyle: {
    paddingLeft: '30px',
    paddingRight: '50px'
  }
})(UcastniciDigest);

UcastniciDigestResponsive.propTypes = {
  ucastniciDigest: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  sortColumn: PropTypes.string,
  sortDir: PropTypes.string,
  fetchUcastnici: PropTypes.func.isRequired,
  onSortDirChange: PropTypes.func.isRequired
};

export default UcastniciDigestResponsive;
