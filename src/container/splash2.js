import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

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
            <ActivityIndicator/>
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