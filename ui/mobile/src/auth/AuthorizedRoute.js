import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AuthorizedRoute extends PureComponent {
  render = () => {
    const { component: RoutedComponent, authenticated, ...rest } = this.props;

    return authenticated ? <RoutedComponent {...rest} /> : this.props.navigation.navigate('Auth');
  };
}

AuthorizedRoute.propTypes = {
  authenticated: PropTypes.bool,
  component: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired
};

AuthorizedRoute.defaultProps = {
  authenticated: false
};

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

export default connect(
  mapStateToProps,
  null
)(AuthorizedRoute);
