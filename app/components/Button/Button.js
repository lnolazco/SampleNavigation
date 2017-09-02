import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

const Button = ({ text, light = false, onPress }) => (
    <TouchableOpacity
        style={light? styles.buttonLight : styles.button}
        onPress={onPress}>
        <Text style={light ? styles.buttonTextBlue : styles.buttonText}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#009cdc',
        paddingVertical: 10,
        marginBottom: 10
    },
    buttonLight: {
        paddingVertical: 10,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonTextBlue: {
        color: '#009cdc',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default Button;
