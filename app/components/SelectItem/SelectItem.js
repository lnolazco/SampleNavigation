import React, { Component } from 'react';
import { ScrollView, Modal, TouchableHighlight, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

class SelectItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            selectedValue: props.selectedValue
        };
    }

    setModalVisible(visible, value) {
        this.setState({ modalVisible: visible, selectedValue: value });
    }

    renderModal = () => {
        const { data, onSelect } = this.props;
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => console.log('close modal')}
            >
                <View style={styles.modalContainer}>
                    <View>
                        <Text style={styles.selectTitle}>Select</Text>
                        <ScrollView>
                        {
                            data.map((item, index) => (
                                <TouchableHighlight
                                    key={index}
                                    style={styles.rows}
                                    onPress={() => {
                                        onSelect(item.value);
                                        this.setModalVisible(!this.state.modalVisible, item.value)
                                }}>
                                    <Text>{item.label}</Text>
                                </TouchableHighlight>
                            ))
                        }
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    }
    render() {
        const { data, text } = this.props;
        const { selectedValue } = this.state;

        const index = selectedValue && data.findIndex(item => item.value === selectedValue);
        const selectedLabel = index !== null && index > -1 ? data[index].label : 'All';

        return (
            <View>
                {this.renderModal()}
                <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                    <View style={styles.textContainter}>
                        <Text style={styles.label}>{text}</Text>
                        <Text style={styles.value}>{selectedLabel}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textContainter: {
        flexDirection: 'row',
        padding: 10,
    },
    label: {
        flex: 1,
        textAlign: 'left'
    },
    value: {
        flex: 1,
        textAlign: 'right',
        color: 'gray'
    },
    modalContainer:{
        marginTop: 22
    },
    selectTitle: {
        fontSize: 20,
        backgroundColor: 'beige',
        padding: 15
    },
    rows: {
        padding: 10
    }
});

export default SelectItem;
