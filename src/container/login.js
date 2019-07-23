import React from "react";
import LinearGradient from "react-native-linear-gradient";
import Toast, { DURATION } from 'react-native-easy-toast';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
            source={require("../assets/dishnow_logo_white.png")}
          />
        </View>
        <View style={styles.snsLoginContainer}>
          <Text style={styles.snsText}>SNS 로그인</Text>
          <View style={styles.snsButtonContainer}>
            <KaKaoLogin navigation={navigation} />
            <FaceBookLogin navigation={navigation} />
            <NaverLogin navigation={navigation} />
          </View>
          <Text
            style={styles.snsText}
          >새로운 계정 만들기</Text>
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
  btnKakaoLogin: {
    height: 50,
    width: 50,
    alignSelf: "center",
    backgroundColor: "#F8E71C",
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


