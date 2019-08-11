import React from 'react';
import {View,StyleSheet} from 'react-native';
import {ItemButton} from '../../../component/common'

export default Point1 = (props)=> {
    const { point ,phone } = props;
    const data = [
        {
            image : {uri : 'icon_x'},
            name : '[스타벅스] \n 아이스 아메리카노 Tall',
        },
        {
            image : {uri : 'icon_x'},
            name : '[베스킨라빈스]\n더블주니어 아이스크림',
        },
        {
            image : {uri : 'icon_x'},
            name : '[컬쳐랜드]\n문화상품권 5,000원권',
        },
    ]
    return (
        <View style = {styles.container}>
            <ItemButton 
                data = {data}
                point = {point}
                diff = {'5000'}
                type = {'use'}
                phone = {phone}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
})