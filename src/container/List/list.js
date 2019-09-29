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

    const [ isLoaded, setIsLoaded ] = useState(true);
    const [ listData, setListData ] = useState([]);

    const myCoords = {
        latitude : mylat,
        longitude : mylon
    }

    const _getServer = async() => {
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.getReservation_accept(token,myCoords);
        console.log(res);
        
        setListData(res.map(item=>{
            var {mainImage,name,storeId,latitude,longitude,type,mainMenu,keyword}=item;
            if(keyword.length>10)keyword = `${keyword.substring(0,11)}...`
            const JSONmainMenu = JSON.parse(mainMenu);
            return{
                mainImage : _substr(JSON.stringify(JSONmainMenu[0].image)),
                name,
                distance : _computeDistance(myCoords, {latitude,longitude}), 
                storeId,
                latitude,  
                longitude,
                theme : keyword,
            }
        }));
        
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
    


    useEffect(()=>{
        _getServer();
    },[]);

    const _showStoreDetail = async({storeId,theme,distance})=>{
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
            photos,
            isReservation : true,
            theme,
            distance,
            peopleNumber : navigation.getParam('people'),
            minutes : navigation.getParam('time'),
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
        );
    }

    return(
        <View style = {styles.container}>
        
        
            <View style = {styles.header}>
                <Text style = {{fontSize : 18, fontWeight:'bold', marginLeft:Utill.screen.Screen.customWidth(20)}}>
                    예약 가능 식당
                </Text>
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