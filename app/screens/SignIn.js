import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

import { nav_actions } from '../redux/actions/types';
import { isSignedIn, onSignIn } from '../services/auth';

class SignIn extends Component {
    state = {
        isLoading: true,
        signedIn: false
    }

    componentWillMount() {
        isSignedIn()
            .then(signedIn => {
                console.log('signed in? === ', signedIn);

                this.setState({ isLoading: false, signedIn })

                if (signedIn) {
                    this.props.navigation.dispatch({ type: nav_actions.SIGNEDIN });
                }
            })
            .catch(err => alert("An error occurred"));
    }

    render() {
        const { dispatch } = this.props.navigation;
        const { isLoading, signedIn } = this.state;

        if (isLoading) {
            return <Loading />;
        }
        
        return (
            <View style={{ paddingVertical: 20 }}>
                <Card>
                    <FormLabel>Email</FormLabel>
                    <FormInput placeholder="Email address..." />
                    <FormLabel>Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Password..." />

                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#03A9F4"
                        title="SIGN IN"
                        onPress={() => {
                            onSignIn('cathy@lamethode.com', '123456').then(() => {
                                dispatch({ type: nav_actions.SIGNEDIN });
                            });
                        }}
                    />
                </Card>
            </View>
        );

        // return (
        //     <LoginContainer>
        //         <FormLogin>
        //             <InputEmail onChange={this.onChangeInput} />
        //             <InputPassword onChange={this.onChangePassword} />
        //             <PrimaryButton title="SIGN IN" />
        //             <SecundaryButton title="Forgot password" />
        //         </FormLogin>
        //     </LoginContainer>
        // );
    }
}

export default SignIn;
