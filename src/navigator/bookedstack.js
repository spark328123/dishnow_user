import { createStackNavigator} from 'react-navigation';

import TabBooked from '../container/tabBooked';
import ReviewWrite from '../container/reviewWrite';

const BookStack = createStackNavigator(
    {
        TabBooked : { screen : TabBooked },
        ReviewWrite : { screen : ReviewWrite }
    },
    {
        initialRouteName : 'TabBooked',
        headerMode : 'none',
    }
)

export default BookStack;