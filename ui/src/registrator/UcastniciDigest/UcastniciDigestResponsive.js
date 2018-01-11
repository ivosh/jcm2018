import PropTypes from 'prop-types';
import Dimensions from 'react-dimensions';
import UcastniciDigestTable from './UcastniciDigestTable';

const UcastniciDigestResponsive = Dimensions({
  getHeight: () => window.innerHeight - 130,
  getWidth: () => window.innerWidth - 100
})(UcastniciDigestTable);

// roky+ucastniciDigest are simple pass-through from UcastniciDigestContainer.
UcastniciDigestResponsive.propTypes = {
  roky: PropTypes.array.isRequired,
  ucastniciDigest: PropTypes.array.isRequired,
  fetching: PropTypes.bool,
  sortColumn: PropTypes.string,
  sortDir: PropTypes.string,
  fetchUcastnici: PropTypes.func.isRequired,
  onSortDirChange: PropTypes.func.isRequired
};

export default UcastniciDigestResponsive;
