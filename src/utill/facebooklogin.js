import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Image,
}
from "react-native";
import { AccessToken, LoginManager, GraphRequestManager, GraphRequest} from "react-native-fbsdk";
import * as API from '../utill/API';

const type = 'facebook';

const login = async (token) => {
    console.log(token);
    const loginRes = await API.login({ token, type });
    console.log(loginRes);
    if (loginRes.token==='') { return false; }
    API.setTimer(API.TAB_TIMER, JSON.stringify(new Date().getTime() - 120000));
    await API.setLocal(API.LOCALKEY_TOKEN, loginRes.token);
    return true;
}

const facebooklogin = (navigation) => {
    LoginManager.logInWithPermissions(['public_profile'])
        .then(result => {
            console.log(result);
            if(result.isCancelled)return;
            AccessToken.getCurrentAccessToken().then(data => {
                let facebookId = data.userID;
                let accessToken = data.accessToken;
                const responseInfoCallback = (error, result) => {
                    if(error)return;
                    let user = {
                        token: accessToken.toString(),
                        name: result.name,
                        picture: result.picture.data.url,          
                        providerId: facebookId
                    }
                    console.log(user);
                    login(user.token)
                    .then(res => {
                        if (!res) {
                            navigation.navigate('Terms', {
                                type,
                                token: user.token,
                                faceBookProfile : `["${user.picture}"]`,
                            })
                        } else {
                            navigation.navigate('Main');
                        }
                    })
                }
                const infoRequest = new GraphRequest('/me',{
                    accessToken : accessToken, parameters : {
                        fields : {string : 'name,picture'}}
                    },responseInfoCallback);
                    new GraphRequestManager().addRequest(infoRequest).start();
                });
        })
}


const FaceBookLogin = ({navigation}) => {
    return (
        <TouchableOpacity
            style={styles.btnFaceBookLogin}
            onPressIn={()=>facebooklogin(navigation)}
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