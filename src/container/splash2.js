import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import * as API from '../utill/API';
import * as Utill from '../utill';
import { updateLocation, updateAddress } from '../store/modules/maps';
import { Text } from '../component/common/'

export default (props) => {

    const _me = async () => {
        navigation.navigate('TabBooked');
    }
    const { navigation } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        _me();
    }, []);

    return (
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})