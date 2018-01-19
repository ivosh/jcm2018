import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const withoutAuth = WrappedComponent => {
  class WithoutAuthComponent extends Component {
    constructor(props) {
      super(props);

      if (this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    componentWillReceiveProps = nextProps => {
      if (nextProps.authenticated) {
        this.props.history.push('/');
      }
    };

    render = () => <WrappedComponent {...this.props} />;
  }

  WithoutAuthComponent.propTypes = {
    authenticated: PropTypes.bool,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
  });

  return connect(mapStateToProps)(WithoutAuthComponent);
};

export default withoutAuth;