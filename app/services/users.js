import { AsyncStorage } from 'react-native';

import { request } from './request';
import { API_URL, USER_KEY } from '../config';

export async function getUsers() {
    const url = `${API_URL}/private/users?age_max=99&age_min=18&page=1&per_page=50&radius=50&type=global`;
    let data = await request(url);
    return data.users;
}

export async function getUserProfile(id) {
    const url = `${API_URL}/private/profile/${id}`;
    let data = await request(url);
    return data.user;
}
