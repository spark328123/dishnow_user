import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

import { NaverLogin, getProfile } from 'react-native-naver-login';

const initials = {
    kConsumerKey: 'ySQNgtddjDom1KTllxOM',
    kConsumerSecret: 'sOHeAXkGAf',
    kServiceAppName: '디쉬나우',
    kServiceAppUrlScheme: 'naverlogin', // only for iOS
};

const naverLogin = () => {
    NaverLogin.login(initials,(err,token)=>{
        console.log(token);
    });
  };

export default() =>{
    return (
        <TouchableOpacity
        style = {styles.btnNaverLogin}
        onPressIn = {naverLogin} >
        <Image
          activeOpacity={0.5}
          style={styles.btnKakaoLogin}
          source={require("../assets/naver_btn_medium.png")}
        />
      </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btnNaverLogin: {
        height: 50,
        width: 50,
        alignSelf: "center",
        backgroundColor: "#F8E71C",
        borderRadius: 0,
        borderWidth: 0
      },
  });