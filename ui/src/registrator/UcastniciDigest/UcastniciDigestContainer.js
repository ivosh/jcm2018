import { connect } from 'react-redux';
import UcastniciDigestFilterable from './UcastniciDigestFilterable';
import { fetchUcastnici } from '../../entities/ucastnici/ucastniciActions';
import { getUcastniciDigestSorted } from './ucastniciDigestReducer';
import { filterChange, sortDirChange } from './UcastniciDigestActions';

const mapStateToProps = ({ entities, registrator }) => {
  const { filter, isFetching, sortColumn, sortDir } = registrator.ucastniciDigest;

  return {
    isFetching,
    roky: entities.rocniky.roky,
    ucastniciDigest: getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest }),
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
