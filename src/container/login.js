import React, {useState, useEffect} from 'react';
import {
 StyleSheet,
 View,
 Image,
 ImageBackground,
} from "react-native";
import KaKaoLogin from '../utill/kakaologin';
import FaceBookLogin from '../utill/facebooklogin';
import NaverLogin from '../utill/naverlogin'
import * as Utill from '../utill';
import * as API from '../utill/API';
import { Text, Button, BigButton, TextInput, SungminButton } from '../component/common'
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const type = 'email';
var token = '';

const Login = (props) => {
 const { navigation } = props;

 const [id, setId] = useState('');
 const [password, setPassword] = useState('');
 const [buttonLock, setButtonLock] = useState(false);


  _emailaccount = () => {
    navigation.navigate('Terms', {
      type,
      token,
    });
  }

  const _login = async()=>{
       token = `${id}/${password}`;
        const loginRes = await API.login({
            token,
            type
        });
        if(loginRes.token!==''){
            API.setTimer(API.TAB_TIMER, JSON.stringify(new Date().getTime() - 120000));
            await API.setLocal(API.LOCALKEY_TOKEN,loginRes.token);
            navigation.navigate('Splash');
        }
        else{
          Toast.show('이메일과 비밀번호를 확인해주세요.');
        }
  }

  return (

    <View style = {styles.container}>
        
    <ImageBackground source={{uri : "login_image3"}} style={{flex: 1}} imageStyle={{resizeMode: "cover"}}>
    <KeyboardAwareScrollView>
        <View style={styles.logo}>
          <Image
            style={styles.dishnowLogo}
            source={{uri: "dishnow_logo_white"}}
            resizeMode="contain"
          />
        </View>


       <View style={styles.loginContainer}>
         <View>
           <TextInput
           style = {[styles.input, {marginTop: Utill.screen.Screen.customHeight(56)}]}
           value = {id}
           onChangeText = {(text)=>setId(text)}
           placeholder = {"이메일주소"}
           placeholderTextColor = {Utill.color.onColorBackground}/>
         </View>

         <View>
           <TextInput
           secureTextEntry = {true}
           style = {[styles.input, {marginTop: Utill.screen.Screen.customHeight(39)}]}
           value = {password}
           onChangeText = {(text)=>setPassword(text)}
           placeholder = {"비밀번호"}
           placeholderTextColor = {Utill.color.onColorBackground}/>
         </View>

         <SungminButton
            onPress = {_login}
           disable = {buttonLock}
           style = {styles.loginButton}
           title = {"이메일 로그인"}>
         </SungminButton>


       </View>

       <View style={styles.snsLoginContainer}>
         <Text style={[styles.snsText, {marginBottom: Utill.screen.Screen.customHeight(15)}]}>SNS 로그인</Text>
         <View style={styles.snsButtonContainer}>
           <KaKaoLogin navigation={navigation} />
           <FaceBookLogin navigation={navigation} />
           <NaverLogin navigation={navigation} />
         </View>
       </View>

       <Button
           style = {styles.create}
           onPress={()=>_emailaccount()}
           >
           <Text style = {styles.createText}>{"이메일로 계정 만들기"}</Text>
        </Button>
        </KeyboardAwareScrollView>
    </ImageBackground>
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
 }, 
 linearGradient: {
   flex: 1
 },
 logo: {
   alignItems: "center",
   justifyContent: "center"
 },
 dishnowLogo: {
   marginTop: Utill.screen.Screen.customHeight(80),
   width: Utill.screen.Screen.customWidth(262),
   height: Utill.screen.Screen.customHeight(55.24)
 },
loginContainer: {
   alignItems: "center",
 },
snsLoginContainer: {
   marginTop: Utill.screen.Screen.customHeight(40),
   marginBottom: Utill.screen.Screen.customHeight(40),
   alignItems: "center",
   justifyContent: "flex-start",
 },
snsText: {
   fontSize: 15,
   color: "#FFFFFF"
 },
snsButtonContainer: {
   flexDirection: "row",
   justifyContent: "space-around",
   width: Utill.screen.Screen.customWidth(226),
 },
create : {
   alignItems : 'center',
   borderBottomColor : "white",
   marginBottom : 10,
   borderBottomColor: "white",
   borderBottomWidth: 1,
   alignSelf: 'center',
  
 },
createText: {
  fontSize: 16,
  color: "white",
  marginBottom : Utill.screen.Screen.customHeight(5),
},
 loginButton : {
   alignItems: "center",
   justifyContent: "center",
   marginTop: Utill.screen.Screen.customHeight(30)
 },
 input : {
   fontSize : 18,
   width : Utill.screen.Screen.customWidth(278.5),
   height: 50,
   borderBottomWidth : 1.3,
   borderBottomColor : Utill.color.onColorBackground,
   color : Utill.color.onColorBackground,
 },
 
});