import React, {useState} from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import GoogleMap from '../utill/googlemap.js';
import * as Utill from '../utill';

const StackDeparture = (props)=>{
    const { navigation } = props;
    return(
        <View style = {styles.container}>
            <GoogleMap style={styles.map}
                isPressed = {true}
                navigation = {navigation}
            ></GoogleMap>
            <View style = {styles.address}>
                    <Text style ={{fontSize:15,padding:10}}>출발지 : 찾는 중 ...</Text>
            </View>
            <View style = {styles.departure}>
                <Text style = {styles.departureText}>
                    출발지로 설정
                </Text>

            </View>
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
    address : {
        justifyContent : 'center',
    },
    input : {
        flex : 2,
        alignItems : 'center',
        justifyContent : 'space-around',
        backgroundColor : '#FFF'
    },
    departure : {
        height : Utill.screen.bottomTabHeight,
        backgroundColor : '#000',
        alignItems : 'center',
        justifyContent : 'center'
    },
    departureText : {
        fontSize : 20,
        color : 'white',
    }
})

