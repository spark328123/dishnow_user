import React , { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    AppState,
    Image,
    BackHandler,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { Text,CustomAlert } from '../../component/common';
// import {handleAndroidBackButton,removeAndroidBackButtonHandler} from '../../component/common/hardwareBackButton'
import * as Utill from '../../utill';
import * as API from '../../utill/API';
import OneSiganl from 'react-native-onesignal';
import Toast from 'react-native-simple-toast';

const List = (props) => {
    const { navigation, mylat, mylon } = props;
    const WaitTime = 60*5+navigation.getParam('timerCount');

    const [timer, setTimer] = useState(null);
    const [timerCount, setTimerCount] = useState(WaitTime);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);

    const myCoords = {
        latitude : mylat,
        longitude : mylon
    }

   

    const _getServer = async() => {
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.getReservation_accept(token);
        setListData(res.map(item=>{
            var {mainImage,name,reservationId,storeId,latitude,longitude,type,mainMenu,keyword}=item;
            if(keyword.length>10)keyword = `${keyword.substring(0,11)}...`
            const JSONmainMenu = JSON.parse(mainMenu);
            return{
                mainImage : _substr(JSON.stringify(JSONmainMenu[0].image)),
                name,
                distance : _computeDistance(myCoords, {latitude,longitude}),
                reservationId,
                storeId,
                latitude, 
                longitude,
                theme : keyword,
            }
        }));
    }

    const _getServer_back = async() => {
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.getReservation_accept_back(token);
        
        
        
        setListData(res.map(item=>{
            var {mainImage,name,reservationId,storeId,latitude,longitude,type,mainMenu,keyword}=item;
            console.log(keyword);
            if(keyword.length>10)keyword = `${keyword.substring(0,11)}...`
            const JSONmainMenu = JSON.parse(mainMenu);
            return{
                mainImage : _substr(JSON.stringify(JSONmainMenu[0].image)),
                name,
                distance : _computeDistance(myCoords, {latitude,longitude}),
                reservationId,
                storeId,
                latitude, 
                longitude,
                theme : keyword,
            }
        }));
    }

    const _onPressAlertOk = async() => {
        setIsAlertVisible(false);
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        await API.reservation_cancel(token);
        _timerStop();
       _goHome();
    }

    const _onPressAlertCancel = () => {
        setIsAlertVisible(false);
    }

    const _substr = (imageSource)=>{
        return Object({ uri :imageSource.substring(2,imageSource.length-2) });
    }

    const degreesToRadians = (degrees)=> {
        radians = (degrees * Math.PI)/180;
        return radians;
    }

    const _computeDistance = (startCoords, destCoords) => {
        var startLatRads = degreesToRadians(startCoords.latitude);
        var startLongRads = degreesToRadians(startCoords.longitude);
        var destLatRads = degreesToRadians(destCoords.latitude);
        var destLongRads = degreesToRadians(destCoords.longitude);

        var Radius = 6371; 
        var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
                        Math.cos(startLatRads) * Math.cos(destLatRads) *
                        Math.cos(startLongRads - destLongRads)) * Radius;

        return Math.floor(distance*1000);
    }
    
    const _goHome = () =>{
        navigation.navigate('Splash');
    }
    const data = navigation.getParam('data');
    const [ isLoaded, setIsLoaded ] = useState(true);
    const [ listData, setListData ] = useState([]);

    const _handleChange = async(nextAppState)=>{
        if(appState === 'active' && nextAppState === 'active') {
            _getServer_back();
        }
        setAppState(nextAppState);
    }

    useEffect(()=>{
        _timerStart();
        _getServer();
        OneSiganl.addEventListener('received',_getServer);
        OneSiganl.addEventListener('opened',_getServer);
        AppState.addEventListener('change',_handleChange);
        return()=>{
            AppState.removeEventListener('change',_handleChange);
        }
    },[]);

    useEffect(()=>{
        if (timer && (timerCount <= 0)) {
            _timerStop();
            Toast.show('선택 시간이 지났습니다. 홈 화면으로 이동합니다');
            navigation.navigate('Splash');
        }
    },[timerCount]);

    const _timerStart = ()=> {
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

    const _showStoreDetail = async({reservationId,storeId,theme,distance})=>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const resDetail = await API.showStoreDetail(token,{storeId : storeId});
        const resReview = await API.showStoreReview(token,{storeId : storeId, page : 0});
        console.log(resReview);
        var mainImage = resDetail.mainImage;
        var subImage = resDetail.subImage;
        const photos = [];
        photos.push(mainImage.substring(2,mainImage.length-2));
        subImage = subImage.substring(2,subImage.length-2);
        subImage = subImage.split(',');
            if(subImage[0]!='[]'){
            console.log(subImage);
            if(subImage.length==1){
                console.log('asd');
                photos.push(subImage[0]);
            }else{
                const len = subImage.length;
                for(var i = 0;i<len;i++){
                    if(i==0)photos.push(subImage[i].substring(0,subImage[i].length-1));
                    else if(i==len-1)photos.push(subImage[i].substring(1,subImage[i].length));
                    else photos.push(subImage[i].substring(1,subImage[i].length-1));
                }
            }
        }
        navigation.push('ListMenu',{
            resDetail,
            resReview,
            storeId,
            reservationId,
            photos,
            isReservation : true,
            theme,
            distance,
            peopleNumber : navigation.getParam('resnumber'),
            minutes : navigation.getParam('restime'),
        })
        console.log(resDetail,resReview);
    }

    const _renderItem = ({item}) => {
        return (
            <View style={{marginBottom: Utill.screen.Screen.customHeight(73), marginLeft:Utill.screen.Screen.customWidth(5) , marginRight: Utill.screen.Screen.customWidth(5)}}>
                <TouchableOpacity
                    style = {
                        {
                            width : Utill.screen.Screen.customWidth(160),
                            height : Utill.screen.Screen.customHeight(180),
                        }
                    }
                    onPress = {()=>_showStoreDetail(item)}
                >
                {isLoaded && <ActivityIndicator style = { styles.indicator } />} 
                <FastImage
                    source = {item.mainImage}
                    style = {{width : Utill.screen.Screen.customWidth(160), height : Utill.screen.Screen.customHeight(180), marginBottom : 12}}
                    onLoadEnd = {()=>setIsLoaded(false)}
                    >
                </FastImage>
                <Text style = {{fontSize : 16, color : Utill.color.black, marginBottom : 3}}>{item.name}</Text>
                <View
                    style = {{flexDirection : 'row', justifyContent : 'space-between'}}>
                    <Text style = {{fontSize : 12, color : Utill.color.itemTitle}}>
                        {item.theme}
                    </Text>
                    <Text style = {{fontSize : 12, color : Utill.color.primary1}}>
                        {`${item.distance}m`}
                    </Text>
                </View>
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <View style = {styles.container}>
            <CustomAlert 
                visible={isAlertVisible} 
                mainTitle={'취소'}
                mainTextStyle = {styles.txtStyle}
                subTitle = {'이미 요청을 수락한 가게가 있습니다.\n정말 취소할까요?'}
                subTextStyle = {styles.subtxtStyle}
                buttonText1={'아니오'} 
                buttonText2={'네'}
                onPressCancel = {_onPressAlertCancel}
                onPress={_onPressAlertOk} 
        />
        
            <View style = {styles.header}>
                <Text style={{fontSize:14, color:"#733FFF" }}>{timerCount%60 < 10 ? `${Math.floor(timerCount/60)} : 0${timerCount%60}` : `${Math.floor(timerCount/60)} : ${timerCount%60}`}</Text>
                <Text style = {{fontSize : 18, fontWeight:'bold', marginLeft:Utill.screen.Screen.customWidth(20)}}>
                    예약 가능 식당
                </Text>
                <TouchableOpacity
                    onPress = {()=>setIsAlertVisible(true)}>
                    <Text style = {{color : Utill.color.red, fontSize : 14, alignSelf:'flex-end'}}>취소하기</Text>
                </TouchableOpacity>
            </View>
            <View style={{width:Utill.screen.Screen.customWidth(340),height:Utill.screen.Screen.customHeight(526), alignItems:"flex-start",}}>
                <FlatList 
                    data = {listData}
                    renderItem = {_renderItem}
                    numColumns = {2}
                    />
            </View>
                <TouchableOpacity style = {styles.button} 
                    onPress = {()=>navigation.push('ListMap',{data:listData})}>              
                    <Image source = {{uri : 'icon_on_map_white'}} style = {{width: 20,height:16, paddingRight :7}} />
                    <Text style = {{fontSize : 16, color : '#FFFFFF'}}> 지도에서 보기</Text>
                </TouchableOpacity>
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        mylat : state.Maps._root.entries[0][1].latitude,
        mylon : state.Maps._root.entries[0][1].longitude,
    }
}

export default connect(mapStateToProps)(List);


const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems: "center"
    },
    header : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems: "center",
        height : Utill.screen.Screen.customHeight(50),
        marginTop: Utill.screen.topSafe,
        width: Utill.screen.Screen.customWidth(340),
        alignSelf: 'center'
    },
    button : {
        position: "absolute",
        flexDirection : 'row',
        bottom : 0,
        height : Utill.screen.Screen.customHeight(50),
        width: Utill.screen.Screen.customWidth(360),
        backgroundColor : Utill.color.primary1,
        alignItems : 'center',
        justifyContent : 'center',
        alignSelf: 'flex-end',
    },
    indicator: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        justifyContent: "center",
        alignItems: "center",
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