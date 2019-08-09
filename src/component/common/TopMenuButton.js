import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

import * as Utill from '../../utill'
import {Button, Text} from '../common';


const TopMenuButton = ({title, source, style,onPress,color}) => {

    return (
        <Button style={[style, styles.container]} onPress={onPress}>
            <Image
                resizeMode={'contain'}
                style = {styles.icon}
                source={source}
            /> 
                               
            <View>
                <Text style = {!color ? styles.text : styles.ptext}>
                    {title}
                </Text>
            </View>
        </Button>
    )

}

export default TopMenuButton; 

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        
    },
    iconArea : {
        width : 15,
        height : 11,
    },
    icon : {
        width : 15,
        height : 15,
        marginRight : 12,
    },
    text : {
        fontSize : 16,
        fontFamily : "NanumSquareOTFR",
        color : Utill.color.textBlack,
    },
    ptext : {
        fontSize : 16,
        fontFamily : "NanumSquareOTFR",
        color : Utill.color.primary1,
    }
})