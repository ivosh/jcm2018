import { connect } from 'react-redux';
import UcastniciDigestFilterable from './UcastniciDigestFilterable';
import { fetchUcastnici } from '../../entities/ucastnici/ucastniciActions';
import { getUcastniciDigestSorted } from './ucastniciDigestReducer';
import {
  kategorieVykonuFilterChange,
  textFilterChange,
  sortDirChange
} from './UcastniciDigestActions';

const mapStateToProps = ({ entities, registrator }) => {
  const {
    isFetching,
    kategorieVykonuFilter,
    textFilter,
    sortColumn,
    sortDir
  } = registrator.ucastniciDigest;

  // Don't forget to update areStatesEqual!
  return {
    roky: entities.rocniky.roky,
    ucastniciDigest: getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest }),
    isFetching,
    kategorieVykonuFilter,
    textFilter,
    sortColumn,
    sortDir
  };
};

const areStatesEqual = (next, prev) =>
  prev.entities === next.entities &&
  prev.registrator.ucastniciDigest === next.registrator.ucastniciDigest;

const mapDispatchToProps = dispatch => ({
  fetchUcastnici: () => dispatch(fetchUcastnici()),
  onTextFilterChange: textFilter => dispatch(textFilterChange(textFilter)),
  onKategorieVykonuFilterChange: typKategorie =>
    dispatch(kategorieVykonuFilterChange(typKategorie)),
  onSortDirChange: sortColumn => dispatch(sortDirChange(sortColumn))
});

const UcastniciDigestContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  areStatesEqual
})(UcastniciDigestFilterable);

export default UcastniciDigestContainer;
