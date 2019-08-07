import React, {useState, useEffect, memo, useRef} from 'react';
import {View, ScrollView, Text, Button, Dimensions, Image} from 'react-native';

import { getInset } from 'react-native-safe-area-view';
const {width} = Dimensions.get('screen');
const HEADER_BOTTOM_SAFE = getInset('bottom', false);

const icon_wifi = {uri : 'icon_wifi'}
const icon_charger = {uri : 'icon_charge'}
const icon_park = {uri : 'icon_wifi'}
const icon_smoke = {uri : 'icon_wifi'}
const icon_kids = {uri : 'icon_wifi'}
const icon_pet = {uri : 'icon_wifi'}

const data = {
    "name": "ㅁㄴㅇㅁㄴㅇ",
    "mainPhone": "123123",
    "content": "싱싱한 닭이나옵니다ㅇㅇ",
    "address": "주소가 여기에 ",
    "facilities": JSON.parse("{\"wifi\":true,\"battery\":true,\"parking\":true,\"somke\":false,\"pet\":false,\"kids\":true}"),
    "businessHour": {
        "mondayOpen": "00:00:00",
        "mondayClose": "00:00:00",
        "tuesdayOpen": "08:30:00",
        "tuesdayClose": "02:50:00",
        "wednesdayOpen": "09:50:00",
        "wednesdayClose": "20:55:00",
        "thursdayOpen": "09:05:00",
        "thursdayClose": "00:00:00",
        "fridayOpen": "05:30:00",
        "fridayClose": "02:00:00",
        "saturdayOpen": "07:40:00",
        "saturdayClose": "06:30:00",
        "sundayOpen": "00:00:00",
        "sundayClose": "00:00:00",
        "breakTime": "오후 2시 ~ 3시는 휴식시간 입니다."
    }
};


const Help = (props) => {
    const {initialScroll, onScroll, paddingTop} = props;
    const [refScroll, setRefScroll] = useState(null);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(()=> {        
        if (refScroll != null) setTimeout (()=>scrollToTop(0, false), 1);
    }, [refScroll]);
    const scrollToTop = (offset = initialScroll, animated = false) => {
        if (refScroll != null) refScroll.scrollTo({ y : offset  , animated});
    }
    const _timeToString = (openTime, CloseTime) => {
        return ((openTime == "00:00:00") && (CloseTime == "00:00:00")) ?
            `휴무` : `${openTime}   ~   ${CloseTime} `;
    } 

    return (
        <View style={{flex : 1, paddingBottom : 50 + HEADER_BOTTOM_SAFE}}>
            <ScrollView
                contentContainerStyle ={{ paddingTop, paddingHorizontal: 15, zIndex : 0}}
                nestedScrollEnabled={true}
                scrollEventThrottle={100}
                ref = {r=>setRefScroll(r)}
                onScroll = {(e)=>onScroll(e)}
            >
            <View style={{marginTop : 30}}>
                    <Text style={{
                        fontWeight : 'bold',
                        fontSize : 14,
                    }}>
                        {`가게소개`}
                    </Text>

                    <Text style={{
                        marginTop : 15,
                        fontSize : 14,
                    }}>
                        {data.content}
                    </Text>
                </View>


                <View style={{marginTop : 30}}>
                    <Text style={{
                        fontWeight : 'bold',
                        fontSize : 14,
                    }}>
                        {`영업시간`}
                    </Text>

                    
                    <View style={{flexDirection:'row', maringBottom:7, paddingTop:10}}>
                        <Text style={{fontSize:14, color:'#555555',}}>{`월요일`}</Text> 
                        <Text style={{fontSize:14, color:'#555555', marginLeft:20}}>{_timeToString(data.businessHour.mondayOpen, data.businessHour.mondayClose)}</Text>
                    </View>
                    <View style={{flexDirection:'row', maringBottom:7, paddingTop:10}}>
                        <Text style={{fontSize:14, color:'#555555',}}>{`화요일`}</Text> 
                        <Text style={{fontSize:14, color:'#555555', marginLeft:20}}>{_timeToString(data.businessHour.tuesdayOpen, data.businessHour.tuesdayClose)}</Text>
                    </View>
                    <View style={{flexDirection:'row', maringBottom:7, paddingTop:10}}>
                        <Text style={{fontSize:14, color:'#555555',}}>{`수요일`}</Text> 
                        <Text style={{fontSize:14, color:'#555555', marginLeft:20}}>{_timeToString(data.businessHour.wednesdayOpen, data.businessHour.wednesdayClose)}</Text>
                    </View>
                    <View style={{flexDirection:'row', maringBottom:7, paddingTop:10}}>
                        <Text style={{fontSize:14, color:'#555555',}}>{`목요일`}</Text> 
                        <Text style={{fontSize:14, color:'#555555', marginLeft:20}}>{_timeToString(data.businessHour.thursdayOpen, data.businessHour.thursdayClose)}</Text>
                    </View>
                    <View style={{flexDirection:'row', maringBottom:7, paddingTop:10}}>
                        <Text style={{fontSize:14, color:'#555555',}}>{`금요일`}</Text> 
                        <Text style={{fontSize:14, color:'#555555', marginLeft:20}}>{_timeToString(data.businessHour.fridayOpen, data.businessHour.fridayClose)}</Text>
                    </View>
                    <View style={{flexDirection:'row', maringBottom:7, paddingTop:10}}>
                        <Text style={{fontSize:14, color:'#555555',}}>{`토요일`}</Text> 
                        <Text style={{fontSize:14, color:'#555555', marginLeft:20}}>{_timeToString(data.businessHour.saturdayOpen, data.businessHour.saturdayClose)}</Text>
                    </View>
                    <View style={{flexDirection:'row', maringBottom:7, paddingTop:10}}>
                        <Text style={{fontSize:14, color:'#555555',}}>{`일요일`}</Text> 
                        <Text style={{fontSize:14, color:'#555555', marginLeft:20}}>{_timeToString(data.businessHour.sundayOpen, data.businessHour.sundayClose)}</Text>
                    </View> 
                </View>
                <View style={{marginTop : 30, paddingBottom:30}}>
                    <Text style={{
                        fontWeight : 'bold',
                        fontSize : 14,
                    }}>
                        {`편의시설`}
                    </Text>
                    <View style={{flexDirection:'row', marginTop:15}}>

                        {data.facilities.wifi && <View style={{alignItems:'center', marginRight:20,}}>
                            <Image style={{width:40, height:40, marginBottom : 8,}} source={icon_wifi}/>
                            <Text>{`와이파이`}</Text>
                        </View>}
                        {data.facilities.charger && <View style={{alignItems:'center', marginRight:20,}}>
                            <Image style={{width:40, height:40, marginBottom : 8,}} source={icon_charger}/>
                            <Text>{`휴대폰충전`}</Text>
                        </View>}
                        {data.facilities.park && <View style={{alignItems:'center', marginRight:20,}}>
                            <Image style={{width:40, height:40, marginBottom : 8,}} source={icon_park}/>
                            <Text>{`주차장`}</Text>
                        </View>}
                        {data.facilities.kids && <View style={{alignItems:'center', marginRight:20,}}>
                            <Image style={{width:40, height:40, marginBottom : 8,}} source={icon_kids}/>
                            <Text>{`키즈존`}</Text>
                        </View>}
                        {data.facilities.pet && <View style={{alignItems:'center', marginRight:20,}}>
                            <Image style={{width:40, height:40, marginBottom : 8,}} source={icon_pet}/>
                            <Text>{`반려동물`}</Text>
                        </View>}
                        {data.facilities.smoke && <View style={{alignItems:'center', marginRight:20,}}>
                            <Image style={{width:40, height:40, marginBottom : 8,}} source={icon_smoke}/>
                            <Text>{`흡연실`}</Text>
                        </View>}
                    </View>
                </View>

                <View style={{marginTop:30, borderTopWidth:1, borderTopColor:'#cccccc'}}>
                    <View style={{flexDirection:'row', marginTop:30, marginBottom:20}}>
                    <Text style={{fontSize:14, color:'#555555'}}>{`가게정보`}</Text> 
                    <Text style={{fontSize:14, color:'#111111', marginLeft:15}}>{data.name}</Text>
                    </View>
                    <View style={{flexDirection:'row', marginBottom:20}}>
                    <Text style={{fontSize:14, color:'#555555'}}>{`주소`}</Text> 
                    <Text style={{fontSize:14, color:'#111111', marginLeft:15}}>{data.address}</Text>
                    </View>
                    <View style={{flexDirection:'row', marginBottom:20}}>
                    <Text style={{fontSize:14, color:'#555555'}}>{`대표번호`}</Text> 
                    <Text style={{fontSize:14, color:'#111111', marginLeft:15}}>{`${data.mainPhone}\n${data.subPhone?data.subPhone:''}`}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Help;