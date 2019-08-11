import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {NavSwitchHead} from '../../../component/common';
export default Phone = ({navigation}) =>{
    return(
        <View style ={styles.container}>
            <NavSwitchHead navigation={navigation} navtitle = {'Profile'} title={`휴대폰 번호 변경`}/>
            <Text style ={{
                fontSize : 20,
                justifyContent : 'center',
                alignItems : 'center',
            }
            }>휴대폰 번호 변경</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    }
})