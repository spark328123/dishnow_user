import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Text } from '../../component/common';
import * as API from '../../utill/API';
import * as Utill from '../../utill';

export default Notice = () =>{
    const [data,setData] = useState([]);
    const [Content,setContent] = useState([]);

    const _getNotice = async()=>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.noticeTitle(token,{page:0});
        setData(res);
        for (var i = 0;i<res.length;i++){
            const noticeId = res[i].noticeId;
            const resContent = await API.noticeContent(token,{noticeId : noticeId});
            const content = resContent[0].content;
            console.log(content);
            setContent(Content.concat(content));
            //setData(data.map(item => item.noticeId === noticeId ? {...item,content:content} : item));
        }
    }
       
    
    const _setIsPressed = ({noticeId})=>{
        setData(data.map(item => item.noticeId===noticeId ? {...item,isPressed:!item.isPressed} : item))
    }

    useEffect(()=>{
        _getNotice();
        setData(data.map(item=>{return {...item, isPressed : false}}));
    },[]);

    const _renderItem = ({item}) => {
        return (
            <View style = {styles.item}>
                <View style = {{padding : 15}}>
                    <Text style = {{marginBottom : 10, fontSize : 12}}>
                        {item.createdAt}
                    </Text>
                    <View style ={{flexDirection : 'row',flex : 1, justifyContent : 'space-between', alignItems : 'center'}}>
                        <Text style = {{fontSize : 16}}>
                            {item.title}
                        </Text>
                        <TouchableOpacity 
                            onPress = {()=>_setIsPressed(item)}
                            >
                            <Image style = {{width : 12, height : 7}} source = {{uri : 'icon_rsquare_bracket_under'}}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>
                {item.isPressed?(
                  <View style= {styles.content}>
                      <Text style = {{fontSize : 15}}>
                          {Content[item.noticeId-1]}
                      </Text>
                      </View>  
                ):null}
            </View>
        )
    }

    return(
        <View style ={ styles.container}>
           <FlatList
            data = {data}
            renderItem = {_renderItem} />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        
    } ,
    item : {
        flex : 1,
        justifyContent:'center',
        alignItems : 'flex-start',
    },
    content : {
        padding : 15,
        flex :1 ,
        backgroundColor : Utill.color.border,
    }
})