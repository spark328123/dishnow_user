import React from "react";
import {
  StyleSheet,
  //StatusBar,
  TouchableOpacity,
  Image
} 
from "react-native";
import RNKakaoLogins from 'react-native-kakao-logins';

const KakaoLogin = ({navigation}) =>{

  // 카카오 로그인 시작.
   kakaoLogin= () => {
    console.log("   kakaoLogin   ");
    RNKakaoLogins.login((err, result) => {
      if (err) {
        return;
      }
      console.log("Login!", result);
      navigation.navigate('Main');
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
        onPress={() => {
          this.kakaoLogin();
        }}
      >
        <Image
          onPress={() => this.kakaoLogin()}
          activeOpacity={0.5}
          style={styles.btnKakaoLogin}
          textStyle={styles.txtNaverLogin}
          source={require("../assets/kakaolink_btn_medium.png")}
        />
      </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
  btnKakaoLogin: {
    height: 50,
    width: 50,
    alignSelf: "center",
    backgroundColor: "#F8E71C",
    borderRadius: 0,
    borderWidth: 0,
    marginBottom: 50
  },
  txtNaverLogin: {
    fontSize: 16,
    color: "#3d3d3d",
    borderRadius: 0,
    borderWidth: 0,
    marginBottom: 50
  }
});

export default KakaoLogin;