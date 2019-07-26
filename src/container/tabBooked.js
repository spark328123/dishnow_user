import React, {useState} from 'react';
import { View, FlatList } from 'react-native';
import { Text } from '../component/common/'

export default () =>{
    const [data] = useState([
        {
            resName : '아웃치킨 홍대점',
            resTime : '예약시간 :  2019년 6월 19일 오후 6:30',
        }
    ])

    const _renderItem = ({item}) => {
        return (
            <Text >{item.resName}</Text>
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