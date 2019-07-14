import React, {useState} from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import GoogleMap from '../utill/googlemap';

const TabHome = ()=>{
    const [isPressed, toggle] = useState(false);
    return(
        <View style = {styles.container}>
            <GoogleMap
               toggle = {()=>toggle(isPressed => !isPressed)}
                style = {styles.map} 
            ></GoogleMap>
              <View style = {styles.address}>
                    <Text style ={{fontSize:20,paddingLeft:10}}>hello</Text>
                </View>
            {!isPressed ? ( 
            <View style = {styles.input}>
                <Text>테마</Text>
                <Text>안주가격</Text>
                <Text>인원</Text>
                <Text>출발 예정 시간</Text>
                <Text>식당 찾기</Text>
            </View>
            ):null
            }   
        </View>
    )
} 

export default TabHome;

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    map : {
        flex : 1
    },
    address : {
        justifyContent : 'center',
    },
    input : {
        flex : 2,
        alignItems : 'center',
        justifyContent : 'space-around',
        backgroundColor : '#FFF'
    },
})

