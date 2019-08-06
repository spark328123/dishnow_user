import React, {useState, useEffect} from 'react';
import LinearGradient from "react-native-linear-gradient";
import {
  StyleSheet,
  View,
  Image,
} from "react-native";
import KaKaoLogin from '../utill/kakaologin';
import FaceBookLogin from '../utill/facebooklogin';
import NaverLogin from '../utill/naverlogin'
import * as Utill from '../utill';
import { Text, Button, BigButton, TextInput, SungminButton } from '../component/common'

const Login = (props) => {
  const { navigation } = props;

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLock, setButtonLock] = useState(false);

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
            source={{uri: "dishnow_logo_white"}}
          />
        </View>

        <View style={{alignItems : 'center'}}>
          <View>
            <TextInput
            style = {styles.input}
            value = {id}
            onChangeText = {(text)=>setId(text)}
            placeholder = {"이메일주소"}
            placeholderTextColor = {Utill.color.onColorBackground}/>
          </View>

          <View>
            <TextInput
            secureTextEntry = {true}
            style = {styles.input}
            value = {password}
            onChangeText = {(text)=>setPassword(text)}
            placeholder = {"비밀번호"}
            placeholderTextColor = {Utill.color.onColorBackground}/>
          </View>

          <SungminButton
            disable = {buttonLock}
            style = {styles.loginButton}
            title = {"이메일 로그인"}>
          </SungminButton>


        </View>
                
        <View style={styles.snsLoginContainer}>
          <Text style={styles.snsText}>SNS 로그인</Text>
          <View style={styles.snsButtonContainer}>
            <KaKaoLogin navigation={navigation} />
            <FaceBookLogin navigation={navigation} />
            <NaverLogin navigation={navigation} />
          </View>
        </View>

        <Button 
            style = {styles.create}
            >
            <Text style = {styles.createText}>{"새로운 계정 만들기"}</Text>
          </Button>
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
    width: 262,
    height: 55.24
  },
  loginContainer: {
    flex: 166 / 640,
    alignItems: "center",
    justifyContent: "center"
  },
  snsLoginContainer: {
    flex: 407 / 640,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop : 40,
  },
  snsText: {
    fontSize: 15,
    color: "#FFFFFF"
  },
  snsButtonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: 260,
    marginTop: 20,
  },
  create : {
    alignItems : 'center',
    borderBottomColor : Utill.color.onColorBackground,    
  },
  loginButton : {
    marginTop:50,
    alignItems: "center",
    justifyContent: "center"
  },
  input : {
    margin:0,
    padding:0,
    fontSize : 18,
    width : 278.5,
    paddingTop : 24,
    paddingBottom : 10,
    borderBottomWidth : 1.3,
    borderBottomColor : Utill.color.onColorBackground,
    color : Utill.color.onColorBackground,
  },
});