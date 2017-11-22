import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Startujici from './Startujici';
import { getStartujiciSorted } from './startujiciReducer';

const mapStateToProps = state => ({
  startujici: getStartujiciSorted(state.startujici)
});

const StartujiciContainer = connect(mapStateToProps, null)(Startujici);

StartujiciContainer.propTypes = {
  onStartujiciClick: PropTypes.func.isRequired
};

export default StartujiciContainer;
