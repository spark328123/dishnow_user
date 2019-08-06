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
                title : '계정 관리',
                headerTitleStyle: {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    flexGrow:1,
                    marginRight : 70,
                    
                },
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
            }),
        },
        
        Register: { screen: Register },
        Welcome: { screen: Welcome },
        webView : {
            screen : webView,
            navigationOptions: ({ navigation }) => ({
            header: null,
            }),
        }
    },
    {
        initialRouteName : 'Login',
    }
)

export default LoginStack;