//  Updated by Luis Noazco on 18/08/17.

/**
 * @providesModule RCTRealtimeMessagingIOS
 * @flow
 */

import React, { Component } from 'react';
import { NativeModules } from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

const ortcClient = NativeModules.RealtimeMessaging;
const RTEvents = {};
let instances = 0;

class RCTRealtimeMessagingIOS {
	id;
	
	constructor() {
		this.id = ""+instances++;
	}

	RTConnect(config){
		ortcClient.connect(config, this.id);
	}

	RTDisconnect(){
		ortcClient.disconnect(this.id);
	}

	RTSubscribe(channel, subscribeOnReconnect){
		ortcClient.subscribe(channel, subscribeOnReconnect, this.id);
	}

	RTSubscribeWithFilter(channel, subscribeOnReconnect, filter){
		ortcClient.subscribeWithFilter(channel, subscribeOnReconnect, filter, this.id);
	}

	RTSubscribeWithNotifications(channel, subscribeOnReconnect){
		ortcClient.subscribeWithNotifications(channel, subscribeOnReconnect, this.id);
	}

	RTUnsubscribe(channel){
		ortcClient.unsubscribe(channel, this.id);
	}

	RTPublishMessage(channel, message, ttl, callBack){
		ortcClient.publish(channel, message, ttl, this.id, callBack);
	}

	RTSendMessage(message, channel){
		ortcClient.sendMessage(message, channel, this.id);
	}

	RTEnablePresence(aUrl, aIsCluster, aApplicationKey, aPrivateKey, channel, aMetadata){
		ortcClient.enablePresence(aUrl, aIsCluster, aApplicationKey, aPrivateKey, channel, aMetadata, this.id);
	}

	RTDisablePresence(aUrl, aIsCluster, aApplicationKey, aPrivateKey, channel, aMetadata){
		ortcClient.disablePresence(aUrl, aIsCluster, aApplicationKey, aPrivateKey, channel, this.id);
	}

	RTPresence(aUrl, aIsCluster, aApplicationKey, aAuthenticationToken, channel){
		ortcClient.presence(aUrl, aIsCluster, aApplicationKey, aAuthenticationToken, channel, this.id);
	}

	RTIsSubscribed(channel, callBack){
		ortcClient.isSubscribed(channel, this.id, callBack);
	}

	RTSaveAuthentication(url, isCluster, authenticationToken, authenticationTokenIsPrivate, applicationKey, timeToLive, privateKey, permissions, callBack){
		ortcClient.saveAuthentication(url, isCluster, authenticationToken, authenticationTokenIsPrivate, applicationKey, timeToLive, privateKey, permissions, this.id, callBack);
	}

	RTGetHeartbeatTime(callBack){
		ortcClient.getHeartbeatTime(this.id, callBack);
	}

	RTSetHeartbeatTime(newHeartbeatTime){
		ortcClient.setHeartbeatTime(newHeartbeatTime, this.id);
	}

	RTGetHeartbeatFails(callBack){
		ortcClient.getHeartbeatFails(this.id, callBack);
	}

	RTSetHeartbeatFails(newHeartbeatFails){
		ortcClient.setHeartbeatFails(newHeartbeatFails, this.id);
	}

	RTIsHeartbeatActive(callBack){
		ortcClient.isHeartbeatActive(this.id, callBack);
	}

	RTEnableHeartbeat(){
		ortcClient.enableHeartbeat(this.id);
	}

	RTDisableHeartbeat(){
		ortcClient.disableHeartbeat(this.id);
	}

	/*
		Events list
		- onConnected
		- onDisconnect
		- onReconnect
		- onReconnecting
		- onSubscribed
		- onUnSubscribed
		- onExcption
		- onMessage
		- onPresence
		- onDisablePresence
		- onEnablePresence
	*/

	RTPushNotificationListener(callBack){
		require('RCTDeviceEventEmitter').addListener(
			  'onPushNotification',
			  callBack
			);
		ortcClient.checkForNotifications();
	};


	RTEventListener(notification, callBack){
		var modNotification = String(this.id) + '-' + notification;
		var channelExists = RTEvents[modNotification];
		if (channelExists){
			this.RTRemoveEventListener(notification);
		}

		RTEvents[modNotification] = (
			require('RCTDeviceEventEmitter').addListener(
			  modNotification,
			  callBack
			)
		);
	};

	RTRemoveEventListener(notification)
	{
		var modNotification = String(this.id) + '-' + notification;
		RTEvents[modNotification].remove(),
		delete RTEvents[modNotification];
	};
}

module.exports = RCTRealtimeMessagingIOS;
