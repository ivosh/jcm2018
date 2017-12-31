import { connect } from 'react-redux';
import UcastniciDigestFilterable from './UcastniciDigestFilterable';
import { fetchUcastnici } from '../../entities/ucastnici/ucastniciActions';
import { getUcastniciDigestSorted } from './ucastniciDigestReducer';
import { textFilterChange, sortDirChange } from './UcastniciDigestActions';

const mapStateToProps = ({ entities, registrator }) => {
  const { textFilter, isFetching, sortColumn, sortDir } = registrator.ucastniciDigest;

  return {
    isFetching,
    roky: entities.rocniky.roky,
    ucastniciDigest: getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest }),
    textFilter,
    sortColumn,
    sortDir
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUcastnici: () => dispatch(fetchUcastnici()),
  onTextFilterChange: textFilter => dispatch(textFilterChange(textFilter)),
  onSortDirChange: sortColumn => dispatch(sortDirChange(sortColumn))
});

const UcastniciDigestContainer = connect(mapStateToProps, mapDispatchToProps)(
  UcastniciDigestFilterable
);

export default UcastniciDigestContainer;
