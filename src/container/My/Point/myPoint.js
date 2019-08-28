import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Button,ScrollView } from 'react-native';
import { connect, dispatch } from 'react-redux';
import * as API from '../../../utill/API';
import { Text,NavSwitchHead,BigButtonBorder,CustomAlert1 } from '../../../component/common';
import {handleAndroidBackButton} from '../../../component/common/hardwareBackButton';
import * as Utill from '../../../utill'
const MyPoint = (props)=>{
    
    const { navigation, point } = props;
    const [ data, setData ] = useState([]); 
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    
    const _onPressAlertOk = () => {
        setIsAlertVisible(false);
    }

    _goBack = () => {
        navigation.navigate('TabMy')
    }
    handleAndroidBackButton(_goBack);
    const _renderItem = ({item}) =>{
        return (
            <View style = {{height : 79}}>
                <View style = {{flexDirection : 'row', justifyContent :'space-between',marginBottom:7,marginTop:12,}}>
                    <Text style = {{fontSize : 14,color : Utill.color.textBlack}}>
                        {item.name}
                    </Text>
                    <Text style = {{color : item.type=='save'? Utill.color.primary1 : Utill.color.textBlack}}>
                        {`${item.diff}원 ${item.type=='save'?'적립':'사용'}`}
                    </Text>
                </View>
                <Text style = {{color : Utill.color.textBlack,marginBottom:15}}>
                    {
                        `${parseInt(item.createdAt.substring(0,4))}.${item.createdAt.substring(5,7)}.${item.createdAt.substring(8,10)}`+
                        `(${parseInt(item.createdAt.substring(0,4)) + 1}.${item.createdAt.substring(5,7)}.${item.createdAt.substring(8,10)}소멸)`
                    }
                </Text>
                <View style = {styles.line}></View>
            </View>
        );
    };

    const _getDNpoint = async()=>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.getDNpoint(token);
        console.log(res);
        setData(res);
    }

    useEffect(()=>{
        _getDNpoint();
    },[])

    return (
        <View style = {styles.container}>
            <NavSwitchHead navigation = {navigation} navtitle = {'TabMy'} title ={'디나포인트'}/>
            <View style = {styles.upper}>  
                <Text 
                    style = {styles.mainTxt}>
                    {`보유포인트 ${point}원`}
                </Text>
                <Text
                    style = {styles.subTxt}
                >
                    5,000원 이상 100원 단위로 사용 가능합니다.
                </Text>
                <Text
                    style = {styles.subTxt}
                >
                    {`이번 달 소멸 예정 포인트는 0원 입니다.`}
                </Text>
                <BigButtonBorder  
                    style = {styles.button}
                    title = '사용하기' 
                    onPress = {()=>navigation.navigate('Point')}
                />
            </View>
            <View style = { styles.greyArea}/>
            <View style = {styles.lower}>
                <Text style = {{
                    fontSize : 16, 
                    fontWeight : 'bold', 
                    color:Utill.color.itemTitle,
                    marginBottom : 14,
                    marginTop : 18,
                }}>
                    포인트 내역
                </Text>
                <ScrollView  >
                    <FlatList removeClippedSubviews={true} data = {data} renderItem = {_renderItem}/>
                    <View style = {{height:80}}></View>
                </ScrollView>
                
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        point : state.User._root.entries[1][1],       
    }
}

export default connect(mapStateToProps)(MyPoint);

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : Utill.color.whtie
    },
    greyArea : {
        height : '2%',
        alignContent : 'center',
        backgroundColor : Utill.color.border,
    },
    upper : {
        height : '33%',
        alignContent : 'center',
        marginLeft:15,
        marginRight : 15,
        backgroundColor : Utill.color.white,
    },
    lower : {
        height : '61%',
        alignContent : 'center',
        marginLeft:15,
        marginRight : 15,
        backgroundColor : Utill.color.white,
    },
    line : {
        borderBottomWidth: 1,
        borderBottomColor:Utill.color.border,
    },
    mainTxt : {
        alignSelf:'center',
        fontSize : 24, 
        fontWeight : 'bold', 
        color:Utill.color.textBlack,
        marginTop : 14,
        marginBottom : 31,
        backgroundColor : Utill.color.white,
    },
    subTxt : {
        alignSelf:'center',
        fontSize : 14, 
        color:Utill.color.itemTitle,
        marginBottom : Utill.screen.Screen.customHeight(12),
    },
    button : {
        borderRadius : 25,
        width : '100%',
        height : Utill.screen.Screen.customHeight(40),
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : Utill.color.onColorBackground,
        borderWidth : 1,
        borderColor : Utill.color.primary1,
    },
    pointCont : {
        height : 60,

    }
});