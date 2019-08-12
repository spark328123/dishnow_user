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
        Login: { screen: Login },
        Terms: { screen: Terms },
        Register: { screen: Register },
        Welcome: { screen: Welcome },
        webView : { screen : webView }
    },
    {
        initialRouteName : 'Login',
        headerMode : 'none',
    }
)

export default LoginSwitch;