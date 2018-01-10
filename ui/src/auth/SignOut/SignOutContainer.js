import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignOut from './SignOut';
import { signOut } from './SignOutActions';

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
});

const SignOutContainer = connect(mapStateToProps, mapDispatchToProps)(SignOut);

SignOutContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default SignOutContainer;
