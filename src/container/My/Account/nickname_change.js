import React, { useState,useEffect,Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native'
import {BigButton,SmallButton,NavSwitchHead,CustomAlert} from '../../../component/common'
import {handleAndroidBackButton} from '../../../component/common/hardwareBackButton'
import * as API from '../../../utill/API'
import { useDispatch, connect } from 'react-redux';
import  * as User from '../../../store/modules/user'
import * as Utill from '../../../utill'
import { NavigationActions } from 'react-navigation';
export default Nick = ({navigation}) => {
    const [nickName,setNickName] = useState(navigation.getParam('nickname')); //닉네임
    const [nickLength,setNickLength] = useState(navigation.getParam('nickname').length);
    const [pressed,isPressed] = useState(false);
    const id = navigation.getParam('id'); //사용자 id
    const dispatch = useDispatch();
    _goBack = () => {
        navigation.navigate('Profile');
    }
    handleAndroidBackButton(_goBack);
    //nick이 변경될 때 마다 호출
    _setNickName = (text) => {
        setNickName(text);
        setNickLength(text.length);
    }
    
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const _onPressAlertCancel = () => {
        setIsAlertVisible(false);
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
  
    _saveNickName = async (nickName)=>{
        const ifnick = /^[가-힣A-Za-z0-9]{2,20}$/.test(nickName)&&nickName!==undefined;
        if(ifnick){
            //토큰을 끌어옴
            const token = await API.getLocal(API.LOCALKEY_TOKEN);
            //토큰에 해당하는 db에 nickname을 바꿈
            await API.changenick(token,{nickname:nickName});
            console.log ((User.updatenickname(nickName)));
            //바뀐 닉네임을 예쁘게 끌고와서 업데이트함
            await(dispatch(User.updatenickname(nickName)));
            navigation.navigate('Profile');
        }
        else{
            Alert.alert("닉네임은 2글자 이상이여야 합니다","",
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

            <NavSwitchHead navigation={navigation} title={`닉네임 변경`} navtitle={'Profile'} onSavePress = {() =>
                {
                <CustomAlert 
                    visible={isAlertVisible} 
                    mainTitle={'닉네임 변경'}
                    mainTextStyle = {styles.txtStyle}
                    subTitle = {'닉네임을 변경하시겠습니까?'}
                    subTextStyle = {styles.subtxtStyle}
                    buttonText1={'취소'}
                    buttonText2={'확인'}
                    onPressCancel = {_onPressAlertCancel}
                    onPress={_saveNickName(nickName)}/>
                }
                }
            />
                   
            <View style = {{marginRight : 15, marginLeft : 15}}>
                <Text style={{marginTop : 17, fontFamily : 'NanumSquareOTF', fontSize : 14, color : '#555555'}}>
                    닉네임
                </Text>
                <View style={{flexDirection : 'row', marginTop: 10,}}>
                    <TextInput
                        style = {styles.txtinput}
                        selectionColor={Utill.color.white}
                        placeholder={'닉네임을 입력해 주세요'}
                        onChangeText = {(text)=>_setNickName(text,_isLong(text))}
                        value = {nickName}
                    />
                    <TouchableOpacity
                        style ={{width : '5%'}}
                        onPress = {()=>_setNickName('',console.log('CancleCliked and nameis : ',nickName.length))}
                    >
                            <Image
                                style = {{width:12,height:12,position : 'absolute',bottom : 13}}
                                source = {{uri : 'icon_x'}}
                            />
                    </TouchableOpacity>
                </View>
                <View style = {styles.line}/>

                <View style = {styles.txt}>
                    <Text style = {{fontSize:12,marginBottom:20}}>
                        {nickLength}
                    </Text>
                    <Text style = {{fontSize:12,marginBottom:20}}>
                        /20
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : Utill.color.white,
    },
    txt : {
        flexDirection : 'row',
        alignItems : 'center',
        alignSelf: 'flex-end',
    },
    txtinput : {
        fontSize : 16,
        width : '95%',
        fontFamily: "NanumSquareOTFR",
        padding : 8,
    },
    line : {
        borderBottomWidth: 2,
        borderBottomColor:Utill.color.primary1,
        marginBottom : 11,
    },
    txtStyle : {
        marginBottom : Utill.screen.Screen.customHeight(9),
        fontSize : 18,
        fontWeight : 'bold',
        color : Utill.color.textBlack,
        textAlign : 'center',
    },
    subtxtStyle : {
        marginBottom : Utill.screen.Screen.customHeight(35),
        width : Utill.screen.Screen.customWidth(262),
        fontSize : 16,
        color : Utill.color.textBlack,
        textAlign : 'center',
    },
})