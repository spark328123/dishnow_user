import React, {useState, useEffect} from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useDispatch, connect } from 'react-redux';
import { Text,Button } from '../component/common/'
import ReviewButton from '../component/common/ReviewButton';
import * as API from '../utill/API';
import * as Utill from '../utill';
import Toast from 'react-native-simple-toast';

const TabBooked = (props) =>{
    const {navigation} = props;
    const [ isLoaded, setIsLoaded ] = useState(true);
    const [ data, setdata ] = useState([]);
    const [ topSafe ] = useState(Utill.screen.topSafe);
    const [ nowtime, setNowtime ] = useState((new Date()).getTime());
    //const [tb,setTb] = useState(false);
    const _showRes = async() => {
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const resList = await API.showRes(token);
        if(resList.error){
            Toast.show('네트워크 상태를 확인해 주세요');
            return;
        }
        setIsLoaded(false);
        setdata(resList);
        setNowtime((new Date()).getTime());
    }

    const _showStoreDetail = async({storeId,reservationId,latitude,longitude})=>{
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
        navigation.navigate('StoreStack',{
            resDetail,
            resReview,
            storeId,
            reservationId,
            photos,
            isReservation : false,
            latitude,
            longitude,
        })
        console.log(resDetail,resReview);
    }
    const _onPress = () => {
        navigation.navigate('splash2');
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
                    <Text style={styles.date}>{item.createdAt.substring(0,10)}</Text>
                </View>
                <ReviewButton
                    isUpdate = {item.isUpdate}
                    date = {(new Date(item.createdAt)).getTime()}
                    newdate = {nowtime}
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
       
        {!isLoaded?(  <FlatList
            data = {data}
            renderItem = {_renderItem}
          />):(
                <ActivityIndicator size="large" color={"#733FFF"}/>
          )}
           <TouchableOpacity style={styles.container} onPress ={()=>_onPress()}>
            <Image style={{height : 15, width : 15}} source={{uri : 'icon_logo_purple_main'}} />
            <Text style={styles.text}>새로고침</Text>
        </TouchableOpacity>
            
        
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        userid : state.User._root.entries[0][1],
        nickname : state.User._root.entries[2][1],
        image : state.User._root.entries[5][1],
        phone : state.User._root.entries[3][1],
        name : state.User._root.entries[6][1],
        point : state.User._root.entries[1][1],
        reviewcount : state.User._root.entries[4][1],
    }
}

export default connect(mapStateToProps)(TabBooked);

const styles = StyleSheet.create({
    container : {
        width : 90,
        position : 'absolute',
        top : 15,
        right : 15,
        height: 22,
        borderWidth: 1,
        borderColor: '#733FFF',
        justifyContent: 'center',
        alignItems : 'center',
        borderRadius : 25,
        flexDirection : 'row',
    },
    button : {
        width : 103,
        height : 46,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    },
    text : {
        fontSize : 14,
        marginLeft : 8.5,
        color : Utill.color.primary2,
    },
    list: {
        height: 172,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE'
    },
    nameContainer:{
        width : '60%',
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