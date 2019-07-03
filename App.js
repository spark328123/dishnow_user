import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
// const { RNKakaoLogins } = NativeModules;
import RNKakaoLogins from "react-native-kakao-logins";
//import { loadFontFromFile } from 'react-native-dynamic-fonts';

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
import { thisTypeAnnotation } from "@babel/types";

const { height, width } = Dimensions.get("window");
export default class App extends Component {
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
      <View style={styles.container}>
        <LinearGradient
          style={styles.linearGradient}
          colors={["#733FFF", "#8C31CB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Text>{this.state.token}</Text>
          <View style={styles.logo}>
            <Image
              style={styles.dishnowLogo}
              source={require("./assets/DISHNOW_LOGO_white.png")}
            />
          </View>

          <View style={styles.loginContainer}>
            <TouchableOpacity>
              <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>로그인</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.findAccountText}>
                아이디 또는 비밀번호를 잊으셨나요?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.snsLoginContainer}>
            <Text style={styles.snsText}>SNS 로그인</Text>
            <View style={styles.snsButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.kakaoLogin();
                }}
              >
                <Image
                  isLoading={this.state.isNaverLoggingin}
                  onPress={() => this.kakaoLogin()}
                  activeOpacity={0.5}
                  style={styles.btnKakaoLogin}
                  textStyle={styles.txtNaverLogin}
                  source={require("./assets/kakaolink_btn_medium.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  onPress={() => {
                    this.kakaoLogin();
                  }}
                  activeOpacity={0.5}
                  style={styles.btnNaverLogin}
                  textStyle={styles.txtNaverLogin}
                  source={require("./assets/naver_btn_medium.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  activeOpacity={0.5}
                  style={styles.btnNaverLogin}
                  textStyle={styles.txtNaverLogin}
                  source={require("./assets/facebook_btn_icon.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.newAccount}>
            <TouchableOpacity>
              <View style={styles.newAccountTextContainer}>
                <Text style={styles.newAccountText}>새로운 계정 만들기</Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    //marginTop: Platform.OS === 'ios' ? 0 : 24,
    //paddingTop: Platform.OS === 'ios' ? 24 : 0,
    backgroundColor: "white"
  },
  header: {
    flex: 8.8,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    flex: 87.5,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  btnKakaoLogin: {
    height: 50,
    width: 50,
    alignSelf: "center",
    backgroundColor: "#F8E71C",
    borderRadius: 0,
    borderWidth: 0
  },
  btnNaverLogin: {
    height: 50,
    width: 50,
    alignSelf: "center"
  },
  txtNaverLogin: {
    fontSize: 16,
    color: "#3d3d3d",
    borderRadius: 0,
    borderWidth: 0
  },
  linearGradient: {
    flex: 1
  },
  logo: {
    flex: 0.275,
    alignItems: "center",
    justifyContent: "center"
  },
  dishnowLogo: {
    width: "76%",
    resizeMode: "contain"
  },
  inputInformation: {
    flex: 0.1875,
    alignItems: "center",
    justifyContent: "space-around"
  },
  inputContainer: {
    width: 259.5,
    height: 41,
    borderColor: "#FFFFFF",
    borderBottomWidth: 1.2,
    opacity: 1
  },
  input: {
    color: "white",
    opacity: 1,

    fontSize: 18
  },
  loginContainer: {
    flex: 166 / 640,
    alignItems: "center",
    justifyContent: "center"
  },
  loginButton: {
    width: 260.5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    marginBottom: 23
  },
  loginButtonText: {
    fontSize: 18,
    color: "#733FFF"
  },
  findAccountText: {
    fontSize: 15,
    color: "#431AAF"
  },
  snsLoginContainer: {
    flex: 107 / 640,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  snsText: {
    fontSize: 15,
    color: "#FFFFFF"
  },
  snsButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 260,
    marginTop: 20
  },
  newAccount: {
    alignItems: "center",
    justifyContent: "center"
  },
  newAccountTextContainer: {
    height: 35,
    width: 150,
    borderBottomWidth: 0.7,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center"
  },
  newAccountText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 10
  }
});
