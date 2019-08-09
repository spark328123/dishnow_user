import { createSwitchNavigator} from 'react-navigation';

import MyReview from '../container/My/myreview';
import ReviewWrite from '../container/reviewWrite';

const ReviewStack = createSwitchNavigator(
    {
        MyReview,
        ReviewWrite,
    },
    {
        initialRouteName : 'MyReview',
        headerMode : 'none',
    }
)

ReviewStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
}

export default ReviewStack;