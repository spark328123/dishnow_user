import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Splash from '../container/splash';
import Login from './loginstack';
import Main from './mainTab';
import Tutorial from '../component/tutorial';

const rootNav = createSwitchNavigator(
    {
        Tutorial,
        Splash,
        Login,
        Main,
    },
    {
        initialRouteName: 'Splash',
        headerMode: 'none',
    }
);

export default createAppContainer(rootNav);

