import React from 'react';
import { View } from 'react-native';
import { Circle } from 'react-native-progress';

export default Loading = () => {
    return (
        <View>
            <Circle size={60} indeterminate={true} />
        </View>
    );
};
