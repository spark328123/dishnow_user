import { createStackNavigator } from 'react-navigation';
import React from 'react'
import {Button} from 'react-native'
import TabMy from '../container/My/tabMy'
import Review from '../container/My/myreview'
import Point from '../container/My/point'
import webView from '../container/webView'
import Profile from '../container/My/profile_manage'
import Client from '../container/My/client_center'
import Notice from '../container/My/notice'
import Nick from '../container/My/nickname_change'
import * as Utill from '../utill/'
const myStack = createStackNavigator(
    {
        navigationOptions: ({ navigation }) => ({
                title : '제목',
                headerStyle: {
                    backgroundColor: Color.red,
                   
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                },
            }),
        TabMy : { 
            screen : TabMy,
            navigationOptions: ({ navigation }) => ({
                header: null,
            }),
        },
        Profile : {
            screen : Profile,
            navigationOptions: ({ navigation }) => ({
                title : '계정 관리',
                headerTitleStyle: {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    flexGrow:1,
                    marginRight : 70,
                    
                },
                
            }),
            
        },
        Nick : {
            screen : Nick,
            navigationOptions: ({ navigation }) => ({
                title : '닉네임 변경',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    textAlign: 'center',
                    alignSelf:'center',
                    flexGrow:1,
                    justifyContent: 'center',
                    textAlignVertical: 'center'
                },
                headerRight: (
                    <Button
                      style = {{width : 20,height : 20}}
                      onPress={() => alert('This is a button!')}
                      title="확인"
                      textColor={Utill.color.black}
                    />
                  ),
            }),
        },
        webView : { 
            screen : webView,
            navigationOptions: ({ navigation }) => ({
                title : '이용약관',
                headerTitleStyle: {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    flexGrow:1,
                    marginRight : 70,
                    
                },
            }),
        },
        Client : { 
            screen : Client,  
            navigationOptions: ({ navigation }) => ({
                title : '고객센터',
                headerTitleStyle: {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    flexGrow:1,
                    marginRight : 70,
                    
                },
            }),
        },
        Notice : {
            screen : Notice,
            navigationOptions: ({ navigation }) => ({
                title : '공지사항',
                headerTitleStyle: {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    flexGrow:1,
                    marginRight : 70,
                    
                },
            }),
        },
        Review : {
            screen : Review,
            navigationOptions: ({ navigation }) => ({
                title : '나의 리뷰',
                headerTitleStyle: {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    flexGrow:1,
                    marginRight : 70,
                    
                },
            }),
        },
        Point : {
            screen : Point,
            navigationOptions: ({ navigation }) => ({
                title : '디나 포인트',
                headerTitleStyle: {
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    flexGrow:1,
                    marginRight : 70,
                    
                },
            }),
        },
    },
    {
        initialRouteName : 'TabMy',
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