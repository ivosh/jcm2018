import PropTypes from 'prop-types';
import Dimensions from 'react-dimensions';
import UcastniciDigest from './UcastniciDigest';

const UcastniciDigestResponsive = Dimensions({
  getHeight: () => window.innerHeight - 130,
  getWidth: () => window.innerWidth - 100
})(UcastniciDigest);

// ucastniciDigest are simple pass-through from UcastniciDigestContainer.
UcastniciDigestResponsive.propTypes = {
  sortColumn: PropTypes.string,
  sortDir: PropTypes.string,
  ucastniciDigest: PropTypes.array.isRequired,
  fetchUcastnici: PropTypes.func.isRequired,
  onSortDirChange: PropTypes.func.isRequired
};

export default UcastniciDigestResponsive;
