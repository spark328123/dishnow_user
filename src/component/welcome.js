import React, {useState} from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import { BigButton, Text } from './common'
export default (props) =>{
    const {navigation} = props;
    const [name] = useState(navigation.getParam('name'));
    return (
        <View style = {styles.container}>
            <View>
                <Text style ={{fontSize : 50}}>환영합니다!</Text>
            </View>
            <View style= {{flexDirection:'row'}}>
                <Text style = {[styles.text,{color:'#733FFF'}]}>{name}</Text>
                <Text style = {styles.text}>님, 회원가입을 축하합니다.</Text>
            </View>
            <Text style = {styles.text}>로그인 후 매장을 등록하실 수 있습니다.</Text>
            <Image style = {{width: 145, height:145}}source = {{uri: "icon_eat"}}></Image>
            <BigButton title = '확인' onPress ={()=>{navigation.navigate('Main')}}></BigButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'space-around',
        alignItems : 'center',
    },
    text : {
        fontSize : 18
    },  
})