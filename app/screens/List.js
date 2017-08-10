import React, { Component } from 'react';

import Loading from '../components/Loading';
import { getUsers } from '../services/users';
import { nav_actions } from '../redux/actions/types';
import ListAnnouncements from '../components/ListAnnouncements';

class List extends Component {
    state = {
        isLoading: true
    }

    componentWillMount() {
        getUsers()
        .then((data) => {
            this.setState({
                isLoading: false,
                data
            });
        });
    }

    onSelect = (item) => {
        const { dispatch } = this.props.navigation;

        dispatch({ type: nav_actions.PROFILE, id: item.inscID })
    }

    render() {
        const { isLoading, data } = this.state;

        if (isLoading) {
            return (<Loading />);
        }

        return (
            <ListAnnouncements
                data={data}
                onSelect={this.onSelect}
            />                
        );
    }
}

export default List;
