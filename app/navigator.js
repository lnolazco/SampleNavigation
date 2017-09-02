import React from 'react';
import { Button, AppRegistry } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { addNavigationHelpers, StackNavigator, DrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import SignIn from "./screens/SignIn";
import ForgotPassword from "./screens/ForgotPassword";
import SignOut from "./screens/SignOut";
import Home from "./screens/Home";
import Search from "./screens/Search";
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
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            title: 'Sign Up'
        }
    },
});

const IconMenu = ({ navigation }) => (
    <Icon
        name="menu"
        size={30}
        onPress={() => navigation.navigate('DrawerOpen')} />
);

const SignedIn = DrawerNavigator({
    Home: {
        screen: StackNavigator({
            Home: {
                screen: Home,
                navigationOptions: (props) => {
                    return {
                        title: 'Home',
                        headerLeft: <IconMenu {...props} />
                    }
                }
            }
        }),
        navigationOptions: { drawerLabel: 'Home' },
    },
    List: {
        screen: StackNavigator({
            Search: {
                screen: Search,
                navigationOptions: (props) => {
                    return {
                        title: 'Search users',
                        headerLeft: <IconMenu {...props} />
                    }
                }
            },
            List: {
                screen: List,
                navigationOptions: {
                    title: 'Users',
                }
            },
            Profile: {
                screen: Profile,
                navigationOptions: {
                    title: 'Profile',
                },
            },
            Chat: {
                screen: Chat,
                navigationOptions: {
                    title: 'Chat',
                },
            }
        }),
        navigationOptions: {
            drawerLabel: 'Search'
        },
    },
    Messages: {
        screen: StackNavigator({
            Messages: {
                screen: Messages,
                navigationOptions: (props) => {
                    return {
                        title: 'Messages',
                        headerLeft: <IconMenu {...props} />
                    }
                }
            },
            Chat: {
                screen: Chat,
                navigationOptions: {
                    title: 'Chat',
                },
            }
        }),
        navigationOptions: {
            title: 'Messages',
            drawerLabel: 'Messages'
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
