import React from "react";
import { Button, AppRegistry } from "react-native";
import { Icon } from 'react-native-elements'

import { addNavigationHelpers, StackNavigator, DrawerNavigator } from "react-navigation";
import { connect } from 'react-redux';

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import SignOut from "./screens/SignOut";
import Home from "./screens/Home";
import List from "./screens/List";
import Chat from "./screens/Chat";
import Messages from "./screens/Messages";
import Profile from "./screens/Profile";

export const SignedOut = StackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            header: null
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: 'Sign Up'
        }
    },
});

const IconMenu = ({ navigation }) => (
    <Icon
        name="menu"
        onPress={() => navigation.navigate('DrawerOpen')} />
);

const SignedIn = DrawerNavigator({
    Home: {
        screen: StackNavigator({
            Home: {
                screen: Home,
                navigationOptions: (props) => {
                    return {
                        title: 'Home title',
                        headerLeft: <IconMenu {...props} />
                    }
                }
            }
        }),
        navigationOptions: { drawerLabel: 'Home Menu' },
    },
    List: {
        screen: StackNavigator({
            List: {
                screen: List,
                navigationOptions: (props) => {
                    return {
                        title: 'List Title',
                        headerLeft: <IconMenu {...props} />
                    }
                }
            },
            Profile: {
                screen: Profile,
                navigationOptions: {
                    title: 'Profile Title',
                },
            },
            Chat: {
                screen: Chat,
                navigationOptions: {
                    title: 'Chat Title',
                },
            }
        }),
        navigationOptions: {
            drawerLabel: 'List Menu'
        },
    },
    Messages: {
        screen: StackNavigator({
            Messages: {
                screen: Messages,
                navigationOptions: (props) => {
                    return {
                        title: 'Messages Title',
                        headerLeft: <IconMenu {...props} />
                    }
                }
            },
            Chat: {
                screen: Chat,
                navigationOptions: {
                    title: 'Chat Title',
                },
            }
        }),
        navigationOptions: {
            title: 'Messages Title',
            drawerLabel: 'Messages Menu'
        },
    },
    'Sign out': {
        screen: SignOut
    }
});

export const AppNavigator = StackNavigator(
    {
        SignedIn: {
            screen: SignedIn,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        SignedOut: {
            screen: SignedOut,
            navigationOptions: {
                gesturesEnabled: false
            }
        }
    },
    {
        headerMode: 'none',
        mode: 'modal',
        initialRouteName: 'SignedOut'
    }
);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
