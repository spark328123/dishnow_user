import {NavHead} from '../../component/common';
import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
export default myTerms = ({navigation}) => {
    return (
    <View style = {styles.container}>
        <NavHead navigation={navigation} title={`이용약관`}/>
    </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    }
})