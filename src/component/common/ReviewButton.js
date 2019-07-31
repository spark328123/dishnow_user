import React, {useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from '../common/'
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
            <TouchableOpacity style={styles.ReviewButton}
                onPressIn = {()=>navigation.push('ReviewWrite',{
                    reviewId,
                    storeName 
                })}>
                <View style={styles.ReviewButtonTextContainer}>
                <Text style={styles.CanWrite}>리뷰 작성하기</Text>
                <Text style={styles.CanWriteUnder}> (7일간 작성 가능)</Text>
                </View>
            </TouchableOpacity>
        )
    }
    else{
        return(
            <View style={styles.reviewText}>
                <Text style={styles.CanNotWrite}> 리뷰작성기간이 지났습니다 </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    ReviewButton:{
        width: 330,
        height: 40,
        borderWidth: 1,
        borderColor: '#733FFF',
        justifyContent: 'center',
        borderRadius : 25,
        marginTop: 25
    },
    ReviewButtonTextContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    CanWrite : {
    fontSize: 16,
    color: "#733FFF"
    },
    CanWriteUnder : {
        fontSize: 14,
        color: "#733FFF"
        },
    CanNotWrite : {
        fontSize: 16,
        color: '#CCCCCC'
    },
    reviewText: {
        marginTop: 36,
        width: 330,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})