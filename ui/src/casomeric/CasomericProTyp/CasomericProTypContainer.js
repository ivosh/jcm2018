import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CasomericProTyp from './CasomericProTyp';
import { addMezicas } from '../Mezicasy/MezicasyActions';

const mapStateToProps = (state, ownProps) => ({ typ: ownProps.typ });

const mapDispatchToProps = dispatch => ({
  onAddMezicas: duration => {
    dispatch(addMezicas(duration));
  }
});

const CasomericProTypContainer = connect(mapStateToProps, mapDispatchToProps)(CasomericProTyp);

CasomericProTypContainer.propTypes = {
  typ: PropTypes.string.isRequired
};

export default CasomericProTypContainer;
