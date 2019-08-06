import React, { Component } from 'react';
import { View,  Image, StyleSheet } from 'react-native';
import { Button, CheckCircle, Text } from '../common';


export default TermsCheck = ({ style, title, titleStyle, value, onChange, view}) => {
    console.log('view',view);
    return(
        <View style={[style, styles.container]}>
            <CheckCircle style={styles.check} value = {value} onChange = {onChange}/>
            <Text style={[titleStyle, styles.title]}>
                {title}
            </Text>
            {/* {onPressBracket!==null && 
                <Button
                    onPress = {()=>navigation.push('webView',{view})}
                >
                    <Image style={styles.bracket} source={{uri: 'icon_rsquare_bracket'}}/>
                </Button>
            } */}
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