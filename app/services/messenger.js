import { request } from './request';
import { API_URL, USER_KEY } from '../config';

export async function getConversations() {
    // { page: 1, per_page: 50 }
    const url = `${API_URL}/private/conversations?page=1&per_page=50`;
    let data = await request(url);
    return data.messages;
}

export async function getMessages(id) {
    // { page: 1, per_page: 50, first_id: 0 }
    const url = `${API_URL}/private/conversation/${id}?page=1&per_page=50&first_id=0`;
    let data = await request(url);
    return data.messages;
}

export async function getRealtimeToken() {
    const url = `${API_URL}/private/realtime`;

    let data = await request(url);
    return data.real_token;
}

export async function getMessage(id) {
    const url = `${API_URL}/private/message/${id}`;
    let data = await request(url);
    return data.message;
}