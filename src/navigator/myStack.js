import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import React from 'react';
import {Button} from 'react-native';
import TabMy from '../container/My/tabMy';
import Review from '../container/My/myreview';
import webView from '../container/webView';
import Profile from '../container/My/profile_manage';
import Client from '../container/My/client_center';
import Notice from '../container/My/notice';
import Nick from '../container/My/Account/nickname_change';
import Password from '../container/My/Account/password_change';
import PasswordCheck from '../container/My/Account/password_check';
import Phone from '../container/My/Account/phone_change';
import myTerms from '../container/My/myTerms';
import myReview from '../navigator/reviewstack';
import myPoint from '../container/My/Point/myPoint';
import point from '../container/My/Point/point';

import * as Utill from '../utill/';
const mySwitch = createSwitchNavigator(
    {
        TabMy : { 
            screen : TabMy,
        },
        Profile : {
            screen : Profile,
        },
        Nick : {
            screen : Nick,
        },
        myTerms : {
            screen : myTerms,
        },
        webView : { 
            screen : webView,
        },
        Client : { 
            screen : Client,  
        },
        Notice : {
            screen : Notice,
        },
        Review : {
            screen : Review,
        },

        Point : {
            screen : point
        },

        Password : {
            screen : Password,
        },
        PasswordCheck : {
            screen : PasswordCheck,
        },
        Phone : {
            screen : Phone,
        },
        myReview,
        myPoint,
    },
    {
        initialRouteName : 'TabMy',
        headerMode : 'none'
    }
)

export default mySwitch; 
mySwitch.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
}
//프로필관리
//디나포인트 나의리뷰
//공지사항
//이용약관
//고객센터
//푸쉬알람
//로그아웃