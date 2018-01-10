import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* TODO: Could eventually redirect to original location upon successful authentication.
   Will need to dispatch window.location.pathname into Redux store and redirect here to when
   authenticated. */
const withAuth = WrappedComponent => {
  class WithAuthComponent extends Component {
    constructor(props) {
      super(props);

      if (!this.props.authenticated) {
        this.props.history.push('/signin');
      }
    }

    componentWillReceiveProps = nextProps => {
      if (!nextProps.authenticated) {
        this.props.history.push('/signin');
      }
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  WithAuthComponent.propTypes = {
    authenticated: PropTypes.bool,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
  });

  return connect(mapStateToProps)(WithAuthComponent);
};

export default withAuth;
