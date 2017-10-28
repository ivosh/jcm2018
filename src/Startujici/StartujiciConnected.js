import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Startujici from './Startujici';
import { getStartujiciSorted } from './startujiciReducer';

const mapStateToProps = state => {
  return { startujici: getStartujiciSorted(state.startujiciReducer) };
};

const StartujiciConnected = connect(mapStateToProps, null)(Startujici);

StartujiciConnected.propTypes = {
  onStartujiciClick: PropTypes.func.isRequired
};

export default StartujiciConnected;
