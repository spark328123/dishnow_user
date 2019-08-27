import { createSwitchNavigator } from 'react-navigation';
import React from 'react';
import Login from '../container/login';
import Register from '../container/register';
import Terms from '../component/terms';
import Welcome from '../component/welcome';
import webView from '../container/webView';
import {NavigationEvents} from 'react-navigation';
import {removeAndroidBackButtonHandler,handleAndroidBackButton} from '../component/common/hardwareBackButton'
const LoginSwitch = createSwitchNavigator(
    {
        Login: { screen: Login,  navigationOptions: {
            gesturesEnabled: false,
        }, },
        Terms: { screen: Terms,  navigationOptions: {
            gesturesEnabled: false,
        }, },
        Register: { screen: Register,  navigationOptions: {
            gesturesEnabled: false,
        }, },
        Welcome: { screen: Welcome,  navigationOptions: {
            gesturesEnabled: false,
        }, },
        webView : { screen : webView,  navigationOptions: {
            gesturesEnabled: false,
        }, },
        
    },
    {
        initialRouteName : 'Login',
        headerMode : 'none',
    }
)

export default LoginSwitch;