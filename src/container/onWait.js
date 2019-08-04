import React, { useState, useEffect } from 'react';
import { 
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { Text } from '../component/common';
import * as Utill from '../utill';
import OneSignal from 'react-native-onesignal';

export default (props) =>{
    const { navigation } = props;

    useEffect(()=>{
        OneSignal.addEventListener('received',_oneSignalReceived);
        return()=>{
            OneSignal.removeEventListener('received');
        }
    },[]);

    const _oneSignalReceived = (notification) => {
        console.log(notification);
        if(!notification)return;
        const {latitude=null,longitude=null,mainImage=null,name=null,reservationId=null,storeId=null} = notification.payload.additionalData;
        navigation.navigate('List',{
            latitude,
            longitude,
            mainImage,
            name,
            reservationId,
            storeId,
            theme : navigation.getParam('tema'),
        });
    };

    return(
        <View style = {styles.container}>
            <View style = {styles.loading}>
                <ActivityIndicator size = "large" color = {Utill.color.primary1}/>
                <Text style = {{fontSize : 18}}>출발지 기준 200m 내 술집에 요청중</Text>
                <Text>2:00</Text>
            </View>
            <View style = {styles.data}>
                <Text>
                    {`| ${navigation.getParam('tema')} |`}
                </Text>
                <Text>
                    {navigation.getParam('people')}
                </Text>
                <Text>
                    {navigation.getParam('time')}
                </Text>
                <Text>
                    {navigation.getParam('address')}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    loading : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    data : {
        flex : 1,
        paddingLeft : 24,
        justifyContent : 'flex-start',
        alignItems : 'flex-start',
    }
})