import React, { Component } from 'react';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { applyMiddleware, createStore } from 'redux';

import AppReducer from './redux/reducers';
import AppWithNavigationState from './navigator';

class App extends Component {
    store = createStore(
        AppReducer,
        applyMiddleware(logger)
    );

    render() {
        return (
            <Provider store={this.store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('SampleNavigation', () => App);
