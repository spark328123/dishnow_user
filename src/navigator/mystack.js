import { createStackNavigator } from 'react-navigation';

import TabMy from '../container/tabMy'

const MyStack = createStackNavigator(
    {
        TabMy : {screen : TabMy }
    },
    {
        initialRouteName : 'TabMy',
        headerMode : 'none',
    }
)

export default MyStack