import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Home from './homestack';
import Booked from './bookedstack';
import My from './myStack';
import TabItemMain from '../component/tabItemMain';
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
                    case 'tab1' : uri = focused ? 'icon_clock_purple_main' : 'icon_clock_grey_main' ; break; //예약 내역
                    case 'tab2' : uri = focused ? 'icon_logo_purple_main' : 'icon_logo_grey_main' ; break; //home
                    case 'tab3' : uri = focused ? 'icon_user_purple_main' : 'icon_user_grey_main' ;  break; //My
                }
                let label = ' ';
                switch (routeName) {
                    case 'tab1' : label = '예약 내역';   return <TabItem label={label} source = {{ uri }} tintColor={tintColor}/>;
                    case 'tab2' : label = '';   return <TabItemMain source = {{ uri }} tintColor={tintColor}/>;
                    case 'tab3' : label = 'MY';   return <TabItem label={label} source = {{ uri }} tintColor={tintColor}/>;
                }
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