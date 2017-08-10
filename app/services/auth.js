import { AsyncStorage } from 'react-native';

import { API_URL, USER_KEY } from '../config';
import { request, requestJson } from './request';

export async function onSignIn(user_email, user_password) {
    const url = `${API_URL}/login`;
    const body = { user_email, user_password };

    let response = await requestJson(url, 'POST', body);
    await AsyncStorage.setItem(USER_KEY, response.token);
}

export async function onSignOut() {
    const url = `${API_URL}/private/offliner?logout=1`;
    let data = await request(url);
    AsyncStorage.removeItem(USER_KEY);
}

export async function isSignedIn() {
    let result = await AsyncStorage.getItem(USER_KEY);
    return result;
}
