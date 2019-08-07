import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import Button from './Button';

const IconOff = 'icon_check_circle_grey';
const IconOn = 'icon_check_circle_purple';

export default CheckCircle = (props) => {

    const {onPress, value, style} = props;

    return (
        <Button style={style} onPress={onPress}>
            <Image style={{width : 22, height : 22,}} resizeMode={'cover'} source={{uri : value?IconOn:IconOff}} />
        </Button>
    );
}
