import { connect } from 'react-redux';
import { fetchUcastnici } from '../../../entities/ucastnici/ucastniciActions';
import PrihlaskyForm from './PrihlaskyForm';
import { hideError, hideModal, reset, saveUcast } from './PrihlaskyFormActions';

const mapStateToProps = state => {
  const { registrator: { prihlasky: { form: prihlaskyForm } } } = state;
  const { errorCode, errorMessage, showError, fetching, saved, saving, ucastnikId } = prihlaskyForm;

  return {
    errorCode,
    errorMessage,
    showError,
    fetching,
    saved,
    saving,
    existujiciUcastnik: !!ucastnikId
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUcastnici: () => dispatch(fetchUcastnici()),
  onHideError: () => dispatch(hideError()),
  onHideModal: () => dispatch(hideModal()),
  onReset: () => dispatch(reset()),
  onSubmit: () => dispatch(saveUcast())
});

const PrihlaskyFormContainer = connect(mapStateToProps, mapDispatchToProps)(PrihlaskyForm);

export default PrihlaskyFormContainer;
