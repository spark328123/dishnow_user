import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import GoogleMap from '../utill/googlemap.js';
import { NavigationActions } from 'react-navigation'

const TabHome = (props)=>{
    const {navigation} = props;
    const prevRegion = navigation.getParam('region',{
        latitude :null,
        longitude : null,
      
     });
   
    return(
        <View style = {styles.container}>
            <GoogleMap
               isPressed = {false}
               navigation = {navigation}   
               latitudeDelta = {0.0065}
               style = {styles.map}
               toggle  = {()=>{navigation.navigate('Departure')}
                }
            ></GoogleMap>
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


export default TabHome;

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    map : {
        flex : 1
    },
  
    input : {
        flex : 2,
        alignItems : 'center',
        justifyContent : 'space-around',
        backgroundColor : '#FFF'
    },
})
