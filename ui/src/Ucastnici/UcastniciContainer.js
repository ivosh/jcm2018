import { connect } from 'react-redux';
import Ucastnici from './Ucastnici';
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

const UcastniciContainer = connect(mapStateToProps, mapDispatchToProps)(Ucastnici);

export default UcastniciContainer;
