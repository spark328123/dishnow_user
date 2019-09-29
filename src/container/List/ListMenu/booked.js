import React, {memo, useEffect, useState} from 'react';
import {View, StyleSheet, Image, ImageBackground, ActivityIndicator,BackHandler} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { Text,BigButtonBorder } from '../../../component/common';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../../../component/common/hardwareBackButton';
import * as Utill from '../../../utill'
import * as API from '../../../utill/API';

export default (props)=>{
    const { navigation } = props;
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    let minutes = navigation.getParam('minutes');
    const data = navigation.getParam('data');

    const _reservation_confirm = async()=>{
        console.log("데이터는~"+data);
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.reservation_confirm(token,{
            reservationId : data.reservationId,
            storeId : data.storeId,
        });
        console.log(res);
        setIsLoaded(true);
    }

    useEffect(()=> {
        _reservation_confirm();
    },[])

    _goBack = () => {
        navigation.navigate('ListMenu',{
            isConfirm : true,
        })
    }

    handleAndroidBackButton(_goBack)
    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Image style={styles.logo} resizeMode={'contain'} source={{uri : 'icon_logo_purple_main'}} />
                <Text style={styles.title}>{'예약 완료'}</Text>
            </View>

            <Text style={styles.subTitle}>{'예약 시간에 맞춰 꼭 방문해주세요.'}</Text>

            
            <View style={{flex:1, justifyContent:'center'}}>
                {!isLoaded && <ActivityIndicator size="large" color="#0000ff" />} 
                {isLoaded &&
                    <ImageBackground
                        style={styles.infoContainer}
                        source={{uri:'bookedinfocard'}}
                    >
                        <View style={styles.nameArea}>
                            <Text style={styles.name}>{data.name}</Text>
                        </View>

                        <View style={{flex:1, justifyContent : 'center'}}>
                            <View style={styles.infoArea}>

                                <View style={styles.infoLine}>
                                    <Text style={styles.infoTitle}>{'인원'}</Text>
                                    <Text style={styles.infoData}>{navigation.getParam('peopleNumber')}</Text><Text style={styles.infoData}>명</Text>
                                </View>

                                <View style={[styles.infoLine, {marginTop:17}]}>
                                    <Text style={styles.infoTitle}>{'출발 예정 시간'}</Text>
                                    <Text style={styles.infoData}>{`${minutes[0]}분 후`}</Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                }
            </View>
            <BigButtonBorder title={'확인'} onPress={()=>navigation.navigate('ListMenu',{
                isConfirm : true,
            })}  />
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        paddingTop : Utill.screen.statusbarHeight,
        flex : 1,
        alignItems : 'center',
        paddingBottom : 45,
    },
    titleArea : {
        flexDirection : 'row',
        marginTop : 65,
    },
    logo : {
        width : 45,
        height : 45,
    },
    title : {
        marginLeft : 18,
        fontSize : 42,
        color : Utill.color.primary1,
    },
    subTitle : {
        marginTop : 49,
        fontSize : 16,
        color : Utill.color.itemTitle,
    },
    infoContainer : {
        width : 280,
        height : 178,
        paddingHorizontal : 34,
        paddingVertical : 9,
        alignItems : 'center',
    },
    nameArea : {
        alignItems : 'center',
        justifyContent : 'center',
        width : 194,
        borderBottomWidth : 1,
        borderBottomColor : Utill.color.border,
        paddingVertical : 20
    },
    name : {
        fontSize : 18,
        fontWeight : 'bold',
        color : Utill.color.textBlack,
    },
    infoArea : {
        marginVertical : 20,
    },
    infoLine : {
        flexDirection : 'row',
    },
    infoTitle : {
        fontSize : 14,
        color : Utill.color.textBlack,
    },
    infoData : {
        marginLeft : 15,
        fontSize : 14,
        fontWeight : 'bold',
        color : Utill.color.textBlack,
    },
});
