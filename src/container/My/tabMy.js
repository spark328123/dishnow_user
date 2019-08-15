import React, { useState,useEffect } from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    Switch,
    ActivityIndicator,
} from 'react-native';
import LogOut from './logout'
import {Button, BigButtonColor,MenuButton,TopMenuButton,PushButton} from '../../component/common'
import * as Color from '../../utill/color'
import * as API from '../../utill/API' 
import * as Utill from '../../utill'
import  * as User from '../../store/modules/user'
import { connect, useDispatch } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import Toast from 'react-native-simple-toast';

const TabMy = ({navigation, userid, nickname, image, phone, point, name, reviewcount}) => { 
    const [Pressed,setPressed] = useState(false);
    const [isLoaded,setIsLoaded] = useState(true);
    const [isPhotoLoaded,setPhotoLoaded] = useState(true);
    const [photo, setPhoto] = useState(image.substring(2,image.length-2));
    useEffect(()=>{
        _me();
        _loadPhoto();
    },[])

    const _me = async() => {
        const res = await API.test();
        if(res.error){
            Toast.show('네트워크 상태를 확인해 주세요');
            return;
        }
        setIsLoaded(false);
    }
    const _loadPhoto = () => {
        {!photo && 
        setPhotoLoaded(false);}
    }

    _setPressed = (Pressed) => {
        if(Pressed) Pressed = false;
        else Pressed = true;
        setPressed(Pressed);
     }

    const _push = (press)=>{
        if(!press){
        OneSignal.inFocusDisplaying(0);
        Toast.show('푸시가 중단되었습니다.');

        }else{
            OneSignal.inFocusDisplaying(2);
            Toast.show('푸시가 활성화되었습니다.')
        }
    } 

    const [id, idChange] = useState(userid);
    const [nick, nickChange] = useState(nickname);
    const [phonenum, phoChange] = useState(phone);
    const [pt, ptChange] = useState(point);
    const [nm, nmChange] = useState(name);
    const [rvcount, rvcountChange] = useState(reviewcount);
   
    console.log('im :' + image);
    console.log('ph : ' + photo);

    const _logOut = async () => {
        await API.setLocal(API.LOCALKEY_TOKEN, 'null');
        navigation.navigate('Splash')
    }

    const dispatch = useDispatch();

    return (
        <View style = {{flex : 1}}> 
        {!isLoaded? (
        <View
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
               
            <TouchableOpacity 
                    style = {styles.top}
                    onPress = {()=>navigation.navigate('Profile',
                    {
                        name : nm,
                        userid : id,
                        nickname : nick,
                        image : photo,
                        phone : phonenum,
                    })}
            >
                <View style = {{flexDirection : 'row', alignContent : 'center'}}>
                    {photo &&  (
                        <Image
                            source={{uri : photo}}
                            style={{ width: 45, height: 45, borderRadius : 45/2}}
                        />
                    )}
                    {!photo && ( 
                        <Image
                            source={{uri : 'icon_profile'}}
                            style={{ width: 45, height: 45 }}
                        />
                    )}

                    <Text style={{alignItems : 'center', marginTop : 10, marginLeft : 5, fontSize : 16, fontWeight: 'bold', color : "#111111", fontFamily : "NanumSquareOTF"}}>
                        {nick}
                    </Text>    
                </View>
                <Image source = {{uri : 'icon_rsquare_bracket'}} style = {{width : 9, height : 15, alignSelf : 'center'}}/>
            </TouchableOpacity>

            <View style={styles.line}/>
            
            <View style = { styles.parent }>
                <View style={styles.child}>
                    <TouchableOpacity
                        onPress = {()=>navigation.navigate('myPoint',{pt})}
                    >
                    <TopMenuButton 
                        title={`디나포인트`} 
                        source={{uri:'icon_logo_purple_main'}} 
                        onPress = {()=>navigation.navigate('myPoint', {pt})}
                    />
                        <View style={{ justifyContent : 'center', alignItems : 'center', }}>
                        <Text style={{fontSize : 24, color : "#111111" , fontFamily : "NanumSquareOTF"}}>
                            {pt}
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.child}>
                    <TouchableOpacity
                        onPress = {()=>navigation.navigate('Review', {rvcount,my:true})}
                    >
                    <TopMenuButton 
                        title={`나의 리뷰`} 
                        source={{uri:'icon_review'}} 
                        onPress = {()=>navigation.navigate('Review', {rvcount,my:true})}
                    />
                        <View style ={{ justifyContent : 'center', alignItems : 'center', }}>
                        <Text style={{fontSize : 24, color : "#111111" , fontFamily : "NanumSquareOTF"}}>
                            {rvcount}
                        </Text>
                        </View>

                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.line}/>

            <MenuButton 
                title={`공지사항`} 
                source={{uri:'icon_notice'}} 
                onPress={()=>navigation.navigate('Notice')} 
                style = {styles.menusN} 
            />
            <MenuButton 
                title={`이용약관`} 
                source={{uri:'icon_terms'}} 
                onPress = {()=>navigation.navigate('myTerms')}
                style = {styles.menus} 
            />
            
            <MenuButton 
                title={'고객센터'} 
                source={{uri:'icon_helpcenter'}} 
                onPress={()=>navigation.navigate('Client')}
                style = {styles.menus} 
            />

            <PushButton 
                title={'푸쉬알람'} 
                source={{uri:'icon_push'}} 
                style = {styles.menus}
                onValueChange = {()=>{_setPressed(Pressed);_push(Pressed)}}
                value = {!Pressed}
            />
                

            
            <MenuButton 
                title={'로그아웃'} 
                source={{uri:'icon_signout'}} 
                onPress={()=>
                    Alert.alert(
                        '로그아웃',
                        '로그아웃 하시겠습니까?',
                        [
                            {
                                text: '취소',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: '확인', 
                                onPress: _logOut
                            },
                        ],
                            {cancelable: false},
                        )
                } 
                style = {styles.menus}/>
            
        </View>
            ):<ActivityIndicator style={styles.indicator} size="large" color={"#733FFF"}/>} 
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        userid : state.User._root.entries[0][1],
        nickname : state.User._root.entries[2][1],
        image : state.User._root.entries[5][1],
        phone : state.User._root.entries[3][1],
        name : state.User._root.entries[6][1],
        point : state.User._root.entries[1][1],
        reviewcount : state.User._root.entries[4][1],
    }
}

export default connect(mapStateToProps)(TabMy);

const styles = StyleSheet.create({
    container: {                    // 화면전체
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    top : {                         // 맨위에 끄덕이는 미식가
        flexDirection : 'row',
        height : 95,
        alignItems : 'center',
        justifyContent : 'space-between',
    },
    menus : {                    // 공지사항, 이용약관, 고객센터, 푸쉬알람, 로그아웃
        height : 56,
        flexDirection : 'row',
    },
    menusN : {                    // 공지사항, 이용약관, 고객센터, 푸쉬알람, 로그아웃
        height : 56,
        flexDirection : 'row',
        marginTop : 9,
    },
    parent : {                         // 디나포인트 + 나의리뷰 두개합친 뷰
        flexDirection : 'row',
        height : 110,
    },
    child : {                          // 디나포인트, 나의리뷰 각각의 뷰 두개
        width : '50%',
        alignItems : 'center',
        justifyContent : 'center',
    }, 
    menu : {
        flexDirection : 'row',
    },
    line : {
        borderBottomWidth: 1,
        borderBottomColor:Utill.color.border,
    },
    indicator: {
        position: 'absolute',
        left: Utill.screen.screenWidth/2-15,
        top: Utill.screen.screenHeight/2-50        
    },
})