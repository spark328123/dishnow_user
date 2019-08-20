import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import { BigButtonBorder, Text } from './common'
import {handleAndroidBackButton,removeAndroidBackButtonHandler} from './common/hardwareBackButton'
import * as Utill from '../utill'

const Welcome = (props) =>{
    _goBack = () => {
        navigation.navigate('Main');
    }
    handleAndroidBackButton(_goBack);
    const {navigation } = props;
    const [name] = useState(navigation.getParam('name'));
  
    return (
        <View style = {styles.container}>
        <View style = {{marginTop:Utill.screen.topSafe}}>
        </View>
            <View>
                <Text style ={{fontSize : 50, marginTop:Utill.screen.Screen.customHeight(67), marginBottom: Utill.screen.Screen.customHeight(43)}}>환영합니다!</Text>
            </View>
            <View style= {{flexDirection:'row', marginBottom:Utill.screen.Screen.customHeight(12)}}>
                <Text style = {[styles.text,{color:'#733FFF'}]}>{name}</Text>
                <Text style = {styles.text}>님, 회원가입을 축하합니다.</Text>
            </View>
            <Text style = {styles.text}>바로 서비스를 이용해 보세요.</Text>
            <Image style = {{width: 145, height:145, marginTop: Utill.screen.Screen.customHeight(110), marginBottom: Utill.screen.Screen.customHeight(89)}}source = {{uri: "icon_eat"}}></Image>
            <BigButtonBorder title = '확인' onPress ={()=>{navigation.navigate('Main')}}></BigButtonBorder>
        </View>
    )
}
export default Welcome;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        backgroundColor:Utill.color.white,
    },
    text : {
        fontSize : 18
    },  
})