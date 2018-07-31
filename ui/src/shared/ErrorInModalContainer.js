import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideError } from './ErrorInModalActions';
import ErrorInModal from './ErrorInModal';

const mapStateToProps = (state, ownProps) => ({ ...state.error, ...ownProps });

const mapDispatchToProps = dispatch => ({
  onHide: () => dispatch(hideError())
});

const ErrorInModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorInModal);

ErrorInModalContainer.propTypes = {
  title: PropTypes.string.isRequired
};

export default ErrorInModalContainer;
