import React from 'react';
import { View } from 'react-native';
import { Text } from '../component/common/'

export default () =>{
    return(
        <View style ={
        {
            flex :1,
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