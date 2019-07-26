import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default () =>{
    return(
        <View style ={
        {
            flex : 1,
            alignItems : 'center',
            justifyContent : 'center',
        }
        }>
            <Text style ={{
                fontSize : 20,
            }
            }>My</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent:'center',
    }
})