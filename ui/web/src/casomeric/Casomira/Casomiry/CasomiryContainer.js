import { connect } from 'react-redux';
import { getCasomiry } from './casomiryReducer';
import { removeCasomira } from './CasomiryActions';
import Casomiry from './Casomiry';

const mapStateToProps = (state) => ({ casomiry: getCasomiry(state.casomeric.casomiry) });

const mapDispatchToProps = (dispatch) => ({
  onRemoveCasomira: (casomira) => dispatch(removeCasomira(casomira)),
});

const CasomiryContainer = connect(mapStateToProps, mapDispatchToProps)(Casomiry);

export default CasomiryContainer;
