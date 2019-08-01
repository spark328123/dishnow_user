import React from 'react';
import { View, Image, StyleSheet }from 'react-native';
import { Text } from './common/'


import * as Utill from '../utill'
const TabItemMain = ({label, tintColor, source, navigation }) => {
    return (
        <View style={[styles.container]}>
            <View>
                <Image
                    resizeMode = 'contain'
                    style={styles.icon}
                    source={source}/>    
            </View>
        </View>
    )
    
} 

export default TabItemMain;

const styles = StyleSheet.create({
    container : {
        alignItems : 'center',
        justifyContent: 'center',
        width: 120,
        height: Utill.screen.bottomTabHeight,
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 1},
        shadowOpacity: 0.16,
        shadowRadius: 1.00,
        elevation: 3,
        backgroundColor: "white",
        borderRadius: 52
    },
    icon : {
        width : 36,
        height : 36,
    }
})