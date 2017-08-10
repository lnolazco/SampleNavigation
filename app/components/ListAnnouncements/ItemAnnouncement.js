import React, { PureComponent } from 'react';

import { ListItem, Avatar } from 'react-native-elements';

class ItemAnnouncement extends PureComponent {
    getAvatar(picture, picture_rep) {
        const imageUrl = 'https://71ea.https.cdn.softlayer.net/8071EA/cdn/menu_thumbs/';
        const noImage = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

        return !picture ? noImage : `${imageUrl}${picture_rep}/${picture}`;
    }

    onPress = () => {
        const { item, onSelect } = this.props;

        onSelect(item);
    }

    render() {
        const { item } = this.props;

        return (
            <ListItem
                avatar={
                    <Avatar
                        small
                        source={{uri: this.getAvatar(item.picture, item.picture_rep)}}
                    />
                }
                title={item.pseudo}
                subtitle={item.title}
                onPress={this.onPress}
            />
        );

    }
}

export default ItemAnnouncement;
