import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Circle } from 'react-native-progress';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
});

export default Loading = () => {
    return (
        <View style={styles.container}>
            <Circle size={60} indeterminate={true} />
        </View>
    );
};
