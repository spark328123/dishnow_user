import React, { Component } from 'react';
import { View,  Image, StyleSheet } from 'react-native';
import { Button, CheckCircle, Text } from '../common';


export default (props) => {
    const { style, title, titleStyle, value, onChange, onPressBracket=null} = props;
    console.log(onPressBracket);
    return(
        <View style={[style, styles.container]}>
            <CheckCircle style={styles.check} value = {value} onChange = {onChange}/>
            <Text style={[titleStyle, styles.title]}>{title}</Text>
            {onPressBracket!==null && 
                <Button
                    style={styles.bracket} source={{uri: 'icon_back_button'}}
                >
                  
                </Button>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
    },
    title : {
        flex : 1,
        marginLeft : 11.5,
    },
    bracket : {
        width : 8.9,
        height : 15,
    },
});