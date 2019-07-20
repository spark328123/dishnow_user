import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

export default (props) =>{
    console.log(props)
    console.log(props.navigation.getParam('type'),props.navigation.getParam('token'));
    return (
        <View>
            <Text>hello</Text>
        </View>
    )
}