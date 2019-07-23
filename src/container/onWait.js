import React, { useState } from 'react';
import { View,
    StyleSheet,
} from 'react-native';
import Images from '../assets/images';

export default (props) =>{
    return(
        <View style = {styles.container}>
            <View
                source ={Images.images.ic_icon_logo}
                text = {'살려줘 제발'}
            >

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingLeft : 20,
        paddingRight : 20,
        justifyContent : 'center',
        alignItems : 'center'
    },
    onwait : {
        width : 50,
        height : 50,
    },
    text : {
        fontSize: 20,
    }
})