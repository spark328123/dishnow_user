import React from 'react';
import {View,StyleSheet} from 'react-native';
import {ItemButton} from '../../../component/common'

export default Point2 = (props)=> {
    const { point ,phone } = props;
    const data = [
        {
            image : {uri : 'icon_x'},
            name : '[CGV]\nCGV 2D 관람권',
        },
        {
            image : {uri : 'icon_x'},
            name : '[스타벅스]\n달콤한 디저트 세트',
        },
        {
            image : {uri : 'icon_x'},
            name : '[컬쳐랜드]\n문화상품권 10,000원권',
        },
    ]
    return (
        <View style = {styles.container}>
            <ItemButton 
                data = {data}
                point = {point}
                diff = {'10000'}
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