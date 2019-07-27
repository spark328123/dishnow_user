import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default Notice = () =>{
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
            }>공지사항</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent:'center',
    }
})