import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

import * as Utill from '../../utill'
import {Button, Text} from '../common';


const MenuButton = ({title, source, style,onPress}) => {

    return (
        <Button style={[style, styles.container]} onPress={onPress}>
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
        </Button>
    )

}

export default MenuButton; 

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