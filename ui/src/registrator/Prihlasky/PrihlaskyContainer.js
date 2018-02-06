import { connect } from 'react-redux';
import { fetchUcastnici } from '../../entities/ucastnici/ucastniciActions';
import Prihlasky from './Prihlasky';
import { hideError, hideModal, reset, saveUcast } from './PrihlaskyActions';

const mapStateToProps = state => {
  const { registrator: { prihlasky } } = state;
  const { errorCode, errorMessage, showError, fetching, saved, saving, ucastnikId } = prihlasky;

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

const PrihlaskyContainer = connect(mapStateToProps, mapDispatchToProps)(Prihlasky);

export default PrihlaskyContainer;
