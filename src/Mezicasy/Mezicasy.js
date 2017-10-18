import { connect } from 'react-redux';
import MezicasyView from './MezicasyView';
import { removeMezicas } from './MezicasyActions';

const mapStateToProps = state => ({
  mezicasy: state.mezicasy
});

const mapDispatchToProps = dispatch => ({
  onRemoveMezicas: id => {
    dispatch(removeMezicas(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MezicasyView);
