import { createStackNavigator } from 'react-navigation';

import TabHome from '../container/tabHome'
import Departure from '../container/stackDeparture'
const HomeStack = createStackNavigator(
    {
        TabHome : { screen : TabHome },
        Departure : {screen : Departure, }
    },
    {
        initialRouteName : 'TabHome',
        headerMode : 'none',
    }
)

HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
}

export default HomeStack;