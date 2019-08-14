import React from 'react';
import {View, Modal, StyleSheet } from 'react-native';

import Text from './Text';
import Button from './Button';


import * as Utill from '../../utill';

const Alert = (props) => {
    const {visible, onPress,onPressCancel, mainTitle, subTitle, buttonText1,buttonText2,mainTextStyle,subTextStyle} = props;

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
                    <View style = {styles.parent}>
                        <View style = {styles.child}>
                        <Button style={styles.button} onPress={onPress}>
                            <Text style={styles.buttonText}>
                                {buttonText1}
                            </Text>
                        </Button>
                        </View>
                        <View style = {styles.child}>
                        <Button style={styles.button} onPress={onPressCancel}>
                            <Text style={styles.buttonText}>
                                {buttonText2}
                            </Text>
                        </Button>
                        </View>
                    </View>
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
        alignItems : 'center',
    },
    buttonText : {
        color : Utill.color.textBlack,
        fontSize : 16,
        
    },
    parent : {
        width : 262,
        flexDirection : 'row',
    },
    child : {
        width : '50%'
    },

})