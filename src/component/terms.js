//component에 들어갈 파일 : 겉으로 보이는 뷰들
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,
    WebView,
} from 'react-native';
import * as Utill from '../utill';
import CheckView from './register/TermsCheck';

const Terms = (props) => {
    
    const [isPress,setPress] = useState(false);

    const webview = () => {
        setPress(true);
    }
    const { navigation } = props;
    const [type] = useState(navigation.getParam('type'));
    const [token] = useState(navigation.getParam('token'));
    console.log(type, token);
    console.log(webview);
    return (
        <View style = {styles.container}>
            {!isPress?(
              <WebView
            source={{ uri: "http://dishnow.kr/Terms.html" }}
            javaScriptEnabled={true}
            />
            ):null}
        </View>
    )
}
export default Terms;

//눌렀을 때 웹뷰로 이용약관 띄우기

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding : 22.5,
    },
    btnWebView: {
        height: 100,
        width: 100,
        backgroundColor: "#bbb",
        borderRadius: 0,
        borderWidth: 0,
        marginBottom: 50,
        justifyContent : 'center',
        alignItems : 'center',
    },
    pageContainer : {
        width : Utill.screen.screenWidth,
        paddingHorizontal : 15,
    },
    termsArea : {
        borderTopWidth : 0.8,
        borderBottomWidth : 0.8,
        borderColor : Utill.color.border,
        height : 170,
        justifyContent : 'space-evenly',
        paddingHorizontal : 11.5,
        marginTop : 15,
    },
    title : {
        margin : 0,
        padding : 0,
        marginBottom: 46,
        fontSize : 16,
        color : Utill.color.textBlack,
    },
    checkTitleText : {
        fontSize : 15,
        color : Utill.color.textBlack,
    },
    checkContentText : {
        fontSize : 14,
        color : Utill.color.textBlack,
    },
    nextButtonArea : {
        flexDirection : 'row',
        justifyContent : 'center',
        marginTop : 39,
        marginBottom : 50,
    },
    nextButton : {
        width : 263,
        height : 51,
        borderRadius : 25.5,
        borderWidth : 0.5,
        borderColor : Utill.color.primary1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : Utill.color.onColorBackground
    },
    nextButtonText : {
        fontSize : 18, 
        color : Utill.color.primary1,
    }
})