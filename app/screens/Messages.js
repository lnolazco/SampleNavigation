import React, { Component } from 'react';

import Loading from '../components/Loading';
import { getConversations } from '../services/messenger';
import { nav_actions } from '../redux/actions/types';
import ListConversations from '../components/ListConversations';

class Messages extends Component {
    state = {
        isLoading: true
    }

    componentWillMount() {
        getConversations()
        .then((data) => {
            this.setState({
                isLoading: false,
                data
            });
        });
    }

    onSelect = (item) => {
        const { dispatch } = this.props.navigation;
        console.log('Selected ', item);
        dispatch({ type: nav_actions.CHAT, id: item.userid, inscID: item.destID })
    }

    render() {
        const { isLoading, data } = this.state;

        if (isLoading) {
            return (<Loading />);
        }

        return (
            <ListConversations
                data={data}
                onSelect={this.onSelect}
            />                
        );
    }
}

export default Messages;
