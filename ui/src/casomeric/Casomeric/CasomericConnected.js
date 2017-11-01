import { connect } from 'react-redux';
import Casomeric from './Casomeric';
import { addMezicas } from '../Mezicasy/MezicasyActions';

const mapDispatchToProps = dispatch => ({
  onAddMezicas: duration => {
    dispatch(addMezicas(duration));
  }
});

export default connect(undefined, mapDispatchToProps)(Casomeric);
