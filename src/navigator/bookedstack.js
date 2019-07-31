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
                    fontWeight: 'bold',
                },
            }), 
        }
    },
    {
        initialRouteName : 'TabBooked',
    }
)

export default BookStack;