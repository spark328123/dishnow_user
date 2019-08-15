import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity,Image} from 'react-native';
import { Text } from '../component/common'
import GoogleMap from '../utill/googlemap';
import {handleAndroidBackButton, removeAndroidBackButtonHandler} from '../component/common/hardwareBackButton'
const StackDeparture = (props)=>{
    const { navigation } = props;
    const _goBack = ()=>{
        navigation.navigate('TabHome');
    }
    handleAndroidBackButton(_goBack)
    return(
        <View style = {styles.container}>
                    
            <GoogleMap style={styles.map}
                isPressed = {true}
                navigation = {navigation}
                latitudeDelta = {0.0162}
            ></GoogleMap>
        </View>
        
    )
    
} 

export default StackDeparture;

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    map : {
        flex :1,
    },
   
});