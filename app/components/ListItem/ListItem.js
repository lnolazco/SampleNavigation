import React from 'react';
import { ScrollView } from 'react-native';

const ListItem = (props) => {
    const { children } = props;

    return (
        <ScrollView>{children}</ScrollView>
    );
};

export default ListItem;
