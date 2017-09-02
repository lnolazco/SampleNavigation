import { NavigationActions } from 'react-navigation';

import { nav_actions } from '../actions/types';
import { AppNavigator } from '../../navigator';

const initialState = AppNavigator.router.getStateForAction(NavigationActions.init());
// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));

export const nav = (state = initialState, action) => {
    let nextState;

    switch (action.type) {
    case nav_actions.SIGNEDIN:
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'SignedIn' }),
            state
        );
        break;
    case nav_actions.FORGOT_PASSWORD:
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'ForgotPassword' }),
            state
        );
        break;
    case nav_actions.PROFILE:
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'Profile', params: { id: action.id } }),
            state
        );
        break;
    case nav_actions.LIST:
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'List', params: { filter: action.filter } }),
            state
        );
        break;
    case nav_actions.CHAT:
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'Chat', params: { data: action.data } }),
            state
        );
        break;
    default:
        nextState = AppNavigator.router.getStateForAction(action, state);
        break;
    }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
