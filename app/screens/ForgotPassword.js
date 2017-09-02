import React, { Component } from "react";
import { Button, Text, View, Picker, Item } from "react-native";

class ForgotPassword extends Component {
    state = {
        brand: "BMW"
    }
    render() {
    
    const { navigate } = this.props.navigation;

    return (
        <View>
            <Text>Forgot password</Text>
            <Button
                onPress={() => navigate('SignedIn')}
                title="SIGN IN"
            />
        </View>
    );
    }
};

export default ForgotPassword;
