import TabHome from '../container/tabHome';
import Departure from '../container/stackDeparture';
import {createSwitchNavigator } from 'react-navigation';
const HomeSwitch = createSwitchNavigator(
    {
       TabHome,
       Departure : {screen : Departure}
    },
    {
        initialRouteName : 'TabHome',
        headerMode : 'none',

    }
)
export default HomeSwitch;

HomeSwitch.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }else if(navigation.state.index==0){
      console.log(navigation.state.routes[0].index);
    if(navigation.state.routes[0].index==1)tabBarVisible=false;
  }
  
  return {
    tabBarVisible,
  };
  }