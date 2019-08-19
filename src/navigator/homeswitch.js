import TabHome from '../container/tabHome';
import Departure from '../container/stackDeparture';
import {createSwitchNavigator } from 'react-navigation';
const HomeSwitch = createSwitchNavigator(
    {
       TabHome,
       Departure,
    },
    {
        initialRouteName : 'TabHome',
        headerMode : 'none',
    }
)
export default HomeSwitch;

HomeSwitch.navigationOptions = ({ navigation }) => {
    let navigationOptions = {};
  if (navigation.state.index == 1) {
    navigationOptions.tabBarVisible = false;
  }
  return {
    navigationOptions,
  };
}
