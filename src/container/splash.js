import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

    const _me = async () =>{
        const meRes = await API.me({token :'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…k1Mn0.wsrNK4PqMWrDGbwH71lnFIMpgabl5J66p1zVeCf6eWI'});
        console.log(meRes);
    }
   
    _getPosition();
    useEffect(()=>{
        _me();
        setTimeout(()=>{
            if(API.getLocal(API.LOCALKEY_TOKEN)===null){
                navigation.navigate('Main'); 
            
            }else{
                navigation.navigate('Login');
            }
        },1000)
    }, []);

    return (
        <View style = {styles.container}>
            <Text style = {{fontSize : 30}}>디쉬나우 </Text>
            </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    }
})