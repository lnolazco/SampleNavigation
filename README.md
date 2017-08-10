# React Native Full Example

## Description

## Requirements
- react-native-cli
- node v 6.11.1

## How to install
```bash
git clone 
cd project
npm i
```
You will need to update the projects, follow the instructions of the sections below.

## Dependencies

### Redux

### React Navigation
Used to get the side menu and the navigation between the pages. Redux implmented.

### React Native Vector Icons

### React Native Elements
Ideally I would like to get rid of it

### Progress bar
https://github.com/oblador/react-native-progress#installation

### Gifted Chat
https://github.com/FaridSafi/react-native-gifted-chat

### Realtime
For IOS:
I used this repo
https://github.com/realtime-framework/RealtimeMessaging-ReactNativeIOSExample
but the instructions are not so correct... so, this is what I did:

install dependency:
npm install --save react-native-realtimemessaging-ios

Open xcode (project/ios/SampleNavigation.xcodeproj)
In the folder Libraries select Add files to "Project" and select the dependecy installed located in node_modules/react-native-realtimemessaging-ios
Then click on the project folder and go to the tab Build Phases and below Link Binary With Libraries drag/add the file libRCTRealtimeMessaging.a from 'Libraries/SampleNavigation.xcodeproj/Products/libRCTRealtimeMessaging.a'.

Then I added to services the file 'RCTRealtimeMessaging.js' from ./node_modules/react-native-realtimemessaging-ios/RCTRealtimeMessagingIOS.js

more info:
https://github.com/realtime-framework/RCTRealtimeMessagingIOS

android pending

https://github.com/realtime-framework/RealtimeMessaging-ReactNativeAndroidExample
https://github.com/realtime-framework/RCTRealtimeMessagingAndroid

## Authentication
Based on this repo:
// https://github.com/spencercarli/react-navigation-auth-flow/tree/finished-code
