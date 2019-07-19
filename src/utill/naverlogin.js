import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
const NaverLogin = () =>{
    return (
        <TouchableOpacity>
        <Image
          activeOpacity={0.5}
          style={styles.btnKakaoLogin}
          source={require("../assets/naver_btn_medium.png")}
        />
      </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btnKakaoLogin: {
        height: 50,
        width: 50,
        alignSelf: "center",
        backgroundColor: "#F8E71C",
        borderRadius: 0,
        borderWidth: 0
      },
  });


export default NaverLogin;