import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import GoogleMap from '../utill/googlemap.js';
import { NavigationActions } from 'react-navigation'

const TabHome = (props)=>{
    const {navigation} = props;
   
    return(
        //toggle(isPressed => !isPressed)
        <View style = {styles.container}>
            <GoogleMap
               isPressed = {false}
               navigatation = {navigation}   
               toggle = {()=>{navigation.push('Departure')}}
               latitudeDelta = {0.0065}
               style = {styles.map}
            ></GoogleMap>
              <View style = {styles.address}>
                    <Text style ={{fontSize:15,padding:10}}>출발지 : 찾는 중 ...</Text>
                </View>
          
            <View style = {styles.input}>
                <Text>테마</Text>
                <Text>안주가격</Text>
                <Text>인원</Text>
                <Text>출발 예정 시간</Text>
                <Text>식당 찾기</Text>
            </View>
        </View>
    )
}

TabHome.NavigationOptions = screenProps => ({
    tabBarVisible : screenProps.navigation.getParam('tabBarVisible')
})

export default TabHome;

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    map : {
        flex : 1
    },
    address : {
        justifyContent : 'center',
    },
    input : {
        flex : 2,
        alignItems : 'center',
        justifyContent : 'space-around',
        backgroundColor : '#FFF'
    },
})

