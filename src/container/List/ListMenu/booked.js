import React from 'react';

import { View, StyleSheet, Button } from 'react-native';
import { Text } from '../../../component/common';

export default (props)=>{
    const { navigation } = props;

    return (
        <View style = {styles.container}>
            <Text>예약 완료</Text>
            <Text>예약 시간에 맞춰 꼭 방문해주세요.</Text>
            <View>
                <Text>{navigation.getParam('name')}</Text>
                <View style = {{flexDirection : 'row'}}>
                    <Text>인원</Text>
                    <Text>{navigation.getParam('peopleNumber')}</Text>
                </View>
                <View style = {{flexDirection : 'row'}}>
                    <Text>시간</Text>
                    <Text>{`${navigation.getParam('minutes')}후`}</Text>
                </View>
            </View>
            <Button title = '확인' onPress = {()=>navigation.navigate('ListMenu',{
                isConfirm : true,
            })}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
});