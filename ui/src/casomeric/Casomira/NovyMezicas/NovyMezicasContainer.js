import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveStopky, stopkyInsertMezicas } from '../../Stopky/StopkyProTyp/StopkyProTypActions';
import { hide, show } from './NovyMezicasActions';
import NovyMezicas from './NovyMezicas';

const mapStateToProps = (state, ownProps) => {
  const { typ } = ownProps;

  const novyMezicas = state.casomeric.novyMezicas[typ];
  return { showing: novyMezicas.showing };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { typ } = ownProps;

  return {
    onHide: () => dispatch(hide(typ)),
    onShow: () => dispatch(show(typ)),
    onSubmit: cas => dispatch(saveStopky({ action: stopkyInsertMezicas({ cas }), typ }))
  };
};

const NovyMezicasContainer = connect(mapStateToProps, mapDispatchToProps)(NovyMezicas);

NovyMezicasContainer.propTypes = {
  typ: PropTypes.string.isRequired
};

export default NovyMezicasContainer;
