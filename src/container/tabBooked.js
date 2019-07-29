import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { ReviewButton } from '../component/common/'
import * as API from '../utill/API';

const TabBooked = (props) =>{

    const {navigation} = props;
    const dispatch = useDispatch();
    const [data, setdata] = useState([ 

    ]);

    const _me = async() => {
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const meRes = await API.me(token);
        const resList = await API.reserveList(token);
        await setdata(resList);
        console.log(data);
    }

    useEffect(() => {
        _me();
    }, []);

    const _renderItem = ({item}) => {
        return (
            <View>
                <Text style={styles.resname}>{item.name}</Text>
                <Text>{item.createdAt}</Text>
                <ReviewButton
                    date = {item.createdAt}
                    id = {item.reviewId}
                    rate = {item.rating}
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
            <TouchableOpacity onPress = {()=>_me()}>
                <Text> SiPal </Text>
            </TouchableOpacity>
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