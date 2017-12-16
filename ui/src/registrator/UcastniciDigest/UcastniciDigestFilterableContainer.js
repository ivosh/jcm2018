import { connect } from 'react-redux';
import UcastniciDigestFilterable from './UcastniciDigestFilterable';
import { filterChange } from './UcastniciDigestActions';

const mapStateToProps = ({ registrator }) => {
  const { filter } = registrator.ucastniciDigest;
  return { filter };
};

const mapDispatchToProps = dispatch => ({
  onFilterChange: filter => dispatch(filterChange(filter))
});

const UcastniciDigestFilterableContainer = connect(mapStateToProps, mapDispatchToProps)(
  UcastniciDigestFilterable
);

export default UcastniciDigestFilterableContainer;
