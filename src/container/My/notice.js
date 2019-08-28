import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Dimensions, ImageBackground, Linking} from 'react-native';
import { Text,NavSwitchHead } from '../../component/common';
import { handleAndroidBackButton } from '../../component/common/hardwareBackButton';
import * as API from '../../utill/API';
import * as Utill from '../../utill';
import FastImage from 'react-native-fast-image';

export default Notice = ({navigation}) =>{
    _goBack = () => {
        navigation.navigate('TabMy')
    }

    handleAndroidBackButton(_goBack);

    const [data,setData] = useState([]);
    const [IsLoading,setIsLoading] = useState(true);
    const contentArray = [];

    const _getNotice = async()=>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.noticeTitle(token,{page:0});
        setData(res);
        for (var i = 0;i<res.length;i++){
            const noticeId = res[i].noticeId;
            const resContent = await API.noticeContent(token,{noticeId : noticeId});
            contentArray.push(resContent[0]);
        }
        setData(contentArray);
    }  
    
    const _setIsPressed = ({noticeId})=>{
        setData(data.map(item => 
            item.noticeId===noticeId ? {...item,isPressed:!item.isPressed} : {...item,isPressed:false}));
    }

    const _parseTime = ({createdAt}) => {
        const str = JSON.stringify(createdAt);
        return `${str.substring(1,5)}.${str.substring(6,8)}.${str.substring(9,11)}`;
    }

    useEffect(()=>{
        _getNotice();
        return()=>{
            setData(data.map(item=>{return {...item, isPressed : false}}));
            setIsLoading(false);
        }
    },[]);

    const _renderItem = ({item}) => {
        
        return (
            <View style = {styles.container}>
                <TouchableOpacity onPress = {()=>_setIsPressed(item)}>
                    <View style= {{padding : 15}}>
                        <Text style = {{marginBottom : 7, fontSize : 12}}>
                            {_parseTime(item)}
                        </Text>                      
                        <View style ={{flexDirection : 'row',flex : 1, justifyContent : 'space-between', alignItems : 'center'}}>
                            <Text style = {{fontSize : 16}}>
                                {item.title}
                            </Text>
                            <Image 
                                style = {{width : 12, height : 7}} 
                                source = {!item.isPressed?{uri : 'icon_rsquare_bracket_under'}:{uri:'icon_rsquare_bracket_upper'}}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                {item.isPressed?(
                  <View style= {{padding : 15, backgroundColor : Utill.color.border}}>
                    {item.noticeId==1 && <Text style = {{fontSize : 15}}>소개영상:</Text>}
                   {item.noticeId==1 && <Text style = {{textDecorationLine: 'underline', fontSize : 15, color : '#733FFF'}}onPress = {()=>Linking.openURL('https://www.youtube.com/watch?v=5tnZmv8hfgw')}>https://www.youtube.com/watch?v=5tnZmv8hfgw</Text>}
                      <Text style = {{fontSize : 15}}>
                          {`${item.content}`}
                      </Text>
                      {item.noticeId==1 && <Text>{
`디쉬나우 소개영상과 이벤트 포스터를 확인하고, 응모해보세요!
가장 많이 응모한 1등에게는 20만원, 2등에게는 10만원의 상금을 드립니다 

.
.

꿀TIP)

1차에서 2차, 2차에서 3차로 넘어갈 때마다 '디쉬나우'를 이용하기
동아리에서 하나의 이름으로 중복 응모하기
친구들끼리 한 명 이름으로 몰아주고 상금 N빵~
술집갈 때마다!!! 디쉬나우 이용하기

※사용할 때 마다 천원을 받을 수 있는 이벤트를 진행중이니, 총무 등 술자리를 알아보는 분들은 선물 받아가세요~!

`}</Text>}
                      {item.noticeId==1 && <FastImage resizeMode = 'contain' style = {{flex : 1, width : Utill.screen.Screen.customWidth(330), height : Utill.screen.Screen.customHeight(430)
                }}source = {{uri : 'https://dishnow.s3.ap-northeast-2.amazonaws.com/17%E1%84%86%E1%85%A1%E1%86%AB%E1%84%8B%E1%85%AF%E1%86%AB%E1%84%8C%E1%85%B5%E1%84%8B%E1%85%AF%E1%86%AB%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A6%E1%86%AB%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5.jpg'}}/> }
                      </View>
                ):null}
            </View>
        )
    }

    return(
        <View style ={ styles.container}>
            <NavSwitchHead navigation={navigation} navtitle = {'TabMy'} title={`공지사항`}/>
            {IsLoading ?(
                
                <FlatList
                data = {data}
                renderItem = {_renderItem} />
               
                ):(
                <ActivityIndicator/>
                )}
           
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : Utill.color.white,
    }
})