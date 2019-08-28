import React, { useEffect, useState,memo } from 'react';
import { View, Text, StyleSheet, FlatList,  TouchableOpacity, ActivityIndicator,Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import {NavSwitchHead,CustomAlert} from '../../component/common';
import {handleAndroidBackButton,removeAndroidBackButtonHandler} from '../../component/common/hardwareBackButton';
import {useDispatch} from 'react-redux';
import * as User from '../../store/modules/user';

import * as API from '../../utill/API';
import * as Utill from '../../utill';
import Dialog from "react-native-dialog";
import Toast from 'react-native-simple-toast';

const full_field_star = { uri : 'icon_star_full_review'};
const empty_field_star = { uri : 'icon_star_empty_review'};

export default Review = ({navigation}) =>{
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [ data, setData ] = useState([]);
    const [ visible, setVisible ] = useState(false);
    const [ imageList, setImageList ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(true);
    const [ deleteReviewId, setDeleteReviewId] = useState();
    const dispatch = useDispatch();

    const _onPressAlertCancel = async() => {
        setIsAlertVisible(false);
    }

    const _onPressAlertOk = async() => {
        setIsAlertVisible2(false); 
    }

    const _showReview = async() =>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.reviewMe(token);
        if(res.error){
            Toast.show('네트워크 상태를 확인해 주세요');
            return;
        }
        setData(res);
        setIsLoaded(false);
        console.log(res);
    }

    useEffect(()=>{
        _showReview();
    },[])

   
    _goBack = () => {
        navigation.navigate('TabMy')
    }
    handleAndroidBackButton(_goBack)
    const _deleteReview = async (reviewId)=>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.reviewDelete(token,{reviewId : reviewId});
        setData(data.filter(info=>info.reviewId !== reviewId));
        const meRes = await API.me(token);
        dispatch(User.updatereviewcount(meRes.reviewCount));     
        console.log(meRes.reviewCount);   
        Toast.show('삭제되었습니다.');
    }

    const _renderItem = ({item}) => {
        let imageUrl = item.image;
        console.log(item);
        imageUrl = ((imageUrl.substring(1,imageUrl.length-1)).split(','));
        const ImageWidth =Utill.screen.Screen.customWidth(330);
        const ImageHeigt =  Utill.screen.Screen.customWidth(182);
        const len = imageUrl.length;
        
        if(item.rating!==null){
        return (
            <View style = {styles.flatContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.informationContainer}>
                    <View style = {{flexDirection : 'row'}}>
                        <Image style = { {width :12,height :12}} source = {item.rating>=1? full_field_star : empty_field_star}/>
                        <Image style = { {width :12,height :12}} source = {item.rating>=2? full_field_star : empty_field_star}/>
                        <Image style = { {width :12,height :12}} source = {item.rating>=3? full_field_star : empty_field_star}/>
                        <Image style = { {width :12,height :12}} source = {item.rating>=4? full_field_star : empty_field_star}/>
                        <Image style = { {width :12,height :12}} source = {item.rating>=5? full_field_star : empty_field_star}/>
                    </View>
                    <Text style={styles.date}>{item.createdAt.substring(0,10)}</Text>
                </View>
                {len >=1 && imageUrl[0].length>=4 && <Image style = {{width : ImageWidth, height :ImageHeigt}}source = {{uri : imageUrl[0].substring(1,imageUrl[0].length-1)}}/>}
                {len >=2 && <Image style = {{width : ImageWidth, height :ImageHeigt}}source = {{uri : imageUrl[1].substring(1,imageUrl[1].length-1)}}/>}
                {len >=3 && <Image style = {{width : ImageWidth, height :ImageHeigt}}source = {{uri : imageUrl[2].substring(1,imageUrl[2].length-1)}}/>}
                <View style={styles.contentContainer}>
                    <Text style={styles.contentText}>{item.content}</Text>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress = {()=>{navigation.navigate('ReviewWrite',{
                            storeName : item.name,
                            reviewId : item.reviewId,
                            isUpdate : true,
                            my : true,
                        })}}
                        >
                        <Text style={styles.buttonText}>수정</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                     onPress ={()=>{setIsAlertVisible(true);setDeleteReviewId(item.reviewId)}}
                     style={{marginLeft: Utill.screen.Screen.customWidth(21)}}>
                        <Text style={styles.buttonText}>삭제</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.answerContainer}>
                    {item.answer!==null ? ( <View style={styles.answerContent}>
                        <View style={styles.ownerContent}>
                        <Text style={styles.ownerText}>사장님</Text>
                        </View>
                        <Text style={styles.answerText}>{item.answer}</Text>
                    </View>) : null}
                </View>
            </View>
        )};
    }

    return(
        <View style ={styles.container}>
            <CustomAlert
                visible={isAlertVisible} 
                mainTitle={'리뷰 삭제'}
                mainTextStyle = {styles.txtStyle}
                subTitle = {'리뷰를 삭제하시겠습니까?'}
                subTextStyle = {styles.subtxtStyle}
                buttonText1={'취소'}
                buttonText2={'삭제'} 
                onPress={()=>{setIsAlertVisible(false);_deleteReview(deleteReviewId)}} 
                onPressCancel = {_onPressAlertCancel}
            />

            <View style = {{flex : 1}}>
                {!isLoaded ? <NavSwitchHead navigation={navigation} navtitle = {'TabMy'} title={`나의 리뷰`}/> : null}
            </View>
            
            {/* 로딩 끝났을 때 */}
            {!isLoaded ?  
                // 리뷰가 없으면
                (data.length ? 
                    (<FlatList
                        data = {data} renderItem = {_renderItem}/> )
                    :
                    (<Text style = {styles.reviewText}>리뷰를 작성해 주세요.</Text>))
                : (<ActivityIndicator style = {styles.indicator} size="large" color="#733FFF"/>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent:'center',
        alignContent : 'center',
        backgroundColor : Utill.color.white,
    },
    flatContainer : {
        flex : 1,
        padding : 15,
        backgroundColor : Utill.color.white,
        justifyContent : 'center',
    },
    reviewText : {
        flex : 1,
        alignSelf : 'center',
        justifyContent : 'center',
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
    },
    txtStyle : {
        marginBottom : Utill.screen.Screen.customHeight(9),
        fontSize : 18,
        fontWeight : 'bold',
        color : Utill.color.textBlack,
        alignSelf : 'center',
    },
    subtxtStyle : {
        width : 300,
        marginBottom : Utill.screen.Screen.customHeight(35),
        fontSize : 16,
        color : Utill.color.textBlack,
        textAlign : 'center',
    },
    indicator: {
        position: 'absolute',
        left: Utill.screen.screenWidth/2-15,
        top: Utill.screen.screenHeight/2-50        
    },
})