import React from 'react';
import {
    Image,
    TouchableOpacity
} from 'react-native';

import styles from './styles';

const ImagePan = (props) => {
    const { image, index, width, height, onPress } = props;

    function onPressEvent() {
        onPress && onPress(image, index);
    }

    const imageProps = {
        source: typeof image === 'string' ? { uri: image } : image,
        style: { height, width }
    };

    return (
        <TouchableOpacity
            key={index}
            onPress={onPressEvent}
            delayPressIn={200}
        >
            <Image {...imageProps}/>
        </TouchableOpacity>
    );
};

export default ImagePan;
