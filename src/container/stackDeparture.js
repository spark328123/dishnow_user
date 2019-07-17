import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import GoogleMap from '../utill/googlemap';

const StackDeparture = (props)=>{
    const { navigation } = props;
    return(
        <View style = {styles.container}>
            <GoogleMap style={styles.map}
                isPressed = {true}
                navigation = {navigation}
                latitudeDelta = {0.0062}
            ></GoogleMap>
        </View>
    )
} 

export default StackDeparture;

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    map : {
        flex : 1
    },
});