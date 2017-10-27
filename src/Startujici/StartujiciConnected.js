import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Startujici from './Startujici';

const mapStateToProps = state => ({
  startujici: state.startujici.slice().sort((a, b) => {
    return a.cislo - b.cislo;
  })
});

const StartujiciConnected = connect(mapStateToProps, null)(Startujici);

StartujiciConnected.propTypes = {
  onStartujiciClick: PropTypes.func.isRequired
};

export default StartujiciConnected;
