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
} from 'react-native';
import LogOut from './logout'
import {Button, BigButtonColor} from '../../component/common'
import * as Color from '../../utill/color'
import * as API from '../../utill/API' 
import  * as User from '../../store/modules/user'
import { connect, useDispatch } from 'react-redux';

const TabMy = ({navigation, userid, nickname, image, phone, point, name}) => { 
    
    const [id, idChange] = useState(userid);
    const [nick, nickChange] = useState(nickname);
    const [img, imgChange] = useState(image);
    const [phonenum, phoChange] = useState(phone);
    const [pt, ptChange] = useState(point);
    const [nm, nmChange] = useState(name);

    const _me = () => {
        if(nick===null){
            nickChange(name);
            //dispatch(User.updatenickname(name));
        }
    }
    useEffect(()=>{
        _me();
    },[])

    const _logOut = async () => {
        
        await API.setLocal(API.LOCALKEY_TOKEN, 'null');
        navigation.navigate('Splash')
    }

    const dispatch = useDispatch();

    return (
        <View
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            
            <TouchableOpacity
                onPress = {()=>navigation.push('Profile',
                {
                    name : nm,
                    userid : id,
                    nickname : nick,
                    image : img,
                    phone : phonenum,
                })}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    {nick}
                </Text >
            </TouchableOpacity>

            <View style = { styles.txt }>
                <TouchableOpacity
                    onPress = {()=>navigation.navigate('Point')}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                        디나포인트
                    </Text >
                </TouchableOpacity>

                <TouchableOpacity
                    onPress = {()=>navigation.navigate('Review')}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                        나의 리뷰
                    </Text >
                </TouchableOpacity>
            </View>

           <TouchableOpacity
                onPress = {()=>navigation.navigate('Notice')}
           >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    공지사항
                </Text >
            </TouchableOpacity>

            <TouchableOpacity
                onPress = {()=>navigation.navigate('webView')}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    이용약관
                </Text >
            </TouchableOpacity>

            <TouchableOpacity
                onPress = {()=>navigation.navigate('Client')}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    고객센터
                </Text >
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    푸쉬알림
                </Text >
            </TouchableOpacity>


            <TouchableOpacity
                onPress = {()=>
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
             >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    로그아웃
                </Text >
              
            </TouchableOpacity>
            
        </View> 
    )
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

export default connect(mapStateToProps)(TabMy);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "#FFFFFF",
    },
    textTitle: {
        fontSize: 14,
        marginBottom: 20,
    },
    textInput: {
        fontSize: 16,
        marginBottom: 29,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    txt : {
        flexDirection : 'row',
        height : 50,
        width : 200,
    },

})