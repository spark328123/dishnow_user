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
import * as API from '../../utill/API' 
import  * as User from '../../store/modules/user'
import { connect, useDispatch } from 'react-redux';

const TabMy = ({navigation, userid, nickname, image, phone, point, name, reviewcount}) => { 
    
    const [id, idChange] = useState(userid);
    const [nick, nickChange] = useState(nickname);
    const [photo, setPhoto] = useState(image);
    const [phonenum, phoChange] = useState(phone);
    const [pt, ptChange] = useState(point);
    const [nm, nmChange] = useState(name);
    const [rvcount, rvcountChange] = useState(reviewcount);

    const _me = () => {
        let imageString = JSON.stringify(image);
        imageString = imageString.substring(4,imageString.length-4);
        setPhoto({uri :imageString});
        if(nick===null){
            nickChange(name);
            dispatch(User.updatenickname(name));
        }
        
        if(rvcount===undefined){
            rvcountChange('0');
            dispatch(User.updatereviewcount('0'));
            console.log(rvcount);
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
            <View style={styles.top}>
            <TouchableOpacity 
                style = {{flexDirection : 'row'}}
                onPress = {()=>navigation.push('Profile',
                {
                    name : nm,
                    userid : id,
                    nickname : nick,
                    image : photo,
                    phone : phonenum,
                })}
            >
                {photo && (<Image source={{uri : photo.uri}} style={{ width: 50, height: 50,}}/>)}
                {!photo && (<View style={{ width: 60, height: 60, backgroundColor : '#4682B4', }}/>)}
                <Text style={{alignItems : 'center', marginTop : 10, marginLeft : 5, fontSize : 16, fontWeight: 'bold',}}>
                    {nick}
                </Text>
            </TouchableOpacity>
            </View>
            <View style = { styles.parent }>
                <View style={styles.child}>
                    <TouchableOpacity
                        onPress = {()=>navigation.navigate('Point')}
                    >
                        <View>
                            <Text style={{fontSize : 16, }}>
                                디나포인트
                            </Text>
                        </View>
                        <Text style={{fontSize : 24, justifyContent : 'center', alignItems : 'center'}}>
                            {pt}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.child}>
                    <TouchableOpacity
                        onPress = {()=>navigation.navigate('Review')}
                    >
                        <View>
                            <Text style={{fontSize : 16, }}>
                                나의 리뷰
                            </Text>
                        </View>
                        <Text style={{fontSize : 24, justifyContent : 'center', alignItems : 'center'}}>
                            {rvcount}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.percent9}>
            <TouchableOpacity
                onPress = {()=>navigation.navigate('Notice')}
           >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    공지사항
                </Text>
            </TouchableOpacity>
            </View>
            <View style={styles.percent9}>
            <TouchableOpacity
                onPress = {()=>navigation.navigate('webView')}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    이용약관
                </Text >
            </TouchableOpacity>
            </View>
            <View style={styles.percent9}>
            <TouchableOpacity
                onPress = {()=>navigation.navigate('Client')}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    고객센터
                </Text>
            </TouchableOpacity>
            </View>
            <View style={styles.percent9}>
            <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    푸쉬알림
                </Text>
            </TouchableOpacity>
            </View>
            <View>
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
                </Text>
            </TouchableOpacity>
            </View>
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
        alignItems : 'center',
        flexDirection : 'row',
        width : '92%',
        height : '15%',
        backgroundColor : '#7CFC00',
    },
    percent9 : {                    // 공지사항, 이용약관, 고객센터, 푸쉬알람, 로그아웃
        flexDirection : 'row',
        height : '9%',
    },
    parent : {                         // 디나포인트 + 나의리뷰 두개합친 뷰
        flexDirection : 'row',
        height : '17%',
    },
    child : {                          // 디나포인트, 나의리뷰 각각의 뷰 두개
        width : '50%',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#4682B4',
    }, 
})