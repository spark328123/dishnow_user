import { createStackNavigator } from 'react-navigation';

import TabHome from '../container/tabHome'
const HomeStack = createStackNavigator(
    {
        TabHome : { screen : TabHome }
    },
    {
        initialRouteName : 'TabHome',
        headerMode : 'none',
    }
)

export default HomeStack;