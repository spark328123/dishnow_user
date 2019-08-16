import React , { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { Text,CustomAlert } from '../../component/common';
import * as Utill from '../../utill';
import * as API from '../../utill/API';
import OneSiganl from 'react-native-onesignal';
import Toast from 'react-native-simple-toast';

const List = (props) => {

    const { navigation, mylat, mylon } = props;
    const WaitTime = 60*5+navigation.getParam('timerCount');

    const [timer, setTimer] = useState(null);
    const [timerCount, setTimerCount] = useState(WaitTime);
    const parentNavigation = navigation.dangerouslyGetParent();
    const mainImage = parentNavigation.getParam('mainImage');
    const name = parentNavigation.getParam('name');
    const latitude = parentNavigation.getParam('latitude');
    const longitude = parentNavigation.getParam('longitude');
    const reservationId = parentNavigation.getParam('reservationId');
    const storeId = parentNavigation.getParam('storeId');
    const theme = parentNavigation.getParam('theme');
    const [isAlertVisible, setIsAlertVisible] = useState(false);


    const storeCoords = {
        latitude,
        longitude,
    }

    const myCoords = {
        latitude : mylat,
        longitude : mylon
    }

    const _onPressAlertOk = async() => {
        await setIsAlertVisible(false);
       _goHome();
    }
    const _onPressAlertCancel = async() => {
        setIsAlertVisible(false);
    }
    const _substr = (imageSource)=>{
        var image = JSON.stringify(imageSource);
        image = image.substring(4,image.length-4);
        return Object({ uri : image });
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
        OneSiganl.removeEventListener('received',_oneSignalReceived);
        navigation.navigate('TabHome');
    }

    const [ isLoaded, setIsLoaded ] = useState(true);

    const [ listData, setListData ] = useState([
        {
            mainImage : _substr(mainImage),
            name,
            distance : _computeDistance(myCoords, storeCoords),
            reservationId,
            storeId,
            latitude,
            longitude,
            theme,
        },
    ]);

    
    const _oneSignalReceived = (notification)=>{
        if(!notification)return;
        const {latitude=null,longitude=null,mainImage=null,name=null,reservationId=null,storeId=null,storeType=null} = notification.payload.additionalData;
        setListData(listData.concat({
            mainImage : _substr(mainImage),
            name,
            distance : _computeDistance(myCoords, {latitude,longitude}),
            reservationId,
            storeId,
            latitude,
            longitude,
            theme : storeType,
        }));
    }
    

    useEffect(()=>{
        _timerStart();
        OneSiganl.addEventListener('received',_oneSignalReceived);
        OneSiganl.inFocusDisplaying(0);
    },[]);

    useEffect(()=>{
        if (timer && (timerCount <= 0)) {
            _timerStop();
            OneSignal.removeEventListener('received',_oneSignalReceived);
            OneSignal.removeEventListener('opened',_oneSignalReceived);
            OneSignal.inFocusDisplaying(2);
            Toast.show('선택 시간이 지났습니다. 홈 화면으로 이동합니다');
            navigation.navigate('TabHome');
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

    const _showStoreDetail = async({storeId,theme,distance})=>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const resDetail = await API.showStoreDetail(token,{storeId : storeId});
        const resReview = await API.showStoreReview(token,{storeId : storeId, page : 0});
        var mainImage = resDetail.mainImage;
        var subImage = resDetail.subImage;
        const photos = [];
        photos.push(mainImage.substring(2,mainImage.length-2));
        subImage = subImage.substring(2,subImage.length-2);
        subImage = subImage.split(',');
        if(subImage.length==1){
            photos.push(subImage[0]);
        }else{
            const len = subImage.length;
            for(var i = 0;i<len;i++){
                if(i==0)photos.push(subImage[i].substring(0,subImage[i].length-1));
                else if(i==len-1)photos.push(subImage[i].substring(1,subImage[i].length));
                else photos.push(subImage[i].substring(1,subImage[i].length-1));
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
            peopleNumber : navigation.getParam('peopleNumber'),
            minutes : navigation.getParam('minutes'),
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
                <Image
                    source = {item.mainImage}
                    style = {{width : Utill.screen.Screen.customWidth(160), height : Utill.screen.Screen.customHeight(180), marginBottom : 12}}
                    onLoadEnd = {()=>setIsLoaded(false)}
                    >
                </Image>
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
                subTitle = {'이미 요청을 수락한 가게가 있습니다.정말 취소할까요?'}
                subTextStyle = {styles.subtxtStyle}
                buttonText1={'아니오'} 
                buttonText2={'네'} 
                onPressCancel = {_onPressAlertCancel}
                onPress={_onPressAlertOk} 
        />
        
            <View style = {styles.header}>
                <Text style={{fontSize:14, color:"#733FFF" }}>{`${Math.floor(timerCount/60)}:${timerCount%60}`}</Text>
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
        top: Utill.screen.Screen.customHeight(590),
        flexDirection : 'row',
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
        alignSelf : 'center',
    },
    subtxtStyle : {
        marginBottom : Utill.screen.Screen.customHeight(35),
        fontSize : 16,
        color : Utill.color.textBlack,
        alignSelf : 'center',
    },
    txtStyle : {
        marginBottom : Utill.screen.Screen.customHeight(9),
        fontSize : 18,
        fontWeight : 'bold',
        color : Utill.color.red,
        alignSelf : 'center',
    },
    subtxtStyle : {
        marginBottom : Utill.screen.Screen.customHeight(35),
        fontSize : 16,
        color : Utill.color.textBlack,
        alignSelf : 'center',
    },
})