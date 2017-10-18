import { connect } from 'react-redux';
import Mezicasy from './Mezicasy';
import { removeMezicas } from './MezicasyActions';

const mapStateToProps = state => ({
  mezicasy: state.mezicasy
});

const mapDispatchToProps = dispatch => ({
  onRemoveMezicas: id => {
    dispatch(removeMezicas(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Mezicasy);
