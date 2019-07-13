import { createStackNavigator} from 'react-navigation';

import TabBooked from '../container/tabBooked';

const BookStack = createStackNavigator(
    {
        TabBooked : { screen : TabBooked }
    },
    {
        initialRouteName : 'TabBooked',
        headerMode : 'none',
    }
)

export default BookStack;