import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

const Home = props => {
    const { navigate } = props.navigation;

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                Welcome to React Native Navigation Sample!
            </Text>
        </View>
    );
};

export default Home;