import { createStackNavigator } from 'react-navigation';
import React from 'react';
import {Button} from 'react-native';
import TabMy from '../container/My/tabMy';
import Review from '../container/My/myreview';
import Point from '../container/My/point';
import webView from '../container/webView';
import Profile from '../container/My/profile_manage';
import Client from '../container/My/client_center';
import Notice from '../container/My/notice';
import Nick from '../container/My/nickname_change';
import myTerms from '../container/My/myTerms';
import * as Utill from '../utill/';
const myStack = createStackNavigator(
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
            screen : Point,
        },
    },
    {
        initialRouteName : 'TabMy',
        headerMode : 'none'
    }
)

export default myStack; 
//프로필관리
//디나포인트 나의리뷰
//공지사항
//이용약관
//고객센터
//푸쉬알람
//로그아웃