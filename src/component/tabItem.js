import React from 'react';
import { View, Image, StyleSheet }from 'react-native';
import { Text } from './common/'


import * as Utill from '../utill'

const TabItem = ({label, tintColor, source }) => {
    return(
        <View style = {styles.container}>
            <View>
            </View>
            <View>
                <Text
                    style={{color:tintColor}}>
                        {label}
                </Text>
            </View>
        </View>
    )
}

export default TabItem;

const styles = StyleSheet.create({
    container : {
        paddingTop : 10,
        alignItems : 'center',
        height : Utill.screen.bottomTabHeight,
    }
})