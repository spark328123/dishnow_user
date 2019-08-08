import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { NavHead, Text, Button } from '../../component/common'
import * as API from '../../utill/API';
import * as Utill from '../../utill';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.informationContainer}>
                    <Text>{item.rating}</Text>
                    <Text style={styles.date}>{item.createdAt}</Text>
                </View>
                <Image onLoad = {setIsLoaded(false)} style = {{width : Utill.screen.Screen.customWidth(330), height : Utill.screen.Screen.customWidth(182)}}source = {{uri : imageUrl[0]}}></Image>
                <View style={styles.contentContainer}>
                    <Text style={styles.contentText}>{item.content}</Text>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity>
                        <Text style={styles.buttonText}>수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: Utill.screen.Screen.customWidth(21)}}>
                        <Text style={styles.buttonText}>삭제</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.answerContainer}>
                    <View style={styles.answerContent}>
                        <View style={styles.ownerContent}>
                        <Text style={styles.ownerText}>사장님</Text>
                        <Text style={styles.ownerDate}>그제</Text>
                        </View>
                        <Text style={styles.answerText}>{item.answer}</Text>
                    </View>
                </View>
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
    },
    name: {
        fontSize: 16,
        marginTop: Utill.screen.Screen.customHeight(20),
        marginBottom: Utill.screen.Screen.customHeight(11)
    },
    informationContainer:{
        flexDirection: 'row'
    },
    date: {
        fontSize: 12,
        color: '#555555',
        marginLeft: 5,
        marginBottom: Utill.screen.Screen.customHeight(13)
    },
    contentContainer: {
        marginTop: Utill.screen.Screen.customHeight(14),
        width: Utill.screen.Screen.customWidth(330)
    },
    contentText: {
        fontSize: 14
    },
    button: {
        flexDirection: 'row',
        marginTop: Utill.screen.Screen.customHeight(15),
        marginBottom: Utill.screen.Screen.customHeight(18)
    },
    buttonText: {
        color: '#733FFF',
        fontSize: 14
    },
    answerContainer: {
        width: Utill.screen.Screen.customWidth(330),
        backgroundColor: '#EEEEEE',
        borderRadius: 10
    },
    answerContent: {
        marginLeft: Utill.screen.Screen.customWidth(15),
        marginTop: Utill.screen.Screen.customHeight(16),
        width: Utill.screen.Screen.customWidth(300),
        marginBottom: Utill.screen.Screen.customHeight(16)
    },
    ownerContent: {
        flexDirection:'row',
        marginBottom: Utill.screen.Screen.customHeight(12),
        alignItems: "flex-end"
    },
    ownerText :{
        fontSize: 12,
        fontWeight: "bold"
    },
    ownerDate: {
        fontSize: 10,
        marginLeft: Utill.screen.Screen.customWidth(7),
        color: "#555555"
    },
    answerText :{
        fontSize: 12
    }
})