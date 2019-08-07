import { createStackNavigator } from 'react-navigation';

import List from '../container/List/list';
import ListMap from '../container/List/listMap';
import ListMenu from '../container/List/ListMenu/listMenu'
const ListStack = createStackNavigator(
    {
        List,
        ListMap,
        ListMenu,
    },
    {
        initialRouteName : 'ListMenu',
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