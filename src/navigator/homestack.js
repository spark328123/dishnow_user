import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import onWait from '../container/onWait';
import List from './liststack';
import Callout from '../container/callout';
import Booked from '../container/List/ListMenu/booked';
import HomeSwitch from '../navigator/homeswitch';
//import Departure from '../container/stackDeparture';
const HomeStack = createStackNavigator(
    {
        onWait : {screen : onWait ,navigationOptions : {
            gesturesEnabled: false,
        }},
        List : {screen : List, navigationOptions : {
            gesturesEnabled: false,
        }},
        Callout : {screen : Callout, navigationOptions : {
            gesturesEnabled: false,
        }},
        Booked : {screen : Booked, navigationOptions : {
            gesturesEnabled: false,
        }},
        HomeSwitch : {
            screen : HomeSwitch, navigationOptions : {
                gesturesEnabled: false,
            }
        }
    },
    {
        initialRouteName : 'HomeSwitch',
        headerMode : 'none',
    },
    
)
export default HomeStack;
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  
if (navigation.state.index > 0) {
  tabBarVisible = false;
}else if(navigation.state.index==0){
  if(navigation.state.routes[0].index==1)tabBarVisible=false;
}


return {
  tabBarVisible,
};
}