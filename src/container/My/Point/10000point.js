import React from 'react';
import {View,StyleSheet,Alert,Image} from 'react-native';
import MyPoint from '../../../store/modules/myPoint'
import {Text,Button} from '../../../component/common'
import * as User from '../../../store/modules/user'
export default Point2 = ()=> {
    return (
        <View style = {styles.container}>
            <View style = {{flexDirection:'row'}}>
                <Image 
                    style = {{width:50,height:50}}
                    source = {{uri : 'icon_x'}}
                />

                <Button 
                    style = {styles.btnStyle}
                    onPress = {()=>Alert.alert('hi!')}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginRight : 15,
        marginLeft : 15,
    },
    btnStyle : {
        width :110,
        height : 31,
    }
})