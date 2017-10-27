import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Startujici from './Startujici';

const mapStateToProps = state => {
  const serazeni = state.startujici.slice().sort((a, b) => {
    return a.cislo - b.cislo;
  });

  const hydrated = serazeni.map(startujici => {
    if (startujici.duration) {
      return { ...startujici, duration: moment.duration(startujici.duration) };
    } else {
      return startujici;
    }
  });

  return { startujici: hydrated };
};

const StartujiciConnected = connect(mapStateToProps, null)(Startujici);

StartujiciConnected.propTypes = {
  onStartujiciClick: PropTypes.func.isRequired
};

export default StartujiciConnected;
