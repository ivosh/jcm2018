import { connect } from 'react-redux';
import UcastniciDigestResponsive from './UcastniciDigestResponsive';
import { fetchUcastnici } from '../../Ucastnici/UcastniciActions';
import { getUcastniciDigestSorted } from './ucastniciDigestReducer';
import sortDirChange from './UcastniciDigestActions';

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

const UcastniciDigestContainer = connect(mapStateToProps, mapDispatchToProps)(
  UcastniciDigestResponsive
);

export default UcastniciDigestContainer;
