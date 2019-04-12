import { connect } from 'react-redux';
import { hideError } from './ErrorInModalActions';
import ErrorInModal from './ErrorInModal';

const mapStateToProps = state => ({ ...state.error });

const mapDispatchToProps = dispatch => ({
  onHide: () => dispatch(hideError())
});

const ErrorInModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorInModal);

export default ErrorInModalContainer;
