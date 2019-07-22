import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
} 
from "react-native";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import * as API from '../utill/API';

const type = 'facebook';

const login = async (token) => {
    const loginRes = await API.login({token,type});
    await API.setLocal(API.LOCALKEY_TOKEN, loginRes.token);
    if(loginRes.error) {return false;}
    return true;
}

const facebooklogin = () =>{
    LoginManager.logInWithPermissions(['public_profile', 'email'])
    .then(result=>{
        AccessToken.getCurrentAccessToken().then(data => {
           login(data.accessToken.toString())
          .then(res=>{
              if(!res){
                navigation.push('Terms',{
                    type,
                    token : result.token,
                })
              }else{
                navigation.navigate('Main');                  
              }
          })
        })
    })
}
 
const FaceBookLogin = () =>{
    return (
        <TouchableOpacity
            style = {styles.btnFaceBookLogin}
            onPressIn = {facebooklogin}
        >
            <Image
                style = {styles.btnFaceBookLogin}
                source = {require('../assets/f_logo.png')}
            >
            </Image>
        </TouchableOpacity>
    )
}

export default FaceBookLogin;

const styles = StyleSheet.create({
    btnFaceBookLogin: {
      height: 50,
      width: 50,
      alignSelf: "center",
      backgroundColor: "#3b5998",
      borderRadius: 0,
      borderWidth: 0,
      marginBottom: 50
    },
  });