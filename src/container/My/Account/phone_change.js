import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {NavSwitchHead} from '../../../component/common';
import {handleAndroidBackButton} from '../../../component/common/hardwareBackButton';
import * as Utill from '../../../utill'
export default Phone = ({navigation}) =>{
    _goBack = () => {
        navigation.navigate('Profile')
    }

    handleAndroidBackButton(_goBack);
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
        backgroundColor : Utill.color.white,
    }
})