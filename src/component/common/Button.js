import React, {Component} from 'react'
import {TouchableOpacity, TouchableNativeFeedback, View} from 'react-native';


export default (props) => {
        return (
                <TouchableOpacity 
                        onPress={props.onPress} 
                        style = {props.style} 
                        hitSlop = {props.hitSlop ? props.hitSlop : {top : 20, bottom : 20, right : 20, left : 15}}>
                        {props.children}
                </TouchableOpacity>
        )
}