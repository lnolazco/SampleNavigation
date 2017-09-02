import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

class ChatBox extends PureComponent {

    renderFooter = () => {
        const { isTyping } = this.props;
        if (isTyping) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        ...is typing
                    </Text>
                </View>
            );
        }
        return null;
    }

    render() {
        const { senderID, messages, onSend } = this.props;

        return (
            <GiftedChat
                messages={messages}
                onSend={onSend}
                user={{
                    _id: `${senderID}`,
                }}
                renderFooter={this.renderFooter}
            />
        );        
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
    },
});

export default ChatBox;
