import React from 'react';
import { View, Text, Image, StyleSheet }from 'react-native';

const TabItem = ({label, tintColor, source }) => {
    return(
        <View style = {styles.container}>
            <View>
            </View>
            <View>
                <Text
                    style={{color:tintColor}}>
                        {label}
                </Text>
            </View>
        </View>
    )
}

export default TabItem;

const styles = StyleSheet.create({
    container : {
        paddingTop : 8,
        alignItems : 'center',
        height : 50,
    }
})