import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card, Button } from 'react-native-elements'

import Loading from '../components/Loading';
import { getUserProfile } from '../services/users';
import { nav_actions } from '../redux/actions/types';

class Profile extends Component {
    state = {
        isLoading: true
    }

    componentWillMount() {
        const { id } = this.props.navigation.state.params;

        getUserProfile(id)
        .then(user => this.setState({
            isLoading: false,
            user
        }));
    }

    getImage(picture, picture_rep) {
        const imageUrl = 'https://71ea.https.cdn.softlayer.net/8071EA/cdn/menu_thumbs/';
        const noImage = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

        return !picture ? noImage : `${imageUrl}${picture_rep}/${picture}`;
    }

    render() {
        const { isLoading, user } = this.state;
        if (isLoading) {
            return <Loading />;
        }
        const { dispatch } = this.props.navigation;

        return (
            <View>
                <Card
                    title={ user.title }
                    image={{ uri: this.getImage(user.picture, user.picture_rep)}}>
                    <Text style={{marginBottom: 10}}>
                        {user.desc}
                    </Text>
                    <Button
                        icon={{name: 'code'}}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Chat'
                        onPress={() => dispatch({ type: nav_actions.CHAT, user })}
                    />
                </Card>
            </View>
        );
    }
}

export default Profile;
