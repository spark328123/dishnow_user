import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import TabBooked from '../container/tabBooked';
import ReviewWrite from '../container/reviewWrite';
import ListMenu from '../container/List/ListMenu/listMenu';
const BookStack = createSwitchNavigator(
    {
        TabBooked,
        ReviewWrite,
        ListMenu,
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