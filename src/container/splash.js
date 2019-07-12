import React, {useEffect} from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default (props) => {
    const {navigation} = props;

    useEffect(()=>{
        navigation.navigate('Login');
    }, []);

    return (
        <View></View>
    );
}