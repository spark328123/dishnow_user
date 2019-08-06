import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Text } from '../../component/common';
import * as API from '../../utill/API';
import * as Utill from '../../utill';

export default Notice = () =>{
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

    useEffect(()=>{
        _getNotice();
        return()=>{
             setData(data.map(item=>{return {...item, isPressed : false}}));
            setIsLoading(false);
        }
    },[]);

    const _renderItem = ({item}) => {
        return (
            <View style = {styles.item}>
                <View style= {{padding : 15}}>
                    <Text style = {{marginBottom : 10, fontSize : 12}}>
                        {item.createdAt}
                    </Text>
                    <View style ={{flexDirection : 'row',flex : 1, justifyContent : 'space-between', alignItems : 'center'}}>
                        <Text style = {{fontSize : 16}}>
                            {item.title}
                        </Text>
                        <TouchableOpacity 
                            style = {{width : 20,height:20,alignItems :'center',justifyContent:'center'}}
                            onPress = {()=>_setIsPressed(item)}
                            >
                            <Image style = {{width : 12, height : 7}} 
                            source = {!item.isPressed?{uri : 'icon_rsquare_bracket_under'}:{uri:'icon_rsquare_bracket_upper'}}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>
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
    } ,
    item : {
        flex : 1,
    },
})
