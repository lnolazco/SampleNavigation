import { NavigationActions } from 'react-navigation';

import { nav_actions } from '../actions/types';
import { AppNavigator } from '../../navigator';

const initialState = AppNavigator.router.getStateForAction(NavigationActions.init());
// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));

export const nav = (state = initialState, action) => {
  // const nextState = AppNavigator.router.getStateForAction(action, state);
    let nextState;


    switch (action.type) {
    case nav_actions.SIGNEDIN:
        console.log('action signedin');
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'SignedIn' }),
            state
        );
        break;
    case nav_actions.PROFILE:
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'Profile', params: { id: action.id } }),
            state
        );
        break;
    case nav_actions.CHAT:
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'Chat', params: { id: action.id, inscID: action.inscID } }),
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
