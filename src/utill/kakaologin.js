import React, { useState } from "react";
import {
 StyleSheet,
 TouchableOpacity,
 Image,
}
 from "react-native";
import RNKakaoLogins from 'react-native-kakao-logins';
import {useDispatch} from 'react-redux';
import User from '../store/modules/user';
import * as API from './API'
const type = 'kakao'
export default ({ navigation }) => {
   const [kakaoProfile, setKakaoProfile] = useState();
   const [token,setToken] = useState();
   const dispatch = useDispatch();
   const login = async (token) => {
       const loginRes = await API.login({ token, type });
       const tokens = loginRes.token;
       if (tokens==='') { return false; }
       await API.setLocal(API.LOCALKEY_TOKEN, tokens);
       API.setTimer(API.TAB_TIMER, JSON.stringify(new Date().getTime() - 120000));
       return true;
   }
 kakaoLogin = () => {
   console.log("   kakaoLogin   ");
   RNKakaoLogins.login((err, result) => {
     if (err) {
       console.log(err.toString());
       console.log('카카오 인증 문제');
       return;
     }
     setToken(result.token);
     console.log("getKakaoProfile");
     var image;
     RNKakaoLogins.getProfile((err, result) => {
       if (err) {
         console.log("error", err.toString());
         return;
       }
       image = `["${result.profile_image_path}"]`;
       console.log(image);
     });
     login(result.token)
     .then(res => {
       if (!res) {
         navigation.navigate('Terms', {
           type,
           token: result.token,
           kakaoProfile : image,
         });
       } else {
         navigation.navigate('Main');
       }
     });
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
     setKakaoProfile(`["${result.thumb_image_path}"]`);
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
       source={{uri: 'icon_kakao'}}
     />
   </TouchableOpacity>
 );
}
const styles = StyleSheet.create({
 btnKakaoLogin: {
   height: 50,
   width: 50,
   alignSelf: "center",
   borderRadius: 0,
   borderWidth: 0,
 },
});
