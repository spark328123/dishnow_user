import React from 'react';
import {View, Modal, StyleSheet } from 'react-native';

import Text from './Text';
import Button from './Button';


import * as Utill from '../../utill';

const Alert = (props) => {
    const {visible, onPress,onPressCancel, mainTitle, subTitle, buttonText1,mainTextStyle,subTextStyle} = props;

    return (
        <Modal
        style ={styles.container}
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onPress}
        >
            <View style={styles.container}>
                <View style={styles.messageArea}> 
                    <Text style={mainTextStyle}>
                        {mainTitle}
                    </Text>
                    <Text style={subTextStyle}>
                        {subTitle}
                    </Text>
                    <Button style={styles.button} onPress={onPressCancel}>
                            <Text style={styles.buttonText}>
                                {buttonText1}
                            </Text>
                    </Button>
                </View>
            </View>
        </Modal>
    )
}

export default Alert;

const styles = StyleSheet.create({
    container : {
        height : Utill.screen.screenHeight,
        backgroundColor : Utill.color.modalBackCover,
        justifyContent : 'center',
        alignItems : 'center',
    },
    messageArea : {
        backgroundColor : Utill.color.onColorBackground,
        borderRadius : 20,
        padding : 20,
        paddingBottom : 20,
        alignItems : 'center',
    },
    
    button : {
        width : 262,
        alignSelf : 'center',
        justifyContent : 'center',
    },
    buttonText : {
        color : Utill.color.primary1,
        fontSize : 16,
        alignSelf : 'center',
        justifyContent : 'center',
    },
    parent : {
        width : 262,
        flexDirection : 'row',
        alignItems : 'center',
    },
})