import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { saveStopky, stopkyInsertMezicas } from '../../Stopky/StopkyProTyp/StopkyProTypActions';
import { hide, inputChanged, show } from './NovyMezicasActions';
import { casValid } from './novyMezicasReducer';
import NovyMezicas from './NovyMezicas';

const mapStateToProps = (state, ownProps) => {
  const { typ } = ownProps;

  const novyMezicas = state.casomeric.novyMezicas[typ];
  const { cas, showing } = novyMezicas;
  const validationState = casValid(novyMezicas);

  return { cas, showing, validationState };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { typ } = ownProps;

  return {
    onHide: () => dispatch(hide(typ)),
    onInputChange: event => dispatch(inputChanged(typ)(event)),
    onShow: () => dispatch(show(typ)),
    onSubmit: cas => {
      const duration = moment.duration(cas.replace(',', '.'));
      dispatch(saveStopky({ action: stopkyInsertMezicas({ cas: duration }), typ }));
    }
  };
};

const NovyMezicasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NovyMezicas);

NovyMezicasContainer.propTypes = {
  typ: PropTypes.string.isRequired
};

export default NovyMezicasContainer;
