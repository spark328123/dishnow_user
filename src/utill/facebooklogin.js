import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Image,
}
    from "react-native";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import * as API from '../utill/API';




const FaceBookLogin = ({navigation}) => {
    const type = 'facebook';
    const login = async (token) => {
        console.log(token);
        const loginRes = await API.login({ token, type });
        console.log(loginRes);
        if (loginRes.token==='') { return false; }
        await API.setLocal(API.LOCALKEY_TOKEN, loginRes.token);
        return true;
    }
    
    const facebooklogin = (err,result) => {
        console.log("   facebooklogin   ");
        LoginManager.logInWithPermissions(['public_profile'])
            .then(result => {
                AccessToken.getCurrentAccessToken().then(data => {

                    login(data.accessToken.toString())
                        .then(res => {
                            if (!res) {
                                navigation.navigate('Terms', {
                                    type,
                                    token: result.token,
                                })
                            } else {
                                navigation.navigate('Main',{
                                    type,
                                    token: result.token,
                                });
                            }
                        })
                })
            })
    }
    return (
        <TouchableOpacity
            style={styles.btnFaceBookLogin}
            onPress={()=>facebooklogin(navigation)}
        >
            <Image
                style={styles.btnFaceBookLogin}
                source={{uri: 'icon_facebook'}}
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
        borderRadius: 0,
        borderWidth: 0,
    },
});