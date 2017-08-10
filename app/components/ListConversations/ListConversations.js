import React from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-elements';

import Conversation from './Conversation';

export default ListConversations = ({ data, onSelect }) => {
    return (
        <ScrollView>
            <List>
            {
                data.map((item, i) => (
                    <Conversation
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
