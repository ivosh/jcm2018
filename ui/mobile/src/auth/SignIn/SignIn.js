import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';

class SignIn extends PureComponent {
  state = { password: '', username: '' };

  render = () => {
    const { signingIn } = this.props;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View styles={styles.inputContainer}>
            <TextInput
              autoCorrect={false}
              placeholder="uživatelské jméno"
              returnKeyType="next"
              style={[styles.input, styles.username]}
              textContentType="username"
              onChangeText={text => this.setState({ username: text })}
            />
          </View>
          <View styles={styles.inputContainer}>
            <TextInput
              autoCorrect={false}
              placeholder="heslo"
              returnKeyType="done"
              secureTextEntry={true}
              style={[styles.input, styles.password]}
              textContentType="password"
              onChangeText={text => this.setState({ password: text })}
            />
          </View>
          <Button
            disabled={signingIn}
            title="Přihlásit"
            onPress={() => this.props.onSubmit(this.state.username, this.state.password)}
          />
        </KeyboardAvoidingView>
      </View>
    );
  };
}

SignIn.propTypes = {
  signingIn: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 20,
    color: '#ffffff'
  },
  inputContainer: {
    borderLeftWidth: 4,
    borderRightWidth: 4,
    width: 70
  }
});
