import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import * as Utill from '../../utill';

export default  (props) => {
    console.log(props)
    var date = new Date().getTime();
    var day = JSON.stringify(props.date);
    var dayArray = day.split("-");
    var dayObj = new Date(dayArray[0], Number(dayArray[1])-1, dayArray[2]);
    var betweenDay = (date - dayObj.getTime())/1000/60/60/24;
    const { navigation, reviewId, storeName } = props;

    if(true){
        return (
            <TouchableOpacity style={{ width : 330, height : 80}}
                onPressIn = {()=>navigation.push('ReviewWrite',{
                    reviewId,
                    storeName 
                })}>
                <Text>리뷰 작성하기 (7일간 작성 가능)</Text>
            </TouchableOpacity>
        )
    }
    else{
        return(
            <View>
                <Text> 리뷰작성기간이 지났습니다 </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    CanWrite : {

    },
    CanNotWrite : {

    },
})