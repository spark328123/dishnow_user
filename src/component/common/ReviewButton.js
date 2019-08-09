import React, {useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from '../common/'
import * as Utill from '../../utill';

export default  (props) => {
    var newdate = new Date();
    var olddate = new Date(props.date);
    var between = newdate.getTime() - olddate.getTime();
    var betday = between/1000/60/60/24;

    const { navigation, reviewId, storeName, isUpdate } = props;
    console.log(newdate,olddate,between,betday);

    if(betday < 7){
        if(isUpdate !== 'false'){
        return (
            <TouchableOpacity style={[styles.ReviewButton, {width: Utill.screen.Screen.customWidth(330)}]}
                onPressIn = {()=>navigation.push('ReviewWrite',{
                    reviewId,
                    storeName,
                    isUpdate : 'false',
                })}>
                <View style={styles.ReviewButtonTextContainer}>
                <Text style={styles.CanWrite}>리뷰 작성하기</Text>
                <Text style={styles.CanWriteUnder}> (7일간 작성 가능)</Text>
                </View>
            </TouchableOpacity>
        )
        }else{
            return(
                <View style={styles.reviewText}>
                    <Text style={styles.CanNotWrite}> 리뷰를 작성하셨습니다 </Text>
                </View>
            )
        }
    }
    else{
        return(
            <View style={styles.reviewText}>
                <Text style={styles.CanNotWrite}> 리뷰 작성기간이 지났습니다 </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ReviewButton:{
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
        width: Utill.screen.Screen.customWidth(330),
        height:  Utill.screen.Screen.customHeight(40),
        justifyContent: 'center',
        alignItems: 'center'
    }
})