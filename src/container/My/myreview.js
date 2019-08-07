import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import {NavHead} from '../../component/common'
import * as API from '../../utill/API';

export default Review = ({navigation}) =>{

    const _showReview = async() =>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.reviewMe(token);
        setData(res);
    }

    useEffect(()=>{
        _showReview();
    },[])

    const [ data, setData ] = useState([]);
    const [ imageList, setImageList ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);

    const _renderItem = ({item}) => {
        let imageUrl = JSON.stringify(item.image);
        imageUrl = ((imageUrl.substring(4,imageUrl.length-4)).split(','));

        return (
            <View style = {styles.container}>
                <Text>{item.name}</Text>
                <Text>{item.content}</Text>
                <Text>{item.createdAt}</Text>
                <Text>{item.rating}</Text>
                <Image onLoad = {setIsLoaded(false)} style = {{width : 330, height : 132}}source = {{uri : imageUrl[0]}}></Image>
                <Text>사장님</Text>
                <Text>{item.answer}</Text>
            </View>
        )
    }

    return(
        <View style ={
        {
            flex : 1,
            alignItems : 'center',
            justifyContent : 'center',
        }
        
        }>
        <NavHead navigation={navigation} title={`나의 리뷰`}/>
          <FlatList
            data = {data}
            renderItem = {_renderItem}
          />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent:'center',
    }
})