import React, {useState,useEffect} from 'react';
import { View, StyleSheet, AppRegistry, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import GoogleMap from '../utill/googlemap.js';
import { useDispatch } from 'react-redux';
import * as API from '../utill/API';
import user, * as User from '../store/modules/user'
import ModalDropdown from 'react-native-modal-dropdown';
import { BigButtonColor, Text } from '../component/common'
import OneSignal from 'react-native-onesignal';

const TabHome = (props)=>{
    const dispatch = useDispatch();
    const _me = async() => {
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const meRes = await API.me(token);
        const userid = meRes.userId;
        const point = meRes.point;
        const name = meRes.name;
        const phone = meRes.phone;
        const image = meRes.image;
        const reviewcount = meRes.reviewcount;
        dispatch(User.updateuserid(userid));
        dispatch(User.updatepoint(point));
        dispatch(User.upadtename(name));
        dispatch(User.updatephone(phone));
        dispatch(User.updateimage(image));
        dispatch(User.updatereviewcount(reviewcount));
        const pushToken = await API.getPush(API.PUSH_TOKEN);
        console.log(pushToken);
        const ret = await API.setPushToken(token,{pushToken});
        console.log(ret);
    }

    const [people, setPeople] = useState('');
    const [time, setTime] = useState('');
    const [tema, setTema] = useState('');

    const {navigation} = props;

    useEffect(()=>{
        OneSignal.addEventListener('ids',onIds);
        _me();
        return () => {
            OneSignal.removeEventListener('ids',onIds);
        }
    },[]);

    const onIds = ((device) => {
        let token = device.userId;
        API.setPush(API.PUSH_TOKEN,token);
      })

    const [temaList, settemaList] = useState([  // 테마배열
        {   color : '#979797', isselect : false, id : '전체',},
        {   color : '#979797', isselect : false, id : '단체',},
        {   color : '#979797', isselect : false, id : '룸',},
        {   color : '#979797', isselect : false, id : '저렴한',},
        {   color : '#979797', isselect : false, id : '감성적인',},
        {   color : '#979797', isselect : false, id : '이자카야',},
    ]);

    const _toggle = async(i,newTemaList) =>{ // 색깔바뀌는 함수 밖으로 빼냄
        await _selectTema(i);                // ***tema 동기화 잘안됨!
        for(let k=0; k<6; k++){
            if(i!==k){
                newTemaList[k].color = '#979797';
                newTemaList[k].isselect = false;
            }
        }
        newTemaList[i].color = '#ff002b';
        newTemaList[i].isselect = true;
    }

    const _changeTemaColor = async(i) => {  // 테마선택 색깔,선택 바뀌게하는 함수
        let newTemaList = [...temaList];
        if(newTemaList[i].color === '#979797'){
          await _toggle(i,newTemaList);
        }else{
            newTemaList[i].color = '#979797';
            newTemaList[i].isselect = false;
        }
        settemaList(newTemaList);
    }

    const _selectTema = (i) =>{
        setTema(i);
    }

    const _selectTime = (rowData) =>{
        setTime(rowData);
    }

    return(
        <View style = {styles.container}>
            <GoogleMap
               isPressed = { false }
               navigation = { navigation }   
               latitudeDelta = {0.0125}
               style = {styles.map}
               toggle  = {()=>{navigation.navigate('Departure')}}
            ></GoogleMap>
            <View style = {styles.input}>
                <View style={styles.tema}>
                    <Text style = {styles.tst}> 테마 </Text> 
                </View>
                <ScrollView
                    style = {styles.scroll}
                    horizontal = {true}
                    showsVerticalScrollIndicator = {true}
                    >
                        <View style = {styles.item}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(0)}>
                            <View style = {styles.item}><Text  style = {{color : temaList[0].color }}> 전체 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {styles.item}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(1)}>
                            <View style = {styles.item}><Text  style = {{color : temaList[1].color }}> 단체 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {styles.item}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(2)}>
                            <View style = {styles.item}><Text  style = {{color : temaList[2].color }}> 룸 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {styles.item}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(3)}>
                            <View style = {styles.item}><Text  style = {{color : temaList[3].color }}> 저렴한 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {styles.item}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(4)}>
                            <View style = {styles.item}><Text  style = {{color : temaList[4].color }}> 감성적인 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {styles.item}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(5)}>
                            <View style = {styles.item}><Text  style = {{color : temaList[5].color }}> 이자카야 </Text></View>
                        </TouchableOpacity>
                        </View>
                </ScrollView>
                <View style={styles.parent} horizontal = {true}>
                    <View style={styles.child}>
                        <View style={styles.childchild1}><Text style = {styles.tst}>인원</Text></View>
                        <View style = {styles.childchild2}>
                            <TextInput 
                            selectionColor = '#733FFF'
                            placeholder ={'00'}
                            onChangeText={(text) => setPeople({text})}
                            value={people} />
                            <Text> 명 </Text>
                        </View>
                    </View>
                    <View style={styles.child}>
                        <View style={styles.childchild1}><Text style = {styles.tst}>출발 예정 시간</Text></View>
                        <View style = {styles.childchild2}>
                            <ModalDropdown 
                            style = {{width : 30, height : 10}} 
                            options = {['3', '5', '8', '10', '15', '20']}
                            onSelect = {(idx) => _selectTime(idx)}
                            />
                            <Text> 분 </Text>
                        </View>
                    </View>
                </View>
                <BigButtonColor 
                    style={styles.find}
                    onPress ={()=> navigation.push('onWait',{
                        userid,
                        point,
                        people,
                        phone,
                    })}
                    title = {'술집 찾기'}
                />
                    


            </View>
        </View>
    )
}


export default TabHome;

const styles = StyleSheet.create({
    container : {                       // 화면전체
        flex : 1
    },
    map : {                             // 지도부분을 의미
        width : "100%",
        height : "40%"
    },
    input : {                           // 지도랑 맨아래 탭부분을 뺀 중앙을 의미
        width : "100%",
        height : "60%",
        alignItems : 'center',
        justifyContent : 'space-around',
        backgroundColor : '#FFF'
    },
    tema : {                            // 맨위 테마 제목 부분
        backgroundColor : '#4682B4',
        width : "100%",
        height : "16%",
    },
    tst : {
        fontSize : 14,
        textAlign : 'center',
    },
    scroll : {                          // 테마 고르는 스크롤
        width : "100%",
        height : "14%",
    },
    item : {                            // 테마 스크롤의 각각 아이템
        alignItems : 'center',
        width : 90,
        height : "100%",
        backgroundColor : '#000',   
    },  
    parent : {                          // 연두색 배경
        backgroundColor : '#7CFC00',
        width : "100%",
        height : "56%",
        flexDirection : 'row',
    },
    child : {                           // 연두색 배경 왼쪽, 오른쪽 반반씩을 의미
        width : "50%",
        alignItems : 'center',
    },
    childchild1 : {
        backgroundColor : '#ADD8E6',    // 인원, 출발 예정 시간 (제목임)
        height : "40%",
    },
    childchild2 : {
        backgroundColor : '#D2B48C',    // 00 명, ... 분
        height : "60%",
        width : "50%",
        flexDirection : 'row',
    },
    find : {                             // 식당찾기
        backgroundColor : '#AFEEEE',
        width : "100%",
        height : "14%",
    },
    textinput : {                         // 00 부분

    },
})