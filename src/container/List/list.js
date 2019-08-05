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
import { Text } from '../../component/common';
import * as Utill from '../../utill';
import * as API from '../../utill/API';
import OneSiganl from 'react-native-onesignal';

const List = (props) => {
    const { navigation, mylat, mylon } = props;
    const parentNavigation = navigation.dangerouslyGetParent();
    const mainImage = parentNavigation.getParam('mainImage');
    const name = parentNavigation.getParam('name');
    const latitude = parentNavigation.getParam('latitude');
    const longitude = parentNavigation.getParam('longitude');
    const reservationId = parentNavigation.getParam('reservationId');
    const storeId = parentNavigation.getParam('storeId');
    const theme = parentNavigation.getParam('theme');

    const storeCoords = {
        latitude,
        longitude,
    }

    const myCoords = {
        latitude : mylat,
        longitude : mylon
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
        navigation.navigate('TabHome');
        OneSiganl.removeEventListener('received');
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
        const {latitude=null,longitude=null,mainImage=null,name=null,reservationId=null,storeId=null} = notification.payload.additionalData;
        setListData(listData.concat({
            mainImage : _substr(mainImage),
            name,
            distance : _computeDistance(myCoords, {latitude,longitude}),
            reservationId,
            storeId,
            latitude,
            longitude,
            theme : '치킨',
        }));
    }

    useEffect(()=>{
        OneSiganl.removeEventListener('received');
        OneSiganl.addEventListener('received',_oneSignalReceived);
    },[listData]);

    const _confirm = async(item)=>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const data = {
            reservationId : item.reservationId,
            storeId : item.storeId, 
        }
        console.log(data);
        const res = await API.reservation_confirm(token,data);
        console.log(res);
    }

    const _renderItem = ({item}) => {
        return (
            <View>
                <TouchableOpacity
                    style = {
                        {
                            width : 160,
                            height : 180,
                        }
                    }
                    onPress = {()=>_confirm(item)}
                >
                {isLoaded && <ActivityIndicator style = { styles.indicator } />} 
                <Image
                    source = {item.mainImage}
                    style = {{width : 160, height : 180, marginBottom : 12}}
                    onLoadEnd = {()=>setIsLoaded(false)}
                    >
                </Image>
              
                </TouchableOpacity>
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
            </View>
        )
    }

    return(
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {{fontSize : 18}}>
                    예약 가능 식당
                </Text>
                <TouchableOpacity
                    onPress = {()=>_goHome()}>
                    <Text style = {{color : Utill.color.red, fontSize : 14}}>
                        취소하기
                    </Text>
                </TouchableOpacity>
            </View>
                <FlatList 
                    data = {listData}
                    renderItem = {_renderItem}
                    numColumns = {2}
                    paddingRight = {10}
                    marginBottom = {24}
                    />
            <TouchableOpacity style = {styles.button} 
                onPress = {()=>navigation.push('ListMap',{data:listData})}>              
                <Image source = {{uri : 'icon_on_map_white'}} style = {{width: 20,height:16, paddingRight :7}} />
                <Text style = {{fontSize : 16, color : '#FFFFFF'}}>지도에서 보기</Text>
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
    },
    header : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        height : 50,
    },
    button : {
        flexDirection : 'row',
        height : 50,
        backgroundColor : Utill.color.primary1,
        alignItems : 'center',
        justifyContent : 'center',
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
})