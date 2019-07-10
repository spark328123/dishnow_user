import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
import RNKakaoLogins from "react-native-kakao-logins";
//import { loadFontFromFile } from 'react-native-dynamic-fonts';
import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
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
import Loginkakao from "./login_kakao";

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isKakaoLogging: false,
      region: {
        latitude: 37.5514642,
        longitude: 126.9250106,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    });
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
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
          <View style={styles.logo}>
            <Image
              style={styles.dishnowLogo}
              source={require("./assets/DISHNOW_LOGO_white.png")}
            />
          </View>
          <View style={styles.loginContainer} />
          <View style={styles.snsLoginContainer}>
            <Text style={styles.snsText}>SNS 로그인</Text>
            <View style={styles.snsButtonContainer}>
              <Loginkakao />
              <TouchableOpacity>
                <Image
                  onPress={() => {
                    this.kakaoLogin();
                  }}
                  activeOpacity={0.5}
                  style={styles.btnKakaoLogin}
                  textStyle={styles.txtNaverLogin}
                  source={require("./assets/naver_btn_medium.png")}
                />
              </TouchableOpacity>
              <View>
                <LoginButton
                  onLoginFinished={(error, result) => {
                    if (error) {
                      console.log("login has error: " + result.error);
                    } else if (result.isCancelled) {
                      console.log("login is cancelled.");
                    } else {
                      AccessToken.getCurrentAccessToken().then(data => {
                        console.log(data.accessToken.toString());
                      });
                    }
                  }}
                  alignSelf="center"
                  onLogoutFinished={() => console.log("logout.")}
                />
              </View>
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
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          region={{
            latitude: 37.5514642,
            longitude: 126.9250106,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          showsUserLocation
        >
          <Marker draggable coordinate={this.state.region} />
        </MapView>
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
