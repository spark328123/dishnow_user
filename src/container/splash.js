import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import * as API from '../utill/API';
import * as Utill from '../utill';
import { updateLocation, updateAddress } from '../store/modules/maps';
import { Text } from '../component/common/'

export default (props) => {
    let latitude;
    let longitude;
    const _getPosition = async () => {
            await navigator.geolocation.getCurrentPosition((position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            dispatch(updateLocation({ latitude, longitude }));
        });
    }
    const _me = async () => {
        let token = await API.getLocal(API.LOCALKEY_TOKEN);
        console.log(token);
        if (token !== null && token !=='null') {
            navigation.navigate('Main');
        } else {
            navigation.navigate('Login');
        }
    }
    const { navigation } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        _getPosition();
        setTimeout(() => {
            _me();
        }, 1500);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={{uri: "dishnow_logo_purple"}} style={{width:262, height:53}} />
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