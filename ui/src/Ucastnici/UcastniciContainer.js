import { connect } from 'react-redux';
import UcastniciResponsive from './UcastniciResponsive';
import { fetchUcastnici } from './UcastniciActions';
import { getUcastniciOverviewSorted } from './ucastniciReducer';

const mapStateToProps = ({ ucastnici }) => ({
  ucastnici: getUcastniciOverviewSorted(ucastnici)
});

const mapDispatchToProps = dispatch => ({
  fetchUcastnici: () => {
    dispatch(fetchUcastnici());
  }
});

const UcastniciContainer = connect(mapStateToProps, mapDispatchToProps)(UcastniciResponsive);

export default UcastniciContainer;
