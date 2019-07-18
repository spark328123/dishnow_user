import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import * as API from '../utill/API';
import {updateLocation} from '../store/modules/maps';

import LinearGradient from 'react-native-linear-gradient';

export default (props) => {
    let latitude;
    let longitude;
    const _getPosition = async ()=>{
        await navigator.geolocation.getCurrentPosition((position)=>{
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            dispatch(updateLocation({latitude,longitude}));
         });    
    }
   
    const { navigation } = props;
    const dispatch = useDispatch();
   
    _getPosition();
    useEffect(()=>{
        setTimeout(()=>{
            if(API.getLocal(API.LOCALKEY_TOKEN)!==null){
                navigation.navigate('Main');
            
            }else{
                navigation.navigate('Login');
            }
        },1000)
    }, []);

    return (
        <View><Text>hello world!</Text></View>
    );
}