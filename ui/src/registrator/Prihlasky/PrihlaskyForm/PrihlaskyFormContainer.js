import { connect } from 'react-redux';
import PrihlaskyForm from './PrihlaskyForm';
import { hideError, hideModal, reset, saveUcast } from './PrihlaskyFormActions';

const mapStateToProps = state => {
  const { registrator: { prihlasky: { form: prihlaskyForm } } } = state;
  const { errorCode, errorMessage, showError, saved, saving, ucastnikId } = prihlaskyForm;

  return {
    errorCode,
    errorMessage,
    showError,
    saved,
    saving,
    existujiciUcastnik: !!ucastnikId
  };
};

const mapDispatchToProps = dispatch => ({
  onHideError: () => dispatch(hideError()),
  onHideModal: () => dispatch(hideModal()),
  onReset: () => dispatch(reset()),
  onSubmit: () => dispatch(saveUcast())
});

const PrihlaskyFormContainer = connect(mapStateToProps, mapDispatchToProps)(PrihlaskyForm);

export default PrihlaskyFormContainer;
