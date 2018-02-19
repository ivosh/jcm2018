import { connect } from 'react-redux';
import { getUcastniciDigestSorted } from './ucastniciDigestReducer';
import UcastniciDigest from './UcastniciDigest';

// Don't forget to update areStatesEqual!
const mapStateToProps = ({ entities, registrator }) => ({
  roky: entities.rocniky.roky,
  ucastniciDigest: getUcastniciDigestSorted({ ...entities, ...registrator.ucastniciDigest }),
  actionPrefix: 'UCASTNICI_DIGEST',
  reduxName: 'ucastniciDigest'
});

const areStatesEqual = (next, prev) =>
  prev.entities === next.entities &&
  prev.registrator.ucastniciDigest === next.registrator.ucastniciDigest;

const UcastniciDigestContainer = connect(mapStateToProps, null, null, {
  areStatesEqual
})(UcastniciDigest);

export default UcastniciDigestContainer;
