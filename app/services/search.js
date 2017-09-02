import { AsyncStorage } from 'react-native';

import { request } from './request';
import { API_URL, USER_KEY } from '../config';

const LAST_FILTER = 'last_filter';

export async function getUsers(filter) {
    let query = 'age_max=99&age_min=18&page=1&per_page=5&radius=50&type=global';

    if (filter.gender) {
        query = query.concat(`&gender=${filter.gender}`);
    }
    if (filter.country) {
        query = query.concat(`&iso=${filter.country}`);
    }
    if (filter.region) {
        query = query.concat(`&region_number=${filter.region}`);
    }

    const url = `${API_URL}/private/users?${query}`;
    let data = await request(url);
    return data.users;
}

export async function getUserProfile(id) {
    const url = `${API_URL}/private/profile/${id}`;
    let data = await request(url);
    return data.user;
}

export function saveFilter(filter) {
    AsyncStorage.setItem(LAST_FILTER, JSON.stringify(filter));
}

export async function getLastFilter() {
    let filter = await AsyncStorage.getItem(LAST_FILTER);
    return JSON.parse(filter);
}
