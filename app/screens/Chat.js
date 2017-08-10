import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import { getMessages, getRealtimeToken, getMessage } from '../services/messenger';
import realtime from '../services/RCTRealtimeMessagingIOS';

const RCTRealtimeMessaging = new realtime();


class Chat extends Component {
    state = {
        messages: [],
        isTyping: false
    };

    token = '';

    componentWillMount() {
        getMessages(this.props.navigation.state.params.id)
            .then((data) => {
                data.reverse();
                const messages = data.map(msg => ({
                    _id: msg.id,
                    text: msg.msg,
                    createdAt: new Date(msg.date),
                    user: {
                        _id: msg.senderID,
                        name: msg.pseudo
                    }
                }));

                this.setState({ messages });
            });
        
        getRealtimeToken().then(token => this.doConnect(token));
    }

    componentWillUnmount() {
        RCTRealtimeMessaging.RTDisconnect();
    }

    doConnect = (token) => {
        RCTRealtimeMessaging.RTEventListener('onConnected', this.onConnected);
        RCTRealtimeMessaging.RTEventListener('onSubscribed',this.onSubscribed);
        RCTRealtimeMessaging.RTEventListener('onMessage',this.onMessage);
    
        RCTRealtimeMessaging.RTConnect(
        {
            appKey: 'U75F9V',
            token,
            connectionMetadata: token,
            clusterUrl: 'https://ortc-developers.realtime.co/server/ssl/2.1'
        });

        this.token = token;
    }

    onConnected = () => {
        console.log('connected');
        const { inscID } = this.props.navigation.state.params;
        const channel = `users:${inscID}`;

        console.log('channel ', channel);

        //suscribe:
        RCTRealtimeMessaging.RTSubscribe(channel, true);
    }

    onSubscribed = () => {
        console.log('onSubscribed');
    }

    onMessage = (data) => {
        const message = JSON.parse(data.message)
        console.log('message: ', message);

        if (message.type === 'typing') {
            this.setState({ isTyping: true });
        }
        if (message.type === 'msg') {
            getMessage(message.msg)
            .then(msg => {
                const newMessage = [
                    {
                        _id: msg.id,
                        text: msg.msg,
                        createdAt: new Date(msg.date),
                        user: {
                            _id: msg.senderID,
                            name: msg.pseudo
                        }
                    }
                ];
                this.setState((previousState) => ({
                    messages: GiftedChat.append(previousState.messages, newMessage),
                    isTyping: false
                }));

            });
        }
    }

    onSend = (messages = []) => {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    renderFooter = () => {
        if (this.state.isTyping) {
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
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderFooter={this.renderFooter}
            />
        );        
    }
}

export default Chat;

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
