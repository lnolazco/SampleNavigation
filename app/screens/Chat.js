import React, { Component } from 'react';

import ChatBox from '../components/ChatBox';
import Realtime from '../services/realtime';
import { getMessages, getMessage, sendMessage } from '../services/messenger';

let realtime = null;

class Chat extends Component {
    state = {
        messages: [],
        isTyping: false
    };

    constructor(props) {
        super(props);

        const { userid } = this.props.navigation.state.params.data;
        realtime = new Realtime(userid);
    }

    componentWillMount() {
        const { userid } = this.props.navigation.state.params.data;

        getMessages(userid).then((messages) => this.setState({ messages }));        
    }

    componentDidMount() {
        realtime.RTEventListener('onMessage',this.onMessage);
    }

    componentWillUnmount() {
        realtime.RTRemoveEventListener('onMessage');
    }

    onMessage = (data) => {
        const message = JSON.parse(data.message);

        if (message.type === 'typing') {
            this.setState({ isTyping: true });
        }
        if (message.type === 'msg') {
            getMessage(message.msg)
            .then(newMessage => {
                this.setState((previousState) => ({
                    messages: [ ...newMessage, ...previousState.messages ],
                    isTyping: false
                }));

            });
        }
    }

    onSend = (messages = []) => {
        const { userid } = this.props.navigation.state.params.data;

        sendMessage(userid, messages[0].text)
        .then(newMessage => {
            this.setState((previousState) => ({
                messages: [ ...newMessage, ...previousState.messages ]
            }));
        });
    }

    render() {
        const { senderID } = this.props.navigation.state.params.data;

        const props = {
            senderID,
            messages: this.state.messages,
            onSend: this.onSend,
            isTyping: this.state.isTyping
        };

        return <ChatBox {...props} />;    
    }
}

export default Chat;
