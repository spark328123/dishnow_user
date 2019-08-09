import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

import { NaverLogin, getProfile } from 'react-native-naver-login';
import * as API from './API'

const type = 'naver';

const initials = {
    kConsumerKey: 'ySQNgtddjDom1KTllxOM',
    kConsumerSecret: 'sOHeAXkGAf',
    kServiceAppName: '디쉬나우',
    kServiceAppUrlScheme: 'naverlogin', // only for iOS
};

const login = async (token) => {
    const loginRes = await API.login({token,type});
    await API.setLocal(API.LOCALKEY_TOKEN, loginRes.token);
    if(loginRes.error) {return false;}
    return true;
}

const naverLogin = (navigation) => {
    NaverLogin.login(initials,(err,token)=>{
        login(token)
        .then(res=>{
            if(!res){
                navigation.push('Terms',{
                    token,
                    type
                })
            }else{
                navigation.navigate('Main');
            }
        })
        console.log(token);
    });
  };

export default({navigation}) =>{
    return (
        <TouchableOpacity
            style = {styles.btnNaverLogin}
            onPressIn = {()=>{naverLogin(navigation)}} >
            <Image
                style={styles.btnNaverLogin}
                source={{uri: 'icon_naver'}} />
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnNaverLogin: {
        height: 50,
        width: 50,
        alignSelf: "center",
      },
  });