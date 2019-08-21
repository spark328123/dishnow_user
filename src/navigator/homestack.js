import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import onWait from '../container/onWait';
import List from './liststack';
import Callout from '../container/callout';
import Booked from '../container/List/ListMenu/booked';
import HomeSwitch from '../navigator/homeswitch';
import Departure from '../container/stackDeparture';
const HomeStack = createStackNavigator(
    {
        onWait : {screen : onWait },
        List,
        Callout,
        Booked,
        HomeSwitch,
        Departure
    },
    {
        initialRouteName : 'HomeSwitch',
        headerMode : 'none',
    }
)
export default HomeStack;
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  console.log(navigation.state.index);
if (navigation.state.index > 0) {
  tabBarVisible = false;
}
return {
  tabBarVisible,
};
}