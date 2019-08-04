import React, { useState,useEffect } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native'
import {BigButton,SmallButton} from '../../component/common/'
export default Nick = ({navigation}) => {
    const [nickName,setNickName] = useState(navigation.getParam('nickname')); //닉네임
    const [nickLength,setNickLength] = useState(0);
    const [pressed,isPressed] = useState(false);
    const id = navigation.getParam('id'); //사용자 id
    
    //nick이 변경될 때 마다 호출
    _setNickName = (text) => {
        setNickName(text);
        setNickLength(text.length);
    }
    _isLong = (nick) => {
        if(nick.length > 20)
            {
                Alert.alert("닉네임은 20글자를 넘을 수 없습니다.","",
                    [
                        {
                            text: '확인', onPress: () =>  _setNickName(''), 
                            
                        },
                    ],
                    {cancelable: false},
                );
            }
    }
    
    return (
        <View style = {styles.container}>
            <Text>
                닉네임
            </Text>
            <TextInput
                style={[styles.textInput, { marginBottom: 50 }]}
                selectionColor='#733FFF'
                placeholder={'닉네임을 입력해 주세요'}
                onChangeText = {(text)=>_setNickName(text,_isLong(text))}
                value = {nickName}
            />
            <View style = {styles.txt}>
                <Text
                    style = {{fontSize:12,marginBottom:20}}
                >
                    {nickLength}
                </Text>
                <Text
                    style = {{fontSize:12,marginBottom:20}}
                >
                    /20
                </Text>
            </View>
            <TouchableOpacity
                onPress = {()=>_setNickName('',console.log('CancleCliked and nameis : ',nickName.length))}
            >
                <Image
                    style = {{width:12,height:12}}
                    source = {{uri : 'icon_x'}}
                   
                />
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center'
    },
    txt : {
        flexDirection : 'row',
        alignItems : 'center'
    }
})