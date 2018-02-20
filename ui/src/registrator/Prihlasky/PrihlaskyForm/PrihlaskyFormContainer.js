import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PrihlaskyForm from './PrihlaskyForm';
import {
  hideError,
  hideModal,
  loadUcastnik,
  reset as resetAction,
  saveUcast
} from './PrihlaskyFormActions';

const mapStateToProps = (state, ownProps) => {
  const { entities, registrator: { prihlasky: { form: prihlaskyForm } } } = state;
  const { reset } = ownProps;
  const { errorCode, errorMessage, showError, saved, saving, ucastnikId } = prihlaskyForm;

  return {
    entities,
    errorCode,
    errorMessage,
    showError,
    saved,
    saving,
    existujiciUcastnik: !!ucastnikId,
    reset
  };
};

const mapDispatchToProps = dispatch => ({
  onHideError: () => dispatch(hideError()),
  onHideModal: () => dispatch(hideModal()),
  onReset: () => dispatch(resetAction()),
  onSubmit: () => dispatch(saveUcast()),
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { entities, ...restOfStateProps } = stateProps;
  const { dispatch, ...restOfDispatchProps } = dispatchProps;
  const { loadId } = ownProps;

  const result = { ...restOfStateProps, ...restOfDispatchProps };
  if (loadId) {
    result.onLoadId = () => dispatch(loadUcastnik({ id: loadId, ...entities }));
  }
  return result;
};

const PrihlaskyFormContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  PrihlaskyForm
);

PrihlaskyFormContainer.propTypes = {
  loadId: PropTypes.string,
  reset: PropTypes.bool
};

export default PrihlaskyFormContainer;
