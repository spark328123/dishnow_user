import TabHome from '../container/tabHome';
import {createSwitchNavigator } from 'react-navigation';
const HomeSwitch = createSwitchNavigator(
  {
    TabHome : {screen : TabHome},
  },
  {
      initialRouteName : 'TabHome',
      headerMode : 'none',
  },
)
export default HomeSwitch;
