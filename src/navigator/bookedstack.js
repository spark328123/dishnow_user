import { createStackNavigator} from 'react-navigation';

import TabBooked from '../container/tabBooked';
import ReviewWrite from '../container/reviewWrite';

const BookStack = createStackNavigator(
    {
        TabBooked : { 
            screen : TabBooked ,
            navigationOptions : ({ navigation }) => ({
            header: null,
            }),
        },
        ReviewWrite : { 
            screen : ReviewWrite,
            navigationOptions : ({ navigation }) => ({
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                },
                title : navigation.getParam('storeName'),
                headerTintColor: '#000000',
                headerTitleStyle: {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    flexGrow:1,
                    marginRight : 70,
                    
                },
            }),   
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