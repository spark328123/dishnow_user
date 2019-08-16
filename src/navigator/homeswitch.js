import TabHome from '../container/tabHome';
import Departure from '../container/stackDeparture';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
const HomeSwitch = createSwitchNavigator(
    {
       TabHome,
       Departure,
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
export default HomeSwitch;

HomeSwitch.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
}
