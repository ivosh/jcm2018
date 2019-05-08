import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActivityIndicator, StatusBar, View } from 'react-native';

// :TODO: use useEffect
class AuthCheck extends PureComponent {
  componentDidMount = () => {
    const { authenticated, navigation } = this.props;
    // :TODO: check expiration as well
    navigation.navigate(authenticated ? 'App' : 'Auth');
  };

  render = () => (
    <View>
      <ActivityIndicator />
      <StatusBar />
    </View>
  );
}

AuthCheck.propTypes = {
  authenticated: PropTypes.bool,
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired
};

AuthCheck.defaultProps = {
  authenticated: false
};

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

export default connect(
  mapStateToProps,
  null
)(AuthCheck);
