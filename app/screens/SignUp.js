import React, { Component } from "react";
import { Button, Text, View } from "react-native";

const SignIn = (props) => {
    const { navigate } = props.navigation;

    return (
        <View>
            <Text>
                Register SCREEN!
            </Text>
            <Button
                onPress={() => navigate('SignedIn')}
                title="SIGN IN"
            />
        </View>
    );
};

export default SignIn;
