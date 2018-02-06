import { connect } from 'react-redux';
import { fetchUcastnici } from '../../entities/ucastnici/ucastniciActions';
import { getUcastniciDigestSorted } from './ucastniciDigestReducer';
import { sortDirChange } from './UcastniciDigestActions';
import UcastniciDigest from './UcastniciDigest';

const mapStateToProps = ({ entities, registrator }) => {
  const { fetching, sortColumn, sortDir } = registrator.ucastniciDigest;

  // Don't forget to update areStatesEqual!
  return {
    roky: entities.rocniky.roky,
    ucastniciDigest: getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest }),
    actionPrefix: 'UCASTNICI_DIGEST',
    fetching,
    reduxName: 'ucastniciDigest',
    sortColumn,
    sortDir
  };
};

const areStatesEqual = (next, prev) =>
  prev.entities === next.entities &&
  prev.registrator.ucastniciDigest === next.registrator.ucastniciDigest;

const mapDispatchToProps = dispatch => ({
  fetchUcastnici: () => dispatch(fetchUcastnici()),
  onSortDirChange: sortColumn => dispatch(sortDirChange(sortColumn))
});

const UcastniciDigestContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  areStatesEqual
})(UcastniciDigest);

export default UcastniciDigestContainer;
