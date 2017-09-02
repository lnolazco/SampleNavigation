import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Logo = ({ source, title }) => {
    return (
        <View style={styles.logoContainer}>
            <Image
                style={styles.logo}
                source={source}
            />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 250,
        height: 250
    },
    title: {
        color: 'black',
        marginTop: 10,
        fontSize: 24
    }
});

export default Logo;
