import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Text,NavSwitchHead } from '../../component/common';
import { handleAndroidBackButton } from '../../component/common/hardwareBackButton';
import * as API from '../../utill/API';
import * as Utill from '../../utill';

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
            item.noticeId===noticeId ? {...item,isPressed:!item.isPressed} : item));
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
                      <Text style = {{fontSize : 15}}>
                          {item.content}
                      </Text>
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