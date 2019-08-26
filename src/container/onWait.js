import React, { useState, useEffect } from 'react';
import { 
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    AppState,
} from 'react-native';
import { connect } from 'react-redux';
import { Text,CustomAlert } from '../component/common';
import * as Utill from '../utill';
import OneSignal from 'react-native-onesignal';
import * as API from '../utill/API';
import Toast from 'react-native-simple-toast';

const OnWait =  (props) =>{
    const WaitTime = 119;
    const { navigation, latitude, longitude } = props;
    const createdAt = navigation.getParam('createdAt');
    var address = navigation.getParam('address');
    address = address.substring(0,15)+'\n'+' '+address.substring(15);

    const [timer, setTimer] = useState(null);
    const [timerCount, setTimerCount] = useState(WaitTime);
    const [toggle, setToggle] = useState(true);
    const [appState, setAppState] = useState(AppState.currentState);

    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const _onPressAlertCancel = () => {
        setIsAlertVisible(false);
    }
    const _onPressAlertOk = async() => {
        setIsAlertVisible(false);
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.reservation_cancel(token);
        Toast.show('예약을 취소했습니다');
       _goBack();
    }

    useEffect(()=>{
        _timerStart();
        OneSignal.addEventListener('received',_oneSignalReceived);
        OneSignal.addEventListener('opened',_oneSignalReceived)
        AppState.addEventListener('change',_handleChange);
        return()=>{
            AppState.removeEventListener('change',_handleChange);
        }
    },[]);
  

    const _handleChange = async(nextAppState)=>{
        if(appState === 'active' && nextAppState === 'active') {
            const token = await API.getLocal(API.LOCALKEY_TOKEN);
            const res = await API.getReservation_accept(token);
            console.log(res);
            if(res.length)
                await navigation.navigate('List',{timerCount,data:res});
        }
        setAppState(nextAppState);
    }
    
    const _toggle = ()=>{
        setToggle(!toggle);
    }

    const _reFind = ()=>{
        _toggle();
        setTimerCount(WaitTime);
        _timerStart();
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
        await API.reservation(token,data);
    }

    useEffect(()=>{
        if (timer && (timerCount <= 0)) {
            _timerStop();
            _toggle();
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
        OneSignal.removeEventListener('received',_oneSignalReceived);
        OneSignal.removeEventListener('opened',_oneSignalReceived);
        navigation.navigate('TabHome');
    }

    const _oneSignalReceived = async(notification) => {
        if (!notification) return;
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.getReservation_accept(token);
        await navigation.navigate('List',{timerCount,data:res});
    };

    return(
        <View style = {styles.container}>
            <CustomAlert 
                visible={isAlertVisible} 
                mainTitle={'취소'}
                mainTextStyle = {styles.txtStyle}
                subTitle = {'요청을 취소할까요?'}
                subTextStyle = {styles.subtxtStyle}
                buttonText1={'아니오'} 
                buttonText2={'네'} 
                onPress={_onPressAlertOk} 
                onPressCancel={_onPressAlertCancel}
            />
                <View style = {styles.header}>
                    <TouchableOpacity
                        onPress = {()=>setIsAlertVisible(true)}>
                            {toggle?
                                (<Text style= {[styles.headerText,{color : Utill.color.red, marginTop : 15, marginRight : 15}]}>취소하기</Text>):
                                (<Text style = {[styles.headerText,{color : Utill.color.textBlack, marginTop : 15, marginRight : 15}]}>홈으로</Text>)
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
                <View style={styles.informationContainer}>
                    <Text style={styles.theme}>
                        {`| ${navigation.getParam('tema')} |`}
                    </Text>
                    <View style={styles.dataContainer}>
                        <Text style={styles.dataText}>
                            인원
                        </Text>
                        <Text style={styles.paraText}>
                            {navigation.getParam('people')}
                        </Text>
                        <Text style={styles.paraText}>
                             명
                        </Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={styles.dataText}>
                            출발 예정 시간
                        </Text>
                        <Text style={styles.paraText}>
                            {navigation.getParam('time')}
                        </Text>
                        <Text style={styles.paraText}>
                             분 후
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: "flex-end"}}>
                        <Text style={styles.dataText}>
                            출발지
                        </Text>
                        <Text style={styles.paraText}>
                            {address}
                        </Text>
                    </View>
                </View>
            </View>
            {!toggle ? (
                <TouchableOpacity
                    onPress = {_reFind}
                    style = {styles.button}>
                    <Text style = {{color : '#FFF', fontSize : 16}}>다시 찾기</Text>
                </TouchableOpacity>
            ):(
                <View style = {[styles.button,{backgroundColor : '#FFFFFF'}]}/>
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
        justifyContent : 'center',
        alignItems : 'flex-end',
        marginBottom: 10,
        marginTop: Utill.screen.topSafe,
    },
    headerText:{
        fontSize : 14,
        marginTop: Utill.screen.topSafe
    },
    loading : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    data : {
        marginLeft: Utill.screen.Screen.customWidth(15),
        width: Utill.screen.Screen.customWidth(330),
        height: 171,
        borderColor: "#EEEEEE",
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: "#FFFFFF"
    },
    informationContainer:{
        marginLeft: Utill.screen.Screen.customWidth(24),
        marginTop: 19
    },
    theme: {
        fontSize: 14,
        marginBottom: 13
    },
    dataContainer: {
        flexDirection: 'row',
        alignItems: "flex-end",
        marginBottom: 13
    },
    dataText:{
        fontSize: 14,
        marginRight: Utill.screen.Screen.customWidth(16)
    },
    paraText:{
        fontSize: 16
    },
    button : {
        justifyContent : 'center',
        alignItems : 'center',
        height : Utill.screen.Screen.customHeight(50), 
        backgroundColor : Utill.color.primary1,
        marginTop : Utill.screen.Screen.customHeight(20),
    },
    txtStyle : {
        marginBottom : 9,
        fontSize : 18,
        fontWeight : 'bold',
        color : Utill.color.red,
        textAlign : 'center',
    },
    subtxtStyle : {
        marginBottom : 35,
        fontSize : 16,
        color : Utill.color.textBlack,
        textAlign : 'center',
    },
});