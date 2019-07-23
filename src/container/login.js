import React from "react";
import LinearGradient from "react-native-linear-gradient";

import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import KaKaoLogin from '../utill/kakaologin';
import FaceBookLogin from '../utill/facebooklogin';
import NaverLogin from '../utill/naverlogin'

const Login = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.linearGradient}
        colors={["#733FFF", "#8C31CB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.logo}>
          <Image
            style={styles.dishnowLogo}
            source={require("../assets/DISHNOW_LOGO_white.png")}
          />
        </View>
        <View style={styles.snsLoginContainer}>
          <Text style={styles.snsText}>SNS 로그인</Text>
          <View style={styles.snsButtonContainer}>
            <KaKaoLogin navigation={navigation} />
            <FaceBookLogin navigation={navigation} />
            <NaverLogin navigation={navigation} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    //marginTop: Platform.OS === 'ios' ? 0 : 24,
    //paddingTop: Platform.OS === 'ios' ? 24 : 0,
    backgroundColor: "white"
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
  loginContainer: {
    flex: 166 / 640,
    alignItems: "center",
    justifyContent: "center"
  },
  snsLoginContainer: {
    flex: 407 / 640,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  snsText: {
    fontSize: 15,
    color: "#FFFFFF"
  },
  snsButtonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: 260,
    marginTop: 20
  },
});


