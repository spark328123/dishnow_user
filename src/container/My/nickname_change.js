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
            <Text style={{marginTop : 17, fontFamily : 'NanumSquareOTF', fontSize : 14, color : '#555555'}}>
                닉네임
            </Text>
            <View style={{flexDirection : 'row', marginTop: 10,}}>
                <TextInput
                    style = {styles.txtinput}
                    selectionColor='#733FFF'
                    placeholder={'닉네임을 입력해 주세요'}
                    onChangeText = {(text)=>_setNickName(text,_isLong(text))}
                    value = {nickName}
                />
                <TouchableOpacity
                    style ={{width : '5%'}}
                    onPress = {()=>_setNickName('',console.log('CancleCliked and nameis : ',nickName.length))}
                >
                        <Image
                            style = {{width:12,height:12,position : 'absolute', bottom : 5}}
                            source = {{uri : 'icon_x'}}
                        />
                </TouchableOpacity>
            </View>
            <View style = {styles.txt}>
                <Text style = {{fontSize:12,marginBottom:20}}>
                    {nickLength}
                </Text>
                <Text style = {{fontSize:12,marginBottom:20}}>
                    /20
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        marginLeft : 15,
        marginRight : 15,
        flex : 1,
    },
    txt : {
        flexDirection : 'row',
        alignItems : 'center',
        alignSelf: 'flex-end',
    },
    txtinput : {
        fontSize : 16,
        width : '95%',
        borderBottomWidth: 3,
        borderColor: "#733FFF", 
        fontFamily: "NanumSquareOTFR",
        padding: 0,
        borderWidth: 0,
    }
})