import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UcastniciDigest from './UcastniciDigest';
import { fetchUcastnici } from '../../Ucastnici/UcastniciActions';
import { getUcastniciDigestSorted } from './ucastniciDigestReducer';
import { sortDirChange } from './UcastniciDigestActions';

const mapStateToProps = ({ ucastnici, registrator }) => {
  const { sortColumn, sortDir } = registrator.ucastniciDigest;

  return {
    ucastniciDigest: getUcastniciDigestSorted({ ...ucastnici, ...registrator.ucastniciDigest }),
    sortColumn,
    sortDir
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUcastnici: () => dispatch(fetchUcastnici()),
  onSortDirChange: sortColumn => dispatch(sortDirChange(sortColumn))
});

const UcastniciDigestContainer = connect(mapStateToProps, mapDispatchToProps)(UcastniciDigest);

UcastniciDigestContainer.propTypes = {
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired
};

export default UcastniciDigestContainer;
