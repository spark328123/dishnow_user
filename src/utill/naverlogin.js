import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

import { NaverLogin, getProfile } from 'react-native-naver-login';

const type = 'naver';

const initials = {
    kConsumerKey: 'ySQNgtddjDom1KTllxOM',
    kConsumerSecret: 'sOHeAXkGAf',
    kServiceAppName: '디쉬나우',
    kServiceAppUrlScheme: 'naverlogin', // only for iOS
};

const naverLogin = (navigation) => {
    NaverLogin.login(initials,(err,token)=>{
        navigation.push('Register',{
            token,
            type
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
                source={require("../assets/naver_btn_medium.png")} />
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnNaverLogin: {
        height: 50,
        width: 50,
        alignSelf: "center",
        backgroundColor: "#F8E71C",
      },
  });