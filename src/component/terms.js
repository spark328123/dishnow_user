//component에 들어갈 파일 : 겉으로 보이는 뷰들
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import * as Utill from '../utill';
import CheckView from './register/TermsCheck';
import { BigButtonBorder, Text } from '../component/common';
const Terms = (props) => {
    const {navigation} = props;
    const [type] = useState(navigation.getParam('type'));
    const [token] = useState(navigation.getParam('token'));
    return (
        <ScrollView style={styles.pageContainer}>
            <View style = {styles.container}>
                <View>
                    <Text style={styles.title}>{"디쉬나우 서비스 이용약관"}</Text>
                </View>
                <CheckView 
                    title='모두 확인 동의합니다.'
                    titleStyle={styles.checkTitleText}
                />
                <View style={styles.termsArea}>
                    <CheckView 
                        title='(필수) 서비스 이용 약관 동의'
                        titleStyle={styles.checkContentText}
                        onPressBracket={true}
                    />
                    <CheckView 
                        title='(필수) 개인정보 처리방침 동의'
                        titleStyle={styles.checkContentText}
                        onPressBracket={true}
                    />
                    <CheckView 
                        title='(필수) 위치 기반 서비스 동의'
                        titleStyle={styles.checkContentText}
                        onPressBracket={true}
                    />
                    <CheckView 
                        title='(선택) 마케팅 수신 동의'
                        titleStyle={styles.checkContentText}
                        onPressBracket={true}
                    />
                </View>

                <BigButtonBorder 
                    style = {styles.nextButton}
                    onPress={() => navigation.push('Register', {
                        type,
                        token
                    })}
                    title = {'다음'}
                >
                </BigButtonBorder>

                <TouchableOpacity
                    style = {styles.btnWebView} 
                    onPress = { () => navigation.navigate('webView') }>
                    <View><Text>웹뷰용 버튼</Text></View>
                </TouchableOpacity>
        
            </View> 
        </ScrollView>
    )
}
export default Terms;

//눌렀을 때 웹뷰로 이용약관 띄우기

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding : 22.5,
    },
    btnWebView: {
        height: 75,
        width: 75,
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