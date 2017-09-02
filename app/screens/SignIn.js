import React, { Component } from 'react';
import { KeyboardAvoidingView, Linking, StyleSheet } from 'react-native';

import { nav_actions } from '../redux/actions/types';
import { isSignedIn, signIn } from '../services/auth';
import Logo from '../components/Logo';
import FormLogin from '../components/FormLogin';

class SignIn extends Component {
    state = {
        isLoading: true,
        signedIn: false
    }

    componentWillMount() {
        isSignedIn()
            .then(signedIn => {
                this.setState({ isLoading: false, signedIn })

                if (signedIn) {
                    this.props.navigation.dispatch({ type: nav_actions.SIGNEDIN });
                }
            })
            .catch(err => alert("An error occurred"));
    }

    onSignIn = (email, password) => {
        const { dispatch } = this.props.navigation;

        this.setState({ isLoading: true });

        signIn(email, password)
            .then(() => {
                dispatch({ type: nav_actions.SIGNEDIN });
            })
            .catch((err) => alert('error', err));
    }

    onSignUp() {
        const url = 'https://www.mignonne.com/inscription.php';
        Linking.openURL(url);
    }

    onForgotPassword = () => {
        this.props.navigation.dispatch({ type: nav_actions.FORGOT_PASSWORD });
    }

    render() {
        const { dispatch } = this.props.navigation;
        const { isLoading, signedIn } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Logo
                    source={require('../images/login-logo.jpg')}
                    title="React Native Boilerplate"
                />
                <FormLogin
                    onSignIn={this.onSignIn}
                    onSignUp={this.onSignUp}
                    onForgotPassword={this.onForgotPassword}
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default SignIn;
