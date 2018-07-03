import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

class UnauthorizedRoute extends PureComponent {
  render = () => {
    const { component: RouteComponent, authenticated, ...rest } = this.props;

    return authenticated ? <Redirect to="/" /> : <Route {...rest} component={RouteComponent} />;
  };
}

UnauthorizedRoute.propTypes = {
  authenticated: PropTypes.bool,
  component: PropTypes.any.isRequired
};

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

export default connect(
  mapStateToProps,
  {}
)(UnauthorizedRoute);
