import React from 'react';
import {Text, Platform} from 'react-native';

const DefaultText = (props) => {
    const defaultStyle = Platform.select({
        ios : {
            fontFamily : 'AppleSDGothicNeo-Regular',
        },
        android : {
            fontFamily : 'roboto',
            includeFontPadding : false
        }
    });

    const {children, style} = props;

    return (
        <Text {...props}
            allowFontScaling = {false}
            style = {[defaultStyle, style]}
        >
            {children}
        </Text>
    )
}
export default DefaultText;