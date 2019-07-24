import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import GoogleMap from '../utill/googlemap.js';
import { useDispatch } from 'react-redux';
import * as API from '../utill/API';
import * as User from '../store/modules/user'

const TabHome = (props)=>{
    const dispatch = useDispatch();
    const _me = async() => {
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const meRes = await API.me(token);
        const userid = meRes.userId;
        const point = meRes.point;
        const name = meRes.name;
        const phone = meRes.phone;
        const image = meRes.image;
        const reviewcount = meRes.reviewcount;
        dispatch(User.updateuserid(userid));
        dispatch(User.updatepoint(point));
        dispatch(User.upadtename(name));
        dispatch(User.updatephone(phone));
        dispatch(User.updateimage(image));
        dispatch(User.updatereviewcount(reviewcount));
    }
    const { navigation } = props;

    useEffect(()=>{
        _me();
    },[]);
   
    return(
        <View style = {styles.container}>
            <GoogleMap
               isPressed = { false }
               navigation = { navigation }   
               latitudeDelta = {0.0125}
               style = {styles.map}
               toggle  = {()=>{ navigation.navigate('Departure') }}
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
        flex : 1,
        alignItems : 'center',
        justifyContent : 'space-around',
        backgroundColor : '#FFF'
    },
})
