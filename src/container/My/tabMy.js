import React, { useState } from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import LogOut from './logout'
import {Button, BigButtonColor} from '../../component/common'
import * as Color from '../../utill/color'
const TabMy = ({navigation}) => { 

    _logOut = () => {
        <LogOut/>
    }
    return (
        <View
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            
            <TouchableOpacity
                onPress = {()=>navigation.navigate('Profile')}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    끄덕이는 씨발
                </Text >
            </TouchableOpacity>

            <View style = { styles.txt }>
                <TouchableOpacity
                    onPress = {()=>navigation.navigate('Point')}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                        디나포인트
                    </Text >
                </TouchableOpacity>

                <TouchableOpacity
                    onPress = {()=>navigation.navigate('Review')}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                        나의 리뷰
                    </Text >
                </TouchableOpacity>
            </View>

           <TouchableOpacity
                onPress = {()=>navigation.navigate('Notice')}
           >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    공지사항
                </Text >
            </TouchableOpacity>

            <TouchableOpacity
                onPress = {()=>navigation.navigate('webView')}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    이용약관
                </Text >
            </TouchableOpacity>

            <TouchableOpacity
                onPress = {()=>navigation.navigate('Client')}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    고객센터
                </Text >
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    푸쉬알림
                </Text >
            </TouchableOpacity>


            <TouchableOpacity
                onPress = {()=>
                Alert.alert(
                    '로그아웃',
                    '로그아웃 하시겠습니까?',
                    [
                        {
                            text: '취소',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: '확인', 
                            onPress: () => console.log('OK Pressed')},
                    ],
                        {cancelable: false},
                    )
               }
             >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    로그아웃
                </Text >
              
            </TouchableOpacity>
            
        </View> 
    )
}

export default TabMy;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    textTitle: {
        fontSize: 14,
        marginBottom: 20,
    },
    textInput: {
        fontSize: 16,
        marginBottom: 29,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    txt : {
        flexDirection : 'row',
        height : 50,
        width : 200,
    },

})