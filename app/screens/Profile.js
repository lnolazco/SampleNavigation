import React, { Component } from 'react';
import { Image, Text, ScrollView, StyleSheet } from 'react-native';

import Loading from '../components/Loading';
import Button from '../components/Button';
import ImageSlider from '../components/ImageSlider';
import { getUserProfile } from '../services/search';
import { nav_actions } from '../redux/actions/types';
import { getProfileImageSource, getGalleryImageSource } from '../utils/images';

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

    onActionChat = () => {
        const { dispatch } = this.props.navigation;
        const { user } = this.state;
        dispatch({ type: nav_actions.CHAT, user })
    }

    getImages(user) {
        const images = [];
        images.push(getProfileImageSource(user.picture_rep, user.picture));
        if (user.gallery) {
            const keys = Object.keys(user.gallery);
            keys.forEach(key => {
                const { picture_rep, picture } = user.gallery[key];
                images.push(getGalleryImageSource(picture_rep, picture));
            });
        }
        console.log(images);
        return images;
    }

    render() {
        const { isLoading, user } = this.state;
        if (isLoading) {
            return <Loading />;
        }

        return (
            <ScrollView>
                <ImageSlider images={this.getImages(user)} />
                <Description text={user.desc} />
                <Button text="Chat" onPress={this.onActionChat} />
            </ScrollView>
        );
    }
}

const Description = ({ text }) => {
    return <Text stye={styles.description}>{text}</Text>;
}

const styles = StyleSheet.create({
    description: {
        marginBottom: 10,
    }
});

                    // <Button
                    //     icon={{name: 'code'}}
                    //     backgroundColor='#03A9F4'
                    //     buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    //     title='Chat'
                    //     onPress={this.onActionChat}
                    // />

export default Profile;
