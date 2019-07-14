import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import Home from './homestack';
import Booked from './bookedstack';
import My from './mystack';

import TabItem from '../component/tabItem';
import * as Utill from '../utill';

const mainTab = createBottomTabNavigator(
    {
        tab1 : Booked,
        tab2 : Home,
        tab3 : My,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon : ({ tintColor }) => {
                const { routeName } = navigation.state;
               /* image source
                switch (routeName) {
                    case 'tab1' : break;
                    case 'tab2' : break;
                    case 'tab3' : break;
                }
                */
                let label = ' ';
                switch (routeName) {
                    case 'tab1' : label = '예약 내역'; break;
                    case 'tab2' : label = 'home'; break;
                    case 'tab3' : label = 'MY'; break;
                }
                return <TabItem label={label} source = 'hello' tintColor={tintColor}/>
            }
        }),
        tabBarOptions: {
            activeTintColor : '#411079',
            inactiveTintColor : '#333333',
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