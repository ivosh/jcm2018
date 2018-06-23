import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createReset as createResetNovaPlatba } from '../Platby/PlatbyActions';
import PrihlaskyForm from './PrihlaskyForm';
import {
  createHideError,
  createHideModal,
  createLoadUcastnik,
  createReset as createResetForm,
  createSaveUcast
} from './PrihlaskyFormActions';

const mapStateToProps = (state, ownProps) => {
  const { actionPrefix, reduxName, reset } = ownProps;
  const {
    entities,
    registrator: {
      [reduxName]: { form }
    }
  } = state;
  const { errorCode, errorMessage, showError, saved, saving, ucastnikId } = form;

  return {
    actionPrefix,
    entities,
    errorCode,
    errorMessage,
    reduxName,
    showError,
    saved,
    saving,
    existujiciUcastnik: !!ucastnikId,
    reset
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { actionPrefix, reduxName } = ownProps;

  return {
    onHideError: () => dispatch(createHideError(actionPrefix)()),
    onHideModal: () => dispatch(createHideModal(actionPrefix)()),
    onReset: rocniky => {
      dispatch(createResetForm({ actionPrefix })({ rocniky }));
      dispatch(createResetNovaPlatba({ actionPrefix })({ rocniky }));
    },
    onSubmit: () => dispatch(createSaveUcast(actionPrefix, reduxName)()),
    dispatch
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { actionPrefix, entities, ...restOfStateProps } = stateProps;
  const { dispatch, onReset, ...restOfDispatchProps } = dispatchProps;
  const { loadId } = ownProps;

  const result = {
    actionPrefix,
    ...restOfStateProps,
    onReset: () => onReset(entities.rocniky),
    ...restOfDispatchProps
  };
  if (loadId) {
    result.onLoadId = () =>
      dispatch(createLoadUcastnik({ actionPrefix })({ id: loadId, ...entities }));
  }
  return result;
};

const PrihlaskyFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(PrihlaskyForm);

PrihlaskyFormContainer.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  loadId: PropTypes.string,
  reduxName: PropTypes.string.isRequired,
  reset: PropTypes.bool
};

export default PrihlaskyFormContainer;
