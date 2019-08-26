import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import * as API from '../utill/API';
import * as Utill from '../utill';
import { updateLocation, updateAddress } from '../store/modules/maps';
import { Text } from '../component/common/'
import Toast from 'react-native-simple-toast';
import  * as User from '../store/modules/user'

export default (props) => {
    const [isLoaded,setIsLoaded] = useState(true);
    let latitude;
    let longitude;
    const { navigation } = props;
    const dispatch = useDispatch();

    const _getPosition = async () => {
        if(isLoaded){
            await navigator.geolocation.getCurrentPosition((position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log(latitude,longitude);
            dispatch(updateLocation({ latitude, longitude }));
        })}
        setIsLoaded(false);
    }
    const _me = async () => {
        let token = await API.getLocal(API.LOCALKEY_TOKEN);
        console.log(token);
        const res = await API.test();
        console.log(res);
        if(res.error){
            Toast.show('네트워크 연결 상태를 확인해 주세요');
            return;
        }
        if (token !== null && token !=='null') {
            const meRes = await API.me(token);
            const userid = meRes.userId;
            const point = meRes.point;
            const name = meRes.name;
            const phone = meRes.phone;
            const image = meRes.image;
            const reviewcount = meRes.reviewCount;
            const nickname = meRes.nickname;
            dispatch(User.updateuserid(userid));
            dispatch(User.updatepoint(point));
            dispatch(User.upadtename(name));
            dispatch(User.updatephone(phone));
            dispatch(User.updateimage(image));
            dispatch(User.updatereviewcount(reviewcount));
            dispatch(User.updatenickname(nickname));
            const pushToken = await API.getPush(API.PUSH_TOKEN);
            API.setTimer(API.TAB_TIMER, JSON.stringify(new Date().getTime()));
            await API.setPushToken(token,{pushToken});
            navigation.navigate('Main');
        } else {
            navigation.navigate('Login');
        }
    }

    useEffect(() => {
        _getPosition();
        if(!isLoaded)_me();
    }, [isLoaded]);

    return (
        <View style={styles.container}>
            <Image source={{uri: "dishnow_logo_purple"}} style={{width:262, height:53}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})