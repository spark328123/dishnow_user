import { createStackNavigator } from 'react-navigation';
import React from 'react';

import Login from '../container/login';
import Register from '../container/register';
import Terms from '../component/terms';
import Welcome from '../component/welcome';
import webView from '../container/webView';
const LoginStack = createStackNavigator(
    {
        Login: { 
            screen: Login ,
            navigationOptions: ({ navigation }) => ({
            header: null,
            }),
        },
        Terms: { 
            screen: Terms ,
            navigationOptions: ({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }),
            },
        Register: { screen: Register },
        Welcome: { screen: Welcome },
        webView : {screen : webView}
    },
    {
        initialRouteName : 'Login',
    }
)

export default LoginStack;