import React, { Component } from 'react';

import Loading from '../components/Loading';
import ListItem from '../components/ListItem';
import AnnouncementItem from '../components/AnnouncementItem';
import { getUsers } from '../services/search';
import { getImageSource } from '../utils/images';
import { nav_actions } from '../redux/actions/types';

class List extends Component {
    state = {
        isLoading: true
    }

    componentWillMount() {
        getUsers(this.props.navigation.state.params.filter)
            .then((data) => {
                this.setState({
                    isLoading: false,
                    data
                });
            });
    }

    onSelect = (id) => {
        const { dispatch } = this.props.navigation;

        dispatch({ type: nav_actions.PROFILE, id })
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
                        title={item.title}
                        id={item.inscID}
                        onSelect={this.onSelect}
                    />
                ))
            }
            </ListItem>
        );
    }
}

export default List;
