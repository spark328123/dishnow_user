import React, { useState, memo, useEffect } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Image,
} from 'react-native';
import * as API from '../../utill/API';
import * as Utill from '../../utill';
import ImagePicker from 'react-native-image-picker';
import Dialog from "react-native-dialog";
import { useDispatch, connect } from 'react-redux';
import {NavHead, NavSwitchHead,CustomAlert} from '../../component/common'
import {handleAndroidBackButton} from '../../component/common/hardwareBackButton'
import  * as User from '../../store/modules/user'
const defaultImageSource = ({uri: 'icon_add_photo'});

const Profile = ({navigation, userid, nickname, image, phone, point, name}) => {
    _goBack = () => {
        navigation.navigate('TabMy')
    }

    handleAndroidBackButton(_goBack);
    const [id, idChange] = useState(userid);
    const [nick, nickChange] = useState(nickname);
    const [phonenum, phoChange] = useState(phone);
    const [pt, ptChange] = useState(point);
    const [nm, nmChange] = useState(name);
    const [profile, setProfile] = useState({uri:image.substring(2,image.length-2)}); 
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const photo = [];

    const _onPressAlertCancel = async() => {
        setIsAlertVisible(false);
    }

    const _onPressAlertOk = () => {
        setIsAlertVisible(false);
    }

    const _handleChoosePhoto = async() => {
        console.log('눌렀음');
        console.log('포토:' + photo);
        const options = {
            noData : true,
        };
       ImagePicker.launchImageLibrary(options, response => {
            console.log("response", response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                photo.push(response.uri);
                setProfile({uri : response.uri});
                _savePhoto(photo);
            }
       });
    }
    const _savePhoto = async (photo)=>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        var data = await _uploadPhoto(photo);
        console.log('token'+ token,data);
        console.log(data);
        //토큰을 끌어옴
        //토큰에 해당하는 db에 image 바꿈
        await API.changeprofile(token,{image:data});
        //바뀐 image 예쁘게 끌고와서 업데이트함
        dispatch(User.updateimage(data));
    }

    const _uploadPhoto = async(data) => {  
        const res = await API.uploadPhoto(data);
        console.log("awregawegeawweg" ,JSON.stringify(res));
        var profile = JSON.stringify(res.data); 
        console.log(profile);
        return profile;
    }
    
    const dispatch = useDispatch();
    
    return ( 
        <View style={styles.container}>
            <NavSwitchHead navigation={navigation} title={`계정관리`} navtitle ={'TabMy'}/>
            <CustomAlert 
                visible={isAlertVisible} 
                mainTitle={'디쉬나우 탈퇴'}
                mainTextStyle = {styles.txtStyle}
                subTitle = {'탈퇴하시겠습니까?'}
                subTextStyle = {styles.subtxtStyle}
                buttonText1={'아니오'} 
                buttonText2={'네'} 
                onPress={_onPressAlertOk} 
                onPressCancel = {_onPressAlertCancel}
            />
            <View style = {{marginLeft:Utill.screen.Screen.customWidth(15), marginRight : Utill.screen.Screen.customWidth(15)}}>
                
                <TouchableOpacity onPress={()=>_handleChoosePhoto()}
                    style = {{alignItems : 'center', marginTop : Utill.screen.Screen.customHeight(15)}}
                >

                {photo &&  (
                    <Image
                        source={profile}
                        style={{ width: 90, height: 90, borderRadius : 45}}
                    />
                )}
                {!photo && ( 
                    <Image
                    source={{uri : 'icon_profile_account'}}
                    style={{ width: 90, height: 90 }}
                    />
                )}
                </TouchableOpacity>
                <View style={{justifyContent : 'center', flexDirection : 'row'}}>
                    <TouchableOpacity
                        onPress = {()=>navigation.navigate('Nick',
                            {
                                id,
                                nickname : nick,
                            },
                        )
                    }>
                    <View style = {{flexDirection : 'row'}}>
                        <Text style={{fontSize : 16, color : '#111111', marginTop : 8}}> {nick} </Text>
                        <Image source = {{uri : 'icon_profile_change'}} style = {{width : 10, height : 10,alignSelf:'center'}}/>
                    </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.geajung}>
                <Text>계정정보</Text>
                </View>
                <View style={styles.garo}>
                    <View style={{width : '50%'}}>
                        <Text style={{fontSize : 14, color : '#555555', fontFamily : 'NanumSquareOTF' }}>이름</Text>
                    </View>
                    <View style={{width : '50%'}}>
                        <Text style={{fontSize : 16, color : '#111111', fontFamily : 'NanumSquareOTF', alignSelf: 'flex-end'}}>{nm}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.garo} onPress = {()=>navigation.navigate('PasswordCheck',{title : '휴대폰 번호 변경'})}>
                    <View style={{width : '50%'}}>
                        <Text style={{fontSize : 14, color : '#555555', fontFamily : 'NanumSquareOTF' }}>휴대폰 번호</Text>
                    </View>
                    <View style={{width : '50%'}}>
                        <Text style={{fontSize : 16, color : '#733FFF', fontFamily : 'NanumSquareOTF', alignSelf: 'flex-end'}}>{phonenum}</Text>
                    </View>
                </TouchableOpacity>
                <View style = {styles.line}/>
                <View style={styles.geajung}>
                <Text >계정보안</Text>
                </View>
                {/*
                <TouchableOpacity style={{height : Utill.screen.Screen.customHeight(43), marginTop : Utill.screen.Screen.customHeight(5), flexDirection : 'row'}} onPress = {()=>navigation.navigate('PasswordCheck',{title : '비밀번호 변경'})}>
                    <View style={{width : '50%'}}>
                        <Text style={{fontSize : 14, color : '#555555', fontFamily : 'NanumSquareOTF' }}>비밀번호 변경</Text>
                    </View>
                    <View style={{width : '50%', }}>
                        <View style={{alignSelf: 'flex-end'}}>
                        <Image source = {{uri : 'icon_rsquare_bracket'}} style = {{width : 9, height : 15}}/>
                        </View>
                    </View>
                </TouchableOpacity>
                */}
                
                <TouchableOpacity 
                    style={{height : Utill.screen.Screen.customHeight(43), flexDirection : 'row'}}
                    onPress = {()=> setIsAlertVisible(true)}
                >
                    <View style={{width : '50%'}}>
                        <Text style={{fontSize : 14, color : '#555555', fontFamily : 'NanumSquareOTF' }}>디쉬나우 탈퇴</Text>
                    </View>
                    <View style={{width : '50%', }}>
                            <View style={{alignSelf: 'flex-end'}}>
                                <Image source = {{uri : 'icon_rsquare_bracket'}} style = {{width : 9, height : 15}}/>
                            </View>    
                    </View> 
                </TouchableOpacity>
            </View>
        </View>
    );
}

const mapStateToProps = (state) => {
    console.log(state);
    console.log(state.User._root.entries[6][1]);
    return {
        userid : state.User._root.entries[0][1],
        nickname : state.User._root.entries[2][1],
        image : state.User._root.entries[5][1],
        phone : state.User._root.entries[3][1],
        name : state.User._root.entries[6][1],
        point : state.User._root.entries[1][1],
    }
}

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : Utill.color.white,
    },
    garo : {
        width : '100%',
        height : Utill.screen.Screen.customHeight(43),
        flexDirection : 'row',
        alignItems : 'center',
    },
    geajung : {
        height : Utill.screen.Screen.customHeight(42),
        justifyContent : 'center',
        fontSize : 12,
        color : '#555555',
        fontFamily : 'NanumSquareOTF'
    },
    line : {
        marginBottom : Utill.screen.Screen.customHeight(5),
        marginTop : Utill.screen.Screen.customHeight(8),
        borderBottomWidth: 1,
        borderBottomColor:Utill.color.border,
    },
    txtStyle : {
        marginBottom : Utill.screen.Screen.customHeight(9),
        fontSize : 18,
        fontWeight : 'bold',
        color : Utill.color.red,
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