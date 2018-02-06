import { connect } from 'react-redux';
import { fetchUcastnici } from '../../entities/ucastnici/ucastniciActions';
import { getUcastniciDigestSorted } from './ucastniciDigestReducer';
import UcastniciDigest from './UcastniciDigest';

const mapStateToProps = ({ entities, registrator }) => {
  const { fetching } = registrator.ucastniciDigest;

  // Don't forget to update areStatesEqual!
  return {
    roky: entities.rocniky.roky,
    ucastniciDigest: getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest }),
    actionPrefix: 'UCASTNICI_DIGEST',
    fetching,
    reduxName: 'ucastniciDigest'
  };
};

const areStatesEqual = (next, prev) =>
  prev.entities === next.entities &&
  prev.registrator.ucastniciDigest === next.registrator.ucastniciDigest;

const mapDispatchToProps = dispatch => ({
  fetchUcastnici: () => dispatch(fetchUcastnici())
});

const UcastniciDigestContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  areStatesEqual
})(UcastniciDigest);

export default UcastniciDigestContainer;
