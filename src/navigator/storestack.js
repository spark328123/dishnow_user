import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import ListMenu from '../container/List/ListMenu/listMenu';
import StoreMap from '../container/List/ListMenu/storeMap';

const StoreStack = createStackNavigator(
    {
       ListMenu,
       StoreMap,
    },
    {
        initialRouteName : 'ListMenu',
        headerMode : 'none',
    }                               
)

export default StoreStack;