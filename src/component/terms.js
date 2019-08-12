import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView,Image} from 'react-native';

import {BigButtonBorder, NavHead,Text} from './common';
import * as Utill from '../utill';

import CheckView from '../component/register/TermsCheck';


export default ({navigation}) => {

    const [type] = useState(navigation.getParam('type'));
    const [token] = useState(navigation.getParam('token'));
    const [valid, setValid] = useState({c1 : false, c2 : false, c3 : false, c4 : false});
    const [validAll, setValidAll] = useState(false);
    const [kakaoProfile] = useState(navigation.getParam('kakaoProfile'));
    console.log(navigation.getParam('kakaoProfile'));

    const _onNextPress = () => {
        navigation.push('Register',{
            type,
            token,
            kakaoProfile,
        },
        )
    }
    const _validation =()=> {
        return valid.c1 && valid.c2 && valid.c3;
    }
    const _chackAll =(set)=>{
        setValidAll(set);
        setValid({c1 : set, c2 : set, c3 : set, c4 : set});
    }
    const _isCheckAll =()=> {
        return validAll? true:null;
    }
    return (
        <ScrollView style={styles.pageContainer}>
            <NavHead title = {'회원가입'}/>
            <View style = {styles.container}>
                <View style = {{flexDirection:'row'}}>
                    <Image 
                        style ={{width : 4, height : 4,marginRight:3}}
                        source = {{uri:'dot_purple'}}
                    />
                    <Image 
                        style ={{width : 4, height : 4}}
                        source = {{uri:'dot_grey'}}
                    />
                </View>
                <View>
                    <Text style={styles.title}>{"디쉬나우 서비스 이용약관"}</Text>
                </View>
                <CheckView 
                    title='모두 확인 동의합니다.'
                    value={validAll}
                    onChange={change=>_chackAll(change)}
                    titleStyle={styles.checkTitleText}
                />
                <View style={styles.termsArea}>
                    <CheckView 
                        title='(필수) 서비스 이용 약관 동의'
                        titleStyle={styles.checkContentText}
                        setValue={_isCheckAll()}
                        onChange={change=>{
                            setValid(v=>({...v, c1:change}));
                        }}
                        onPressBracket={()=>navigation.push('webView',{
                                source : {uri : 'http://dishnow.kr/terms/1.html'}
                            })}
                    />
                    <CheckView 
                        title='(필수) 개인정보 처리방침 동의'
                        titleStyle={styles.checkContentText}
                        setValue={_isCheckAll()}
                        onChange={change=>{
                            setValid(v=>({...v, c2:change}));
                        }}
                        onPressBracket={()=>navigation.push('webView',{
                            source : {uri : 'http://dishnow.kr/terms/2.html'}
                        })}
                    />
                    <CheckView 
                        title='(필수) 위치 기반 서비스 동의'
                        titleStyle={styles.checkContentText}
                        setValue={_isCheckAll()}
                        onChange={change=>{
                            setValid(v=>({...v, c3:change}));
                        }}
                        onPressBracket={()=>navigation.push('webView',{
                            source : {uri : 'http://dishnow.kr/terms/3.html'}
                        })}
                    />
                    <CheckView 
                        title='(선택) 마케팅 수신 동의'
                        titleStyle={styles.checkContentText}
                        setValue={_isCheckAll()}
                        onChange={change=>{
                            setValid(v=>({...v, c4:change}));
                        }}
                        onPressBracket={()=>navigation.push('webView',{
                            source : {uri : 'http://dishnow.kr/terms/4.html'}
                        })}
                    />
                </View>
                <View style={{alignItems : 'center', marginTop : 17}}>
                    <Text style={{fontSize : 14, color : '#CCCCCC', fontFamily : 'NanumSquareOTFL'}}>필수 약관 동의 후 서비스 이용이 가능합니다</Text>
                </View>
                <View style={styles.nextButtonArea}>
                        <BigButtonBorder title={'다음'} disabled={!_validation()} onPress={_onNextPress}>
                        </BigButtonBorder>
                </View>
            </View>
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginLeft : 15,
        marginRight : 15,
    },
    pageContainer : {
        width : Utill.screen.screenWidth,
    },
    termsArea : {
        borderTopWidth : 0.8,
        borderBottomWidth : 0.8,
        borderColor : Utill.color.border,
        height : 170,
        justifyContent : 'space-evenly',
        paddingHorizontal : 11.5,
        marginTop : 15,
        fontFamily : 'NanumSquareOTFR',
    },

    title : {
        marginTop : 9,
        fontFamily : 'NanumSquareOTFR',
        margin : 0,
        padding : 0,
        marginBottom: 46,
        fontSize : 16,
        color : '#111111',
        fontWeight : 'bold',
    },

    checkTitleText : {
        fontSize : 15,
        color : Utill.color.textBlack,
        fontFamily : 'NanumSquareOTFR',
    },
    checkContentText : {
        fontSize : 14,
        color : Utill.color.textBlack,
        fontFamily : 'NanumSquareOTFR',
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