import React, {useEffect} from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default (props) => {
    const {navigation} = props;

    useEffect(()=>{
        // 토큰 값을 asyncStorage에 저장 하고 async 본 다음에 있으면 자동 로그인, 없으면 그냥 로그인 페이지로 가게끔
        navigation.navigate('Login');
    }, []);

    return (
        <View></View>
    );
}