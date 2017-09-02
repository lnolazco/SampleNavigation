import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    ScrollView,
    Animated,
    PanResponder,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import styles from './styles';
import ImagePan from './ImagePan';
import ImageButton from './ImageButton';

class ImageSlider extends Component {
    state = {
        position: 0,
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
        scrolling: false,
    }

    componentDidUpdate(prevProps) {
        if (prevProps.position !== this.props.position) {
            this._move(this.props.position);
        }
    }

    componentWillMount() {
        const width = this.state.width;

        let release = (e, gestureState) => {
            const width = this.state.width;
            const relativeDistance = gestureState.dx / width;
            const vx = gestureState.vx;
            let change = 0;

            if (relativeDistance < -0.5 || (relativeDistance < 0 && vx <= 0.5)) {
                change = 1;
            } else if (relativeDistance > 0.5 || (relativeDistance > 0 && vx >= 0.5)) {
                change = -1;
            }
            const position = this._getPosition();
            if (position === 0 && change === -1) {
                change = 0;
            } else if (position + change >= this.props.images.length) {
                change = (this.props.images.length) - (position + change);
            }
            this._move(position + change);
            return true;
        };

        this._panResponder = PanResponder.create({
            onPanResponderRelease: release
        });

        this._interval = setInterval(() => {
            const newWidth = Dimensions.get('window').width;
            if (newWidth !== this.state.width) {
                this.setState({width: newWidth});
            }
        }, 16);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    _onRef = (ref) => {
        this._ref = ref;
        if (ref && this.state.position !== this._getPosition()) {
            this._move(this._getPosition());
        }
    }

    _move = (index) => {
        const isUpdating = index !== this._getPosition();
        const x = this.state.width * index;
        this._ref.scrollTo({x: this.state.width * index, y: 0, animated: true});
        this.setState({position: index});
        if (isUpdating && this.props.onPositionChanged) {
            this.props.onPositionChanged(index);
        }
    }

    _getPosition = () => {
        if (typeof this.props.position === 'number') {
            return this.props.position;
        }
        return this.state.position;
    }

    renderImages() {
        const { width, height } = this.state;
        const { images, onPress } = this.props;

        return images.map((image, index) => {
            const props = { key: index, index, image, width, height, onPress };
            return <ImagePan {...props} />;
        });
    }

    renderImageButtons() {
        const { images } = this.props;
        const position = this._getPosition();

        return images.map((image, index) => (
            <ImageButton
                key={index}
                index={index}
                onChange={this._move}
                selected={position === index} />)
        );
    }

    render() {
        const { height } = this.state;
        const props = {
            ref: this._onRef,
            decelerationRate: 0.99,
            horizontal: true,
            showsHorizontalScrollIndicator: false,
            style: [ styles.container, this.props.style, { height } ],
            ...this._panResponder.panHandlers
        };

        return (
            <View>
                <ScrollView {...props}>
                    { this.renderImages() }
                </ScrollView>
                <View style={styles.buttons}>
                    { this.renderImageButtons() }
                </View>
            </View>
        );
    }
}

export default ImageSlider;
