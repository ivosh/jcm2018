import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

/* TODO: Could eventually redirect to original location upon successful authentication.
   Will need to dispatch window.location.pathname into Redux store and redirect here to when
   authenticated. */
class AuthorizedRoute extends PureComponent {
  render = () => {
    const { component: RouteComponent, authenticated, ...rest } = this.props;

    return authenticated ? (
      <Route {...rest} component={RouteComponent} />
    ) : (
      <Redirect to="/signin" />
    );
  };
}

AuthorizedRoute.propTypes = {
  authenticated: PropTypes.bool,
  component: PropTypes.any.isRequired // eslint-disable-line react/forbid-prop-types
};

AuthorizedRoute.defaultProps = {
  authenticated: false
};

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

export default connect(mapStateToProps, {})(AuthorizedRoute);
