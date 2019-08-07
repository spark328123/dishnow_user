import { createStackNavigator} from 'react-navigation';

import TabBooked from '../container/tabBooked';
import ReviewWrite from '../container/reviewWrite';

const BookStack = createStackNavigator(
    {
        TabBooked : { 
            screen : TabBooked ,
        },
        ReviewWrite : { 
            screen : ReviewWrite,
        }
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