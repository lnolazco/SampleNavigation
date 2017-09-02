import { Platform } from 'react-native';

import RCTRealtimeMessagingIOS from './RCTRealtimeMessagingIOS';
import { request } from './../request';
import { API_URL, REALTIME_APP_KEY } from '../../config';

let instance = null;
let token = null;

async function getRealtimeToken() {
    const url = `${API_URL}/private/realtime`;

    let data = await request(url);
    return data.real_token;
}

class Realtime {
	constructor(userid) {
		if (!instance) {
			console.log('create new instance');
			//depends of the plaftorm this should create an instance for IOS or android.
			if (Platform.OS === 'ios') {
				console.log('platform ios');
                this.userid = userid;
				instance = new RCTRealtimeMessagingIOS();
			}
            if (Platform.OS === 'android') {
                console.log('pending android!');
            }
		}
		console.log('instance id', instance);
        getRealtimeToken().then(this.connect);
		return instance;
	}

    connect = (token) => {
        instance.RTEventListener('onConnected', this.onConnected);
    
        instance.RTConnect(
        {
            appKey: REALTIME_APP_KEY,
            token,
            connectionMetadata: token,
            clusterUrl: 'https://ortc-developers.realtime.co/server/ssl/2.1'
        });

        this.token = token;
    }

    onConnected = () => {
        console.log('connected');
        const channel = `users:${this.userid}`;

        console.log('channel ', channel);

        //suscribe:
        instance.RTSubscribe(channel, true);
    }

}

export default Realtime;
