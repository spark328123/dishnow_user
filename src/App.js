import React, { useEffect } from 'react';
import Navigatior from './navigator/rootNavigator';
import OneSignal from 'react-native-onesignal'; 
import Store from './store';
import { Provider } from 'react-redux';
import * as API from './utill/API';

export default (props) => {
  useEffect (()=>{
      OneSignal.init("f4abb3da-4d13-467a-a552-53a642ef0bfb", 
      {
        kOSSettingsKeyAutoPrompt : true,
      });
    
      OneSignal.inFocusDisplaying(2);
      OneSignal.enableVibrate(true);
    
      OneSignal.addEventListener('received', onReceived);
      OneSignal.addEventListener('opened', onOpened);
      OneSignal.addEventListener('ids', onIds);

      OneSignal.configure(); 	// triggers the ids event

    return ()=> {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    }
  },[])


  const onReceived = (notification) => {
    console.log("Notification received: ", notification);
  }

  const onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);

    console.log(openResult.notification.payload.additionalData);
  }

  const onIds = (device) => {
    console.log('Device info: ', device);
    let token = device.userId;
    console.log(token);
  }

  return (
    <Provider store={Store}>
        <Navigatior/>
    </Provider>
  )
}