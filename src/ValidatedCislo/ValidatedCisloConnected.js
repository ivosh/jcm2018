import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ValidatedCislo from './ValidatedCislo';
import { removeMezicas } from '../Mezicasy/MezicasyActions';
import { dokonceno } from '../Startujici/StartujiciActions';

const mapStartujici = startujici => {
  return startujici.map(startujici => {
    return { id: startujici.id, cislo: startujici.cislo, dokonceno: startujici.dokonceno };
  });
};

const mapStateToProps = state => ({
  startujici: mapStartujici(state.startujici)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCisloSubmitted: startujiciId => {
    dispatch(removeMezicas(ownProps.mezicasId));
    dispatch(dokonceno(startujiciId, ownProps.duration));
  }
});

const ValidatedCisloConnected = connect(mapStateToProps, mapDispatchToProps)(ValidatedCislo);

ValidatedCisloConnected.propTypes = {
  mezicasId: PropTypes.number.isRequired,
  duration: PropTypes.object.isRequired
};

export default ValidatedCisloConnected;
