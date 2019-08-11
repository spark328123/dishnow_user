import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {NavSwitchHead} from '../../component/common';
import {handleAndroidBackButton} from '../../component/common/hardwareBackButton';
import * as Utill from '../../utill'
export default Point = ({navigation}) =>{
    _goBack = () => {
        navigation.navigate('TabMy')
    }

    handleAndroidBackButton(_goBack);
    return(
        <View style ={styles.container}>
            <NavSwitchHead navigation={navigation} navtitle = {'TabMy'} title={`디나포인트`}/>
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
        backgroundColor : Utill.color.white,
    }
})