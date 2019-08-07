import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {NavHead} from '../../component/common';
export default Point = ({navigation}) =>{
    return(
        <View style ={styles.container}>
            <NavHead navigation={navigation} title={`디나포인트`}/>
            <Text style ={{
                fontSize : 20,
                justifyContent : 'center',
                alignItems : 'center',
            }
            }>디나포인트</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    }
})