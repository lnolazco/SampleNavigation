import React from 'react';
import {
    View,
    TouchableHighlight
} from 'react-native';

import styles from './styles';

const ImageButton = (props) => {
    const { onChange, index, selected } = props;
    const stylesButton = [ styles.button, selected && styles.buttonSelected ];

    function onPress() {
        onChange(index);
    }

    return (
        <TouchableHighlight
            underlayColor="#ccc"
            onPress={onPress}
            style={stylesButton}>
            <View></View>
        </TouchableHighlight>
    );
};

export default ImageButton;
