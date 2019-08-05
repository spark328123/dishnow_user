import React, { useState, useEffect } from 'react';
import { 
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import { Text } from '../component/common';
import * as Utill from '../utill';
import OneSignal from 'react-native-onesignal';
import * as API from '../utill/API';

const OnWait =  (props) =>{
    const { navigation, latitude, longitude } = props;

    const [timer, setTimer] = useState(null);
    const [timerCount, setTimerCount] = useState(120);
    const [toggle, setToggle] = useState(true);

    useEffect(()=>{
        _timerStart();
        OneSignal.addEventListener('received',_oneSignalReceived);
    },[]);

    const _toggle = ()=>{
        setToggle(!toggle);
    }

    const _reFind = ()=>{
        _toggle();
        setTimerCount(120);
        _timerStart();
        OneSignal.addEventListener('received',_oneSignalReceived);
        _reservation();
    }

    const _reservation = async ()=>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const data = {
            storeTypeId : 1,
            peopleNumber : parseInt(navigation.getParam('people')),
            minutes : parseInt(navigation.getParam('time')),
            latitude,
            longitude, 
        };
        const res = await API.reservation(token,data);
        console.log(res); 
    }

    useEffect(()=>{
        if (timer && (timerCount <= 0)) {
            _timerStop();
            _toggle();
            OneSignal.removeEventListener('received');
        }
    },[timerCount]);

    const _timerStart =()=> {
        setTimer(timer=>{
            if (timer==null) return setInterval(()=>_timerTick(), 1000);
        });
    }

    const _timerTick =()=> {
        setTimerCount(count=>count-1);
    }

    const _timerStop =()=> {
        setTimer(timer=> {
            if (timer!=null) {
                clearInterval(timer);
                return null;
            }
            return timer; 
        })
    }

    const _goBack = () =>{
        OneSignal.removeEventListener('received');
        navigation.navigate('TabHome');
    }

    const _oneSignalReceived = (notification) => {
        console.log(notification);
        const {latitude=null,longitude=null,mainImage=null,name=null,reservationId=null,storeId=null} = notification.payload.additionalData;
        navigation.navigate('List',{
            latitude,
            longitude,
            mainImage,
            name,
            reservationId,
            storeId,
            theme : navigation.getParam('tema'),
        });
    };

    return(
        <View style = {styles.container}>
                <View style = {styles.header}>
                    <TouchableOpacity
                        onPress = {_goBack}>
                            {toggle?
                        (<Text style= {{color : Utill.color.red, fontSize : 14}}>취소하기</Text>):
                        (<Text style = {{color : Utill.color.textBlack, fontSize : 14}}>홈으로</Text>)
                            }
                    </TouchableOpacity>
                 </View>
             {toggle ? (            
                <View style = {styles.loading}>
                    <ActivityIndicator size = "large" color = {Utill.color.primary1}/>
                    <Text style = {{fontSize : 18, marginBottom : 13, marginTop : 23}}>출발지 기준 200m 내 술집에 요청중</Text>
                    <Text style = {{fontSize : 18,color : Utill.color.primary1}}>{`${Math.floor(timerCount/60)}:${timerCount%60}`}</Text>
                </View>
                ):(
                <View style = {styles.loading}>
                    <Text style = {{fontSize : 18, marginBottom : 8}}>죄송합니다.</Text>
                    <Text style = {{fontSize : 18}}>요청을 수락한 식당이 없습니다.</Text>
                </View>    
            )}
            <View style = {styles.data}>
                <Text>
                    {`| ${navigation.getParam('tema')} |`}
                </Text>
                <Text>
                    {navigation.getParam('people')}
                </Text>
                <Text>
                    {navigation.getParam('time')}
                </Text>
                <Text>
                    {navigation.getParam('address')}
                </Text>
            </View>
            {!toggle ? (
                <TouchableOpacity
                    onPress = {_reFind}
                    style = {styles.button}>
                    <Text style = {{color : '#FFF', fontSize : 16}}>다시 찾기</Text>
                </TouchableOpacity>
            ):(
                <View style = {[styles.button,{backgroundColor : '#FFF'}]}/>
            )}
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        latitude : state.Maps._root.entries[0][1].latitude,
        longitude : state.Maps._root.entries[0][1].longitude,
        address : state.Maps._root.entries[1][1],
    }
}

export default connect(mapStateToProps)(OnWait);

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    header : {
        height : 50,
        justifyContent : 'center',
        alignItems : 'flex-end',
        paddingRight : 16,
    },
    loading : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    data : {
        flex : 1,
        paddingLeft : 24,
        justifyContent : 'flex-end',
        alignItems : 'flex-start',
    },
    button : {
        justifyContent : 'center',
        alignItems : 'center',
        height : 50, 
        backgroundColor : Utill.color.primary1,
        marginTop : 20,
    }
});