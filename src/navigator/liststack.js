import { createStackNavigator } from 'react-navigation';

import List from '../container/List/list';
import ListMap from '../container/List/listMap';
const ListStack = createStackNavigator(
    {
        List,
        ListMap,
        listMenu,
    },
    {
        initialRouteName : 'List',
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