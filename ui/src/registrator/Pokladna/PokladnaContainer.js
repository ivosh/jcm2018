import { connect } from 'react-redux';
import { getPokladna } from './pokladnaReducer';
import Pokladna from './Pokladna';

const mapStateToProps = ({ entities }) => ({ pokladna: getPokladna({ ...entities }) });

const PokladnaContainer = connect(
  mapStateToProps,
  {}
)(Pokladna);

export default PokladnaContainer;
