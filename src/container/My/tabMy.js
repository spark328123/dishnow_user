import React, { useState } from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    ScrollView,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';
import {Button, BigButtonColor} from '../../component/common'

const TabMy = ({navigation}) => { 

    _logOut = () => {
        <Alert>
            
        </Alert>
    }
    return (
        <View
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            
            <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    끄덕이는 씨발
                </Text >
            </TouchableOpacity>


            <View
                style = {{
                    height : 40,
                    width : 200,
                    flexDirection : 'row',
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    디나포인트
                </Text >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    나의리뷰
                </Text>
            </View>


           <TouchableOpacity
                onPress = {()=>navigation.navigate('')}
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

            <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    고객센터
                </Text >
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    푸쉬알림sdfvs
                </Text >
            </TouchableOpacity>


             <TouchableOpacity
               // onPress = {}
             >
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginRight:20,marginTop:30}}>
                    로그아웃
                </Text >
              
            </TouchableOpacity>
  <Image source = {{uri : 'icon_add_photo',isStatic:true}}
        style = {{width:50,height:50}}/>
            <BigButtonColor     
                title='이용약관' 
                disabled = {false}/>
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
        marginBottom: 12,
    },
    textInput: {
        fontSize: 16,
        marginBottom: 29,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    }
})