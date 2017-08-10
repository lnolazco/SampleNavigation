import React from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-elements';

import ItemAnnouncement from './ItemAnnouncement';

export default ListAnnouncements = ({ data, onSelect }) => {
    return (
        <ScrollView>
            <List>
            {
                data.map((item, i) => (
                    <ItemAnnouncement
                        key={i}
                        item={item}
                        onSelect={onSelect}
                    />
                ))
            }
            </List>
        </ScrollView>
    );
};
