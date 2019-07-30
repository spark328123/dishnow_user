import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
}
  from "react-native";
import RNKakaoLogins from 'react-native-kakao-logins';

import * as API from './API'

const type = 'kakao'

const KakaoLogin = ({ navigation }) => {
  const login = async (token) => {
    const loginRes = await API.login({ token, type });
    await API.setLocal(API.LOCALKEY_TOKEN, loginRes.token);
    if (!loginRes) { return false; }
    return true;
  }

  kakaoLogin = () => {
    console.log("   kakaoLogin   ");
    RNKakaoLogins.login((err, result) => {
      if (err) {
        console.log('카카오 인증 문제');
        return;
      }
      login(result.token)
        .then(res => {
          if (!res) {
            navigation.push('Terms', {
              type,
              token: result.token,
            });
          } else {
            navigation.navigate('Main');
          }
        }
        )
    });
  }
  kakaoLogout = () => {
    console.log("   kakaoLogout   ");
    RNKakaoLogins.logout((err, result) => {
      if (err) {
        console.log("error", err.toString());
        return;
      }
      console.log("Logout!", result);
    });
  }
  // 로그인 후 내 프로필 가져오기.
  getProfile = () => {
    console.log("getKakaoProfile");
    RNKakaoLogins.getProfile((err, result) => {
      if (err) {
        console.log("error", err.toString());
        return;
      }
      console.log("result", result);
    });
  }
  return (
    <TouchableOpacity
      onPress={kakaoLogin}
      style={styles.btnKakaoLogin}
    >
      <Image
        activeOpacity={0.5}
        style={styles.btnKakaoLogin}
        source={{uri: 'kakao_login_button'}}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnKakaoLogin: {
    height: 45,
    width: 282,
    alignSelf: "center",
    borderRadius: 0,
    borderWidth: 0,
    marginBottom: 50
  },
});

export default KakaoLogin;