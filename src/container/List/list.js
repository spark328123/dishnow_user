import React , { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    AppState,
    Image,
    ScrollView, 
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
    const { navigation, mylat, mylon, address} = props;
    const [ isLoaded, setIsLoaded ] = useState(true);
    const [ listData, setListData ] = useState([]);

    const myCoords = {
        latitude : mylat,
        longitude : mylon
    }

    const [temaList, settemaList] = useState([  // 테마배열
        {   index : 1, color : '#FFFFFF', isselect : true, id : '전체', temaselect : 1, backcolor : "#733FFF"},
        {   index : -1, color : '#111111', isselect : false, id : '단체', temaselect : 0, backcolor : "#EEEEEE"},
        {   index : -1, color : '#111111', isselect : false, id : '가성비', temaselect : 0, backcolor : "#EEEEEE"},
        {   index : -1, color : '#111111', isselect : false, id : '데이트', temaselect : 0, backcolor : "#EEEEEE"},
        {   index : -1, color : '#111111', isselect : false, id : '밥&술', temaselect : 0, backcolor : "#EEEEEE"},
        {   index : -1, color : '#111111', isselect : false, id : '이자카야', temaselect : 0, backcolor : "#EEEEEE"},
        {   index : -1, color : '#111111', isselect : false, id : '옛날감성', temaselect : 0, backcolor : "#EEEEEE"},
    ]);

    const _toggle = async(i,newTemaList) =>{ // 색깔바뀌는 함수 밖으로 빼냄
  
        for(let k=0; k<7; k++){
            if(k==i)continue;
            newTemaList[k].color = '#111111';
            newTemaList[k].isselect = false;
            newTemaList[k].temaselect = 0;
            newTemaList[k].backcolor = '#EEEEEE';
        }
        
        newTemaList[i].color = '#FFFFFF';
        newTemaList[i].isselect = true;
        newTemaList[i].temaselect = 1;
        newTemaList[i].backcolor = '#733FFF';
    }

    const _changeTemaColor = async(i) => {  // 테마선택 색깔,선택 바뀌게하는 함수
        let newTemaList = [...temaList];
        if(newTemaList[i].color === '#111111'){
          await _toggle(i,newTemaList);
        }
        // else{
        //     if(i!==0){
        //         newTemaList[i].color = '#111111';
        //         newTemaList[i].isselect = false;
        //         newTemaList[i].temaselect = 0;
        //         newTemaList[i].backcolor = '#EEEEEE';
        //     }
        // }
        settemaList(newTemaList);
        _getServer();
        console.log([temaList[0].temaselect,temaList[1].temaselect,temaList[2].temaselect,temaList[3].temaselect,temaList[4].temaselect,temaList[5].temaselect,temaList[6].temaselect]);
    }

    const full_field_star = { uri : 'icon_star_full_review'};
    const empty_field_star = { uri : 'icon_star_empty_review'};
    const half_field_star = {uri : 'icon_star_half_list'}

    const _getServer = async() => {
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.getReservation_accept(token,myCoords);
        console.log("res 정보입니다");
        console.log(res);
        
        setListData(res.map(item=>{
            var {mainImage,name,storeId,latitude,longitude,type,mainMenu,keyword,rating,content,storeTypeId,storeTypeId2,storeTypeId3,storeTypeId4,storeTypeId5,storeTypeId6}=item;
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
                    rating,
                    content,
                    storeTypeId,
                    storeTypeId2,
                    storeTypeId3,
                    storeTypeId4,
                    storeTypeId5,
                    storeTypeId6,
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
        if(temaList[0].isselect||(temaList[1].isselect&&item.storeTypeId==1)||(temaList[2].isselect&&item.storeTypeId2==1)||(temaList[3].isselect&&item.storeTypeId3==1)||(temaList[4].isselect&&item.storeTypeId4==1)
        ||(temaList[5].isselect&&item.storeTypeId5==1)||(temaList[6].isselect&&item.storeTypeId6==1))
        {
        return (
            <View style={styles.item}>

                <TouchableOpacity
                    style = {
                        {
                            width : Utill.screen.Screen.customWidth(330),
                            height : Utill.screen.Screen.customHeight(96),
                            flexDirection : 'row',
                        }
                    }
                    onPress = {()=>_showStoreDetail(item)}
                >

                {isLoaded && <ActivityIndicator style = { styles.indicator } />} 
                <FastImage
                    source = {item.mainImage}
                    style = {{width : Utill.screen.Screen.customWidth(73), height : Utill.screen.Screen.customHeight(73), marginBottom : 12,marginRight:14}}
                    onLoadEnd = {()=>setIsLoaded(false)}
                    >
                </FastImage>
                <View style = {{flexDirection:'column',width:Utill.screen.Screen.customWidth(240)}}>
                    {/* 가게 이름 */}
                    <Text style = {{fontSize : 14, color : Utill.color.black, marginBottom : 3}}>{item.name}</Text>
                    {/* 별점 */}
                    <View style = {{flexDirection : 'row',width : 48,height : 7,marginBottom:8,}}>
                    <Image style={styles.contentStar} source={item.rating>0 ? (item.rating<1 ? half_field_star : full_field_star) : empty_field_star}/>
                    <Image style={styles.contentStar} source={item.rating>1 ? (item.rating<2 ? half_field_star : full_field_star) : empty_field_star}/>
                    <Image style={styles.contentStar} source={item.rating>2 ? (item.rating<3 ? half_field_star : full_field_star) : empty_field_star}/>
                    <Image style={styles.contentStar} source={item.rating>3 ? (item.rating<4 ? half_field_star : full_field_star) : empty_field_star}/>
                    <Image style={styles.contentStar} source={item.rating>4 ? (item.rating<5 ? half_field_star : full_field_star) : empty_field_star}/>
                    </View>

                    <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                        {/* 가게 소개 */}
                        <Text 
                            style = {{
                                fontSize : 10, 
                                color : Utill.color.itemTitle,
                                marginBottom:8,
                                justifyContent:'flex-end'}}>
                                {(item.content===null||item.content==="null")? "가게 소개가 아직 없어요!" : 
                                    item.content.length>=15? '...': item.content}
                        </Text>
                        <Image style = {{width:6.5,height:13}} source = {{uri:'icon_rsquare_bracket'}}
                        />

                    </View>
                    <View
                        style = {{flexDirection:'row', justifyContent : 'space-between',}}>

                        {/* 테마 */}
                        <Text style = {{fontSize : 11, color : Utill.color.itemTitle}}>
                            {item.theme}
                        </Text>
                        {/* 거리 */}
                        <Text style = {{fontSize : 11, color : Utill.color.primary1,}}>
                            {`${item.distance}m`}
                        </Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        );
        }
    }

    return(
        <View style = {styles.container}>
        
            <View style = {styles.header}>
                <Image style = {{width:14,height:19.5}} source = {{uri:'icon_pin'}}>
                    
                </Image>
                <Text style = {{fontSize : 18, fontWeight:'bold', marginLeft:Utill.screen.Screen.customWidth(20)}}>
                    {address}
                </Text>
            </View>

            <View style = {styles.line}></View>

            <ScrollView
                style = {styles.scrollViewContainer}
                horizontal = {true}
                showsVerticalScrollIndicator = {true}
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginLeft: 16
                }}
            >
                        <View style = {{ marginLeft : 4, width : 55, height : 33,alignItems : 'center',justifyContent : 'center',backgroundColor: temaList[0].backcolor, borderRadius: 15 }}>

                        <TouchableOpacity onPress = {()=>_changeTemaColor(0)}>
                            <View><Text  style = {{color : temaList[0].color }}> 전체 </Text></View>
                        </TouchableOpacity>

                        </View>
                        <View style = {{ marginLeft : 4, width : 55, height : 33,alignItems : 'center',justifyContent : 'center',backgroundColor: temaList[1].backcolor, borderRadius: 15 }}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(1)}>
                            <View><Text  style = {{color : temaList[1].color }}> 단체 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {{ marginLeft : 4, width : 60, height : 33,alignItems : 'center',justifyContent : 'center',backgroundColor: temaList[2].backcolor, borderRadius: 15 }}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(2)}>
                            <View><Text  style = {{color : temaList[2].color }}> 가성비 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {{ marginLeft : 4, width : 60, height : 33,alignItems : 'center',justifyContent : 'center',backgroundColor: temaList[3].backcolor, borderRadius: 15 }}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(3)}>
                            <View><Text  style = {{color : temaList[3].color }}> 데이트 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {{ marginLeft : 4, width : 60, height : 33,alignItems : 'center',justifyContent : 'center',backgroundColor: temaList[4].backcolor, borderRadius: 15 }}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(4)}>
                            <View><Text  style = {{color : temaList[4].color }}> {`밥&술`} </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {{ marginLeft : 4, width : 65, height : 33,alignItems : 'center',justifyContent : 'center',backgroundColor: temaList[5].backcolor, borderRadius: 15 }}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(5)}>
                            <View><Text  style = {{color : temaList[5].color }}> 이자카야 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {{ marginLeft : 4, width : 65, height : 33,alignItems : 'center',justifyContent : 'center',backgroundColor: temaList[6].backcolor, borderRadius: 15 }}>
                        <TouchableOpacity onPress = {()=>_changeTemaColor(6)}>
                            <View><Text  style = {{color : temaList[6].color }}> 옛날감성 </Text></View>
                        </TouchableOpacity>
                        </View>
                        <View style = {{width : 40 }}>

                        </View>
            </ScrollView>

            <View style = {styles.line}></View>

            <View style={{width:Utill.screen.Screen.customWidth(340),height:Utill.screen.Screen.customHeight(460),marginBottom:Utill.screen.Screen.customHeight(40), alignItems:"flex-start",}}>
                <FlatList 
                    data = {listData}
                    renderItem = {_renderItem}
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
        address : state.Maps._root.entries[1][1],
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
        justifyContent : 'center',
        alignItems: "center",
        height : Utill.screen.Screen.customHeight(45),
        marginTop:Utill.screen.Screen.topSafe,
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
    scrollViewContainer :{
        height:  Utill.screen.Screen.customHeight(45),
        width: '100%',
    },
    item : {
        flexDirection : 'row',
        padding : Utill.screen.Screen.customWidth(5),
        width : "100%",
        height : Utill.screen.Screen.customHeight(96),
    },
    contentStar : {
        width : 6.5,
        height : 6.5,
        marginBottom : 12,
    },
    item3 : {
        marginLeft : 4,
        width : 60,
        height : 33,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor: "#EEEEEE",
        borderRadius: 15,
    },
    item4 : {
        marginLeft : 4,
        width : 65,
        height : 33,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor: "#EEEEEE",
        borderRadius: 15,
    },
    line : {
        borderBottomWidth: 2,
        borderBottomColor: "#EEEEEE",
    },
})
