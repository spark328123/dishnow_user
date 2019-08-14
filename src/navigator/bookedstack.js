import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import TabBooked from '../container/tabBooked';
import ReviewWrite from '../container/reviewWrite';
import ListMenu from '../container/List/ListMenu/listMenu';
import StoreMap from '../container/List/ListMenu/storeMap';

const BookStack = createSwitchNavigator(
    {
        TabBooked,
        ReviewWrite,
        ListMenu,
        StoreMap,
    },
    {
        initialRouteName : 'TabBooked',
        headerMode : 'none',
    }
)

BookStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
}

export default BookStack;