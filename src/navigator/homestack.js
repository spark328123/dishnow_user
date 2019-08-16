import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Animated, Easing } from 'react-native';


import onWait from '../container/onWait';
import List from './liststack';
import Callout from '../container/callout';
import Booked from '../container/List/ListMenu/booked';
import HomeSwitch from '../navigator/homeswitch'
const HomeStack = createStackNavigator(
    {
       
        onWait : {screen : onWait },
        List,
        Callout,
        Booked,
        HomeSwitch,
    },
    {
        initialRouteName : 'HomeSwitch',
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
export default HomeStack;
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
if (navigation.state.index > 0) {
  tabBarVisible = false;
}

return {
  tabBarVisible,
};
}