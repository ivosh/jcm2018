import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import momentPropTypes from 'react-moment-proptypes';
import StartCisloInput from './StartCisloInput';
import { removeMezicas } from '../Mezicasy/MezicasyActions';
import { dokonceno } from '../Startujici/StartujiciActions';
import { getStartujiciWithoutDuration } from '../Startujici/startujiciReducer';

const mapStateToProps = state => ({
  startujici: getStartujiciWithoutDuration(state.startujici)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCisloSubmitted: startujiciId => {
    dispatch(removeMezicas(ownProps.mezicasId));
    dispatch(dokonceno(startujiciId, ownProps.duration));
  }
});

const StartCisloInputConnected = connect(mapStateToProps, mapDispatchToProps)(StartCisloInput);

StartCisloInputConnected.propTypes = {
  mezicasId: PropTypes.number.isRequired,
  duration: momentPropTypes.momentDurationObj.isRequired
};

export default StartCisloInputConnected;
