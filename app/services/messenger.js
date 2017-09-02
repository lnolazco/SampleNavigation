import { request } from './request';
import { API_URL, USER_KEY } from '../config';
import {
    convertApiMessages_To_GiftedChatFormat,
    convertApiMessage_To_GiftedChatFormat,
    convertApiSendMessage_To_GiftedChatFormat
} from '../utils/conversions';

export async function getConversations() {
    // { page: 1, per_page: 50 }
    const url = `${API_URL}/private/conversations?page=1&per_page=50`;
    let data = await request(url);
    return data.messages;
}

export async function getRealtimeToken() {
    const url = `${API_URL}/private/realtime`;

    let data = await request(url);
    return data.real_token;
}

export async function getMessages(id) {
    // { page: 1, per_page: 50, first_id: 0 }
    const url = `${API_URL}/private/conversation/${id}?page=1&per_page=50&first_id=0`;
    let data = await request(url);
    data.messages.reverse();
    return convertApiMessages_To_GiftedChatFormat(data.messages);
}

export async function getMessage(id) {
    const url = `${API_URL}/private/message/${id}`;
    let data = await request(url);
    return convertApiMessage_To_GiftedChatFormat(data.message);
}

export async function sendMessage(id, text) {
    const body = {
        msg: text,
        tempid: `tmp${Math.round(Math.random()*1000000)}`
    };
    const url = `${API_URL}/private/message/${id}`;
    console.log('url ', url, body);
    let data = await request(url, 'POST', body);
    console.log('message ', data.message);
    return convertApiSendMessage_To_GiftedChatFormat(data.message);
}
