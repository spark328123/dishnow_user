import { createStackNavigator } from 'react-navigation';

import TabHome from '../utill/googlemap'
const HomeStack = createStackNavigator(
    {
        TabHome : {screen : TabHome}
    },
    {
        initialRouteName : 'TabHome',
        headerMode : 'none',
    }
)

export default HomeStack;