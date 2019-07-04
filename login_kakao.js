import React, { Component } from "react";
import RNKakaoLogins from "react-native-kakao-logins";
import {
  Platform,
  Alert,
  StyleSheet,
  Text,
  View,
  NativeModules,
  //StatusBar,
  Dimensions,
  Button,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class Loginkakao extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isKakaoLogging: false
    };
    if (!RNKakaoLogins) {
      console.log("Not Linked");
    }
  }
  // 카카오 로그인 시작.
  kakaoLogin() {
    console.log("   kakaoLogin   ");
    RNKakaoLogins.login((err, result) => {
      if (err) {
        return;
      }
      console.log("Login!", result);
    });
  }
  kakaoLogout() {
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
  getProfile() {
    console.log("getKakaoProfile");
    RNKakaoLogins.getProfile((err, result) => {
      if (err) {
        console.log("error", err.toString());
        return;
      }
      console.log("result", result);
    });
  }
  render() {
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
          source={require("./assets/kakaolink_btn_medium.png")}
        />
      </TouchableOpacity>
    );
  }
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
