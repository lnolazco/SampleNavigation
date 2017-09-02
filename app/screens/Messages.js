import React, { Component } from 'react';

import Loading from '../components/Loading';
import ListItem from '../components/ListItem';
import AnnouncementItem from '../components/AnnouncementItem';
import { getConversations } from '../services/messenger';
import { getImageSource } from '../utils/images';
import { nav_actions } from '../redux/actions/types';

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
        dispatch({ type: nav_actions.CHAT, data: item });
    }

    render() {
        const { isLoading, data } = this.state;

        if (isLoading) {
            return (<Loading />);
        }

        return (
            <ListItem>
            {
                data.map((item, index) => (
                    <AnnouncementItem
                        key={index}
                        avatarImage={getImageSource(item.picture_rep, item.picture)}
                        pseudo={item.pseudo}
                        title={item.msg}
                        id={item}
                        onSelect={this.onSelect}
                    />
                ))
            }
            </ListItem>
        );
    }
}

export default Messages;
