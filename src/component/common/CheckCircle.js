import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import Button from './Button';

const IconOff = 'icon_check_circle_grey';
const IconOn = 'icon_check_circle_purple';

export default (props) => {

    const {onChange, style} = props;

    

    const [value, setValue] = useState(false);

    
    const _trigger = () => {
        setValue(!value);
    }


    return (
        <Button style={style} onPress={_trigger}>
            <Image style={{width : 22, height : 22,}} source={{uri : value?IconOn:IconOff}} />
        </Button>
    )
}