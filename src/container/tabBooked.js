import React, {useState, useEffect} from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text } from '../component/common/'
import ReviewButton from '../component/common/ReviewButton';
import * as API from '../utill/API';
import * as Utill from '../utill';

const TabBooked = (props) =>{

    const {navigation} = props;
    const dispatch = useDispatch();
    const [ data, setdata ] = useState([ 
        
    ]);
    const [ topSafe ] = useState(Utill.screen.topSafe);

    const _showRes = async() => {
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const resList = await API.showRes(token);
        setdata(resList);
    }

    useEffect(() => {
        _showRes();
    },[]);

    const _renderItem = ({item}) => {
        return (
            <View style={styles.list}>
                <TouchableOpacity style={styles.nameContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Image source={{uri: "icon_rsquare_bracket"}} style={styles.nameButton} />
                </TouchableOpacity>
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>예약시간 : </Text>
                    <Text style={styles.date}>{item.createdAt}</Text>
                </View>
                <ReviewButton
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
