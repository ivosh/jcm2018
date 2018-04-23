import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CasomiraProTyp from './CasomiraProTyp';
import { addMezicas } from '../Mezicasy/MezicasyActions';

const mapStateToProps = (state, ownProps) => ({ typ: ownProps.typ });

const mapDispatchToProps = dispatch => ({
  onAddMezicas: duration => {
    dispatch(addMezicas(duration));
  }
});

const CasomiraProTypContainer = connect(mapStateToProps, mapDispatchToProps)(CasomiraProTyp);

CasomiraProTypContainer.propTypes = {
  typ: PropTypes.string.isRequired
};

export default CasomiraProTypContainer;
