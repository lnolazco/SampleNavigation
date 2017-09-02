import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

import Avatar from '../Avatar';

const AnnouncementItem = (props) => {
    const { avatarImage, pseudo, title, id, onSelect } = props;

    function onPress() {
        onSelect(id);
    }

    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.container}>
                <Avatar imageSource={avatarImage} />
                <View style={styles.description}>
                    <Text style={styles.pseudo}>{pseudo}</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>        
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap', 
        flexDirection:'row',
        padding: 3,
        borderBottomColor: 'grey',
        borderBottomWidth: .5,
    },
    description: {
        paddingLeft: 5,
    },
    pseudo: {
        fontSize: 14
    },
    title: {
        fontSize: 12,
        color: 'gray'
    }
});

export default AnnouncementItem;
