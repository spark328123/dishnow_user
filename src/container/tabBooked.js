import React, {useState, useEffect} from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text } from '../component/common/'
import ReviewButton from '../component/common/ReviewButton';
import * as API from '../utill/API';
import * as Utill from '../utill';

const TabBooked = (props) =>{

    const {navigation} = props;
    const [ data, setdata ] = useState([ 
        
    ]);
    const [ topSafe ] = useState(Utill.screen.topSafe);

    const _showRes = async() => {
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const resList = await API.showRes(token);
        console.log(resList);
        setdata(resList);
    }

    const _showStoreDetail = async({storeId,reservationId})=>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const resDetail = await API.showStoreDetail(token,{storeId : storeId});
        const resReview = await API.showStoreReview(token,{storeId : storeId, page : 0});
        var mainImage = resDetail.mainImage;
        var subImage = resDetail.subImage;
        const photos = [];
        photos.push(mainImage.substring(2,mainImage.length-2));
        subImage = subImage.substring(2,subImage.length-2);
        subImage = subImage.split(',');
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
        navigation.navigate('ListMenu',{
            resDetail,
            resReview,
            storeId,
            reservationId,
            photos,
            isReservation : false,
        })
        console.log(resDetail,resReview);
    }

    useEffect(() => {
        _showRes();
    },[]);

    const _renderItem = ({item}) => {
        return (
            <View style={styles.list}>
                <TouchableOpacity style={styles.nameContainer}
                    onPressIn = {()=>{
                        _showStoreDetail(item);
                    }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Image source={{uri: "icon_rsquare_bracket"}} style={styles.nameButton} />
                </TouchableOpacity>
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>예약시간 : </Text>
                    <Text style={styles.date}>{item.createdAt}</Text>
                </View>
                <ReviewButton
                    isUpdate = {item.isUpdate}
                    date = {item.createdAt}
                    reviewId = {item.reviewId}
                    rate = {item.rating}
                    storeName = {item.name}
                    navigation = {navigation}
                />
            </View>
        )
    }

    return(
        <View style = {
            [
                {
                flex : 1,
                alignItems : 'center',
                justifyContent : 'center',
                },
                {marginTop : topSafe}
            ]
        }>
            
          <FlatList
            data = {data}
            renderItem = {_renderItem}
          />
        </View>
    )
}

export default TabBooked

const styles = StyleSheet.create({
    list: {
        height: 172,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE'
    },
    nameContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30
    },
    name: {     // 맨위에서부터 식당이름, 예약시간, 리뷰작성버튼
        fontSize : 20,     
    },
    nameButton: {
        width: 8.9,
        height: 15,
        marginLeft: 10
    },
    dateContainer: {
        marginTop: 15,
        flexDirection: 'row'
    },
    date: {
        fontSize : 12,
    },
    timeout: {              // 리뷰작성시간 지났습니다
        fontSize : 16,
    },

})
