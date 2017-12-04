import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import momentPropTypes from 'react-moment-proptypes';
import StartCisloInput from './StartCisloInput';
import { removeMezicas } from '../Mezicasy/MezicasyActions';
import { startujiciDokonceno } from '../Startujici/StartujiciActions';
import { getStartujiciWithoutDuration } from '../Startujici/startujiciReducer';

const mapStateToProps = state => ({
  startujici: getStartujiciWithoutDuration(state.startujici)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCisloSubmitted: startujiciId => {
    dispatch(removeMezicas(ownProps.mezicasId));
    dispatch(startujiciDokonceno(startujiciId, ownProps.duration));
  }
});

const StartCisloInputContainer = connect(mapStateToProps, mapDispatchToProps)(StartCisloInput);

StartCisloInputContainer.propTypes = {
  mezicasId: PropTypes.number.isRequired,
  duration: momentPropTypes.momentDurationObj.isRequired
};

export default StartCisloInputContainer;
