import React, { Component } from 'react';
import { TextInput, View } from 'react-native';

import styles from './styles';
import Button from '../Button';

class FormLogin extends Component {
    onSignIn = () => {
        const { onSignIn } = this.props;

        onSignIn(this.state.email, this.state.password)
    }

    render() {
        const { onSignUp, onForgotPassword } = this.props;

        return (
            <View style={styles.formContainer}>
                <TextInput
                    placeholder="email"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => this.setState({ email: text })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="password"
                    returnKeyType="go"
                    secureTextEntry
                    ref={(input) => this.passwordInput = input}
                    onChangeText={(text) => this.setState({ password: text })}
                    style={styles.input}
                />
                <View>
                    <Button onPress={this.onSignIn} text="SIGN IN" />
                    <Button onPress={onSignUp} text="SIGN UP" />
                    <Button onPress={onForgotPassword} text="FORGOT PASSWORD" light />
                </View>
            </View>
        );
    }
}

export default FormLogin;
