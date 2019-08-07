import React, {Component} from 'react';
import {View, Image, StyleSheet, Switch} from 'react-native';

import * as Utill from '../../utill'
import {Button, Text} from '../common';


const PushButton = ({title, source, style,onPress}) => {

    return (
        <Switch 
            thumbColor={Utill.color.onColorBackground}
            trackColor={{false: Utill.color.defaultColor, true: Utill.color.primary1}}
            ios_backgroundColor={{false: Utill.color.defaultColor, true: Utill.color.primary1}}
            onValueChange={()=>onPressCheckBox(i)} 
            value={!item.isHoliday}/>
        
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