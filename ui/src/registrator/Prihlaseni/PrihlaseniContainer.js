import { connect } from 'react-redux';
import { fetchUcastnici } from '../../entities/ucastnici/ucastniciActions';
import Prihlaseni from './Prihlaseni';
import { hideError, reset, saveUcast } from './PrihlaseniActions';

const mapStateToProps = state => {
  const { registrator: { prihlaseni } } = state;
  const { errorCode, errorMessage, showError, fetching, saving, ucastnikId } = prihlaseni;

  return {
    errorCode,
    errorMessage,
    showError,
    fetching,
    saving,
    existujiciUcastnik: !!ucastnikId
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUcastnici: () => dispatch(fetchUcastnici()),
  onHideError: () => dispatch(hideError()),
  onReset: () => dispatch(reset()),
  onSubmit: () => dispatch(saveUcast())
});

const PrihlaseniContainer = connect(mapStateToProps, mapDispatchToProps)(Prihlaseni);

export default PrihlaseniContainer;