import { connect } from 'react-redux';
import UcastniciDigestFilterable from './UcastniciDigestFilterable';
import { fetchUcastnici } from '../../ucastnici/ucastniciActions';
import { getUcastniciDigestSorted } from './ucastniciDigestReducer';
import { filterChange, sortDirChange } from './UcastniciDigestActions';

const mapStateToProps = ({ ucastnici, registrator }) => {
  const { filter, sortColumn, sortDir } = registrator.ucastniciDigest;

  return {
    ucastniciDigest: getUcastniciDigestSorted({ ...ucastnici, ...registrator.ucastniciDigest }),
    filter,
    sortColumn,
    sortDir
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUcastnici: () => dispatch(fetchUcastnici()),
  onFilterChange: filter => dispatch(filterChange(filter)),
  onSortDirChange: sortColumn => dispatch(sortDirChange(sortColumn))
});

const UcastniciDigestContainer = connect(mapStateToProps, mapDispatchToProps)(
  UcastniciDigestFilterable
);

export default UcastniciDigestContainer;
