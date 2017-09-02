import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Avatar = (props) => {
    const { imageSource } = props;

    return (
        <View style={styles.container}>
            <Image
                source={imageSource}
                style={styles.image}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    container: {
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#d6d7da',
    }
});

export default Avatar;
