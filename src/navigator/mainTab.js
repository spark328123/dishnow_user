import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import Home from './homestack';
import Booked from './bookedstack';
import My from './MyStack';

import TabItem from '../component/tabItem';
import * as Utill from '../utill';

//예약 내역, home, my 순으로 하단 탭바 생성
const mainTab = createBottomTabNavigator(
    {
        tab1 : Booked,
        tab2 : Home,
        tab3 : My,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            allowFontScaling : false,
            keyboardHidesTabBar : true,
            tabBarIcon : ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let uri = '';
                switch (routeName) {
                    case 'tab1' : uri = focused ? 'bfa_violet' : 'bfa_grey' ; break; //예약 내역
                    case 'tab2' : uri = focused ? 'icon_onwait_purple' : 'menu_bar' ; break; //home
                    case 'tab3' : uri = focused ? 'iconfinder_user_violet' : 'iconfinder_user_grey' ;  break; //My
                }
                let label = ' ';
                switch (routeName) {
                    case 'tab1' : label = '예약 내역'; break;
                    case 'tab2' : label = 'home'; break;
                    case 'tab3' : label = 'MY'; break;
                }
                return <TabItem label={label} source = {{ uri }} tintColor={tintColor}/>
            }
        }),
        tabBarOptions: {
            activeTintColor : Utill.color.primary1,
            inactiveTintColor : Utill.color.defaultColor,
            allowFontScaling : false,
            showLabel : false,
            style : {height : Utill.screen.bottomTabHeight, padding : 0},
        },
        initialRouteName :'tab2',
    }
)

mainTab.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
  };

export default mainTab;