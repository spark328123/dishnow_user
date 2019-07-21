import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
} 
from "react-native";
import { AccessToken, LoginManager } from "react-native-fbsdk";


const facebooklogin = () =>{
    LoginManager.logInWithPermissions(['public_profile', 'email'])
    .then(result=>{
        AccessToken.getCurrentAccessToken().then(data => {
            console.log(data.accessToken.toString());
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