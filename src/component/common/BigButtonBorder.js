import React, {useState, useEffect} from 'react';
import {TouchableHighlight, StyleSheet, View} from 'react-native';
import Text from './Text';
import * as Utill from '../../utill';

//테두리, 텍스트만 보라색
const BigButton = (props) => {

    const {onPress, disabled=false,style} = props;
    const [pressed, setPressed] = useState(false);

    const _onHide = () => {
        setPressed(true);
    }
    const _onShow = () => {
        setPressed(false);
    }
    
    if (disabled)  
        return (
            <View style = {[styles.button, {borderColor : Utill.color.defaultColor}]} >
                <Text style={[styles.title, {color : Utill.color.defaultColor}]}>
                    {props.title}
                </Text>
            </View>
        )
    return (
        <TouchableHighlight
            activeOpacity={1}
            style = {style? style : styles.button }
            underlayColor = {Utill.color.secondary2}
            onPress = {onPress}
            onHideUnderlay = {_onHide}
            onShowUnderlay = {_onShow}
        >
            <Text style={[styles.title, {color : Utill.color.primary1}]}>
                {props.title}
            </Text>
        </TouchableHighlight>
    )
}
export default BigButton;

const styles = StyleSheet.create({

    button : {
        borderRadius : 25,
        width : 330,
        height : 40,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : Utill.color.onColorBackground,
        borderWidth : 1,
        borderColor : Utill.color.primary1,

    },
    title : {
        fontSize : 16,
        color : Utill.color.primary1,
        fontFamily : 'NanumSquareOTFR',
    },
    titleDisable : {
        fontSize : 16,
        color : Utill.color.defaultColor,
        fontFamily : 'NanumSquareOTFR',
    }
})