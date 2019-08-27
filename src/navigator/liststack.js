import { createStackNavigator } from 'react-navigation';

import List from '../container/List/list';
import ListMap from '../container/List/listMap';
import ListMenu from '../container/List/ListMenu/listMenu';
import StoreMap from '../container/List/ListMenu/storeMap';
import Booked from '../container/List/ListMenu/booked';
const ListStack = createStackNavigator(
    {
        List : {screen  : List,  navigationOptions: {
            gesturesEnabled: false,
        }},
        ListMap : {screen : ListMap ,  navigationOptions: {
            gesturesEnabled: false,
        }},
        ListMenu : {screen : ListMenu,  navigationOptions: {
            gesturesEnabled: false,
        }},
        StoreMap : {
            screen: StoreMap ,  navigationOptions: {
                gesturesEnabled: false,
            },
        },
        Booked : {
            screen : Booked ,  navigationOptions: {
                gesturesEnabled: false,
            },
        }
        
    },
    {
        initialRouteName : 'List',
        headerMode : 'none'
        
    }
)

/*
ListStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
}
*/

export default ListStack;