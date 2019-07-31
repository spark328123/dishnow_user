import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import ReviewButton from '../component/common/ReviewButton';
import * as API from '../utill/API';

const TabBooked = (props) =>{

    const {navigation} = props;
    const dispatch = useDispatch();
    const [ data, setdata ] = useState([ 
        
    ]);

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
            <View style={{marginTop : 50}}>
                <Text style={styles.resname}>{item.name}</Text>
                <Text>{item.createdAt}</Text>
               
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
            {
                flex : 1,
                alignItems : 'center',
                justifyContent : 'center',
            }
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

    resname: {              // 맨위에서부터 식당이름, 예약시간, 리뷰작성버튼
        fontSize : 20,        
    },
    restime: {
        fontSize : 12,
    },
    reviewbutton: {
        fontSize : 16,
    },
    timeout: {              // 리뷰작성시간 지났습니다
        fontSize : 16,
    },

})
