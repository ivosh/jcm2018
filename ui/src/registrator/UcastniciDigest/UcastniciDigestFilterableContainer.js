import { connect } from 'react-redux';
import UcastniciDigestFilterable from './UcastniciDigestFilterable';
import { filterChange } from './UcastniciDigestActions';

const mapDispatchToProps = dispatch => ({
  onFilterChange: filter => dispatch(filterChange(filter))
});

/* Redux state 'filter' is not mapped to props deliberately: UcastniciDigestFilterable does not
   want to preserve its state accross updates. */
const UcastniciDigestFilterableContainer = connect(null, mapDispatchToProps)(
  UcastniciDigestFilterable
);

export default UcastniciDigestFilterableContainer;
