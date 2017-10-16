import { connect } from 'react-redux';
import StopkyView from './StopkyView';
import { stopkyStart, stopkyStop } from './StopkyActions';

const mapStateToProps = state => {
  return { base: state.base };
};

const mapDispatchToProps = dispatch => {
  return {
    startAction: base => {
      dispatch(stopkyStart(base));
    },
    stopAction: () => {
      dispatch(stopkyStop());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StopkyView);
