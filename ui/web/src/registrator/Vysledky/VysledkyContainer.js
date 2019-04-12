import { connect } from 'react-redux';
import { getVysledky } from './vysledkyReducer';
import Vysledky from './Vysledky';

const mapStateToProps = ({ entities }) => ({ vysledky: getVysledky({ ...entities }) });

const VysledkyContainer = connect(
  mapStateToProps,
  {}
)(Vysledky);

export default VysledkyContainer;
