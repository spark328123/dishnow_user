import { createStackNavigator } from 'react-navigation';
import { Animated, Easing } from 'react-native';

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
        /*
        transitionConfig : () => ({
            transitionSpec: {
              duration: 0,
              timing: Animated.timing,
              easing: Easing.step0,
              },
          }),
          */
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