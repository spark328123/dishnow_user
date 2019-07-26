import { createStackNavigator } from 'react-navigation';

import TabMy from '../container/My/tabMy'
import webView from '../container/webView'
import Profile from '../container/My/profile_manage'
import Client from '../container/My/client_center'
import Alarm from '../container/My/push_alarm'
const MyStack = createStackNavigator(
    {
        TabMy : { screen : TabMy },
        // Profile : { screen : Profile },
        webView : { screen : webView },
        // Client : { screen : Client },
        // Alarm : { screen : Alarm },
    },
    {
        initialRouteName : 'TabMy',
        headerMode : 'none',
    }
)

export default MyStack; 
//프로필관리
//디나포인트 나의리뷰
//공지사항
//이용약관
//고객센터
//푸쉬알람
//로그아웃