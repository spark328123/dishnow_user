import { createStackNavigator } from 'react-navigation';
import React from 'react';

import Login from '../container/login';
import Register from '../container/register';
import Terms from '../component/terms';
import Welcome from '../component/welcome';
import Left from '../component/leftButton';

const LoginStack = createStackNavigator(
    {
        Login : { screen : Login },
        Terms : { screen : Terms },
        Register : { screen : Register },
        Welcome : { screen : Welcome }
    },
    {
        initialRouteName : 'Login',
        headerMode : 'none',
      
    }
)

export default LoginStack;