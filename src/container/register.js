import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

import * as API from '../utill/API';

const Register = (props) =>{

    const _phoneAuth = async() =>{
        const phoneRes =  await API.phoneAuth({phone : '01083278936'});
        console.log(phoneRes);
    }
    console.log(props)
    console.log(props.navigation.getParam('type'),props.navigation.getParam('token'));
    //props.navigation.navigate('Main');
    
    return (
        <View>
            <Text>hello</Text>
        </View>
    )
}

export default Register;

