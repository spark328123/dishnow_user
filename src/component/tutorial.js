import React,{useState} from 'react';
import {View,Animated,StyleSheet,Text,Image,TouchableOpacity,Dimensions,ScrollView} from 'react-native';
import * as Utill from '../utill';
import TutoView from './tutoView'
{/* 매장 사진 */}
export default Tutorial = ({navigation}) => {
    const images = [
       'tutorial_1',
       'tutorial_2',
       'tutorial_3',
       'tutorial_4',
    ]

    return(
        
        <View style = {styles.container} >
            <TutoView navigator = {navigation} photos={images}/>
            {/*
            <SliderBox
                images={images}
                ImageComponent={FastImage}
                sliderBoxHeight={200}
                onCurrentImagePressed={index =>
                    console.warn(`image ${index} pressed`)
                }
                parentWidth={200}
            />
            */}
        </View>
    )

}

 const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        zIndex : 1,
      },
    container :{
        flex : 1,
    },
    images : {
        width : "100%",
        height : "100%",
    },
    viewContainer: {
        backgroundColor: '#ffffff',
        flex: 1,
        alignItems: 'center'
    },
    qaContainer:{
        minHeight:(Utill.screen.Screen.customWidth(360)*3/4),
    },
    contentContainer:{
        alignItems:'center',
        minHeight:(Utill.screen.Screen.customHeight(640)*3/4)+30,
    },
    slide: {
        flexDirection: 'column',
        width: Utill.screen.Screen.customWidth(360),
    },
    buttonContainer:{
        width:Utill.screen.Screen.customWidth(360),
        height:Utill.screen.Screen.customHeight(640)/12,
        justifyContent:'center',
        flexDirection:'row'
    },
    previousButton:{
        alignSelf:'flex-start',
        width :Utill.screen.Screen.customWidth(360)/2,
        height:Utill.screen.Screen.customHeight(640)/12
    },
    nextButton:{
        marginTop:0,
        alignSelf:'flex-end',
        width:Utill.screen.Screen.customWidth(360)/2,
        height:Utill.screen.Screen.customHeight(640)/12
    },
 })