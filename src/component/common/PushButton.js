import React, {Component,useState} from 'react';
import {View, Image, StyleSheet,Switch} from 'react-native';

import * as Utill from '../../utill'
import {Button, Text} from '../common';


const PushButton = ({title, source, style,onValueChange,value}) => {
    return (
        <View style={[style, styles.container]}>
            <Image
                resizeMode={'contain'}
                style = {styles.icon}
                source={source}
            /> 
                               
            <View>
                <Text style = {styles.text}>
                    {title}
                </Text>
            </View>
            <Switch
                value = {value}
                onValueChange = {onValueChange}
                style = {{width : '78%'}}
                thumbColor={Utill.color.white}
                trackColor={{false: Utill.color.defaultColor, true: Utill.color.primary1}}
                ios_backgroundColor={{false: Utill.color.defaultColor, true: Utill.color.primary1}}
            />
        </View>
    )
}

export default PushButton; 

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
        marginRight : 15,
        
    },
    text : {
        fontSize : 16,
        color : Utill.color.textBlack,
    }
})