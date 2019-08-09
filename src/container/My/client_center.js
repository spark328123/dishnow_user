import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import {NavSwitchHead,TopMenuButton} from '../../component/common'
import {handleAndroidBackButton} from '../../component/common/hardwareBackButton'
import * as Utill from '../../utill'
export default Client = ({navigation}) =>{
    _goBack = () => {
        navigation.navigate('TabMy')
    }

    handleAndroidBackButton(_goBack);

    //press 시 마다 setPressed로 isPressed 값 변경
    const [isPressed,setPressed] = useState(false);
    useEffect(()=>{
        setPressed(isPressed);
    },[])
    console.log('Pressed?',isPressed)
    const _Pressed = () => {
        isPressed = true;
    } 
    _setIsPressed = (isPressed) => {
        setPressed(isPressed);
    }
    return(
        <View style ={styles.container}>
            <NavSwitchHead navigation = {navigation} navtitle = {'TabMy'} title = {'고객센터'}/>
            {/* 상단 버튼 */}
            <View style = { styles.parent }>
                    <View style={styles.child}>
                        <TouchableOpacity
                        >
                        <TopMenuButton 
                            title={`전화문의`} 
                            source={{uri:'icon_call_purple_helpcenter'}}
                            color = {Utill.color.primary1}
                        />
                            <View style={{ justifyContent : 'center', alignItems : 'center', }}>
                            
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.child}>
                        <TouchableOpacity
                        >
                        <TopMenuButton 
                            title={`카카오톡 문의`} 
                            source={{uri:'icon_message_purple_helpcenter'}} 
                            color = {Utill.color.primary1}
                        />
                            <View style ={{ justifyContent : 'center', alignItems : 'center', }}>
                            
                            </View>

                        </TouchableOpacity>
                    </View>
                </View>

            <View style={styles.line}/>
            
        <View style = {{paddingRight : 15, paddingLeft : 15}}>
        
            <View style = {styles.qstTxt}>
                <Text style = {{marginTop:12,fontWeight :'bold'}}>FAQ</Text>
            </View>


            <TouchableOpacity style = {styles.qst}
            onPress = {  async() => { 
                        await _Pressed ?
                            <View style = {styles.cont}>
                                <Text style = {styles.qstTxt}>
                                    awef
                                </Text>  
                            </View>
                            : null
                        }}
            >
                <Text style = {styles.qstTxt}>
                [회원정보] 개인이 여러 개의 아이디를 만들 수 있나요?
                </Text>
                <Image
                    style = {styles.img}
                    source = {{uri : "icon_rsquare_bracket_under"}}
                />
            </TouchableOpacity>
            
            <TouchableOpacity style = {styles.qst}>
                <Text style = {styles.qstTxt}>
                    [서비스] 예약을 취소 시 패널티가 있나요?'}
                </Text>
                <Image
                    style = {styles.img}
                    source = {{uri : "icon_rsquare_bracket_under"}}
                />
            </TouchableOpacity> 

            <TouchableOpacity style = {styles.qst}>
                <Text style = {styles.qstTxt}>
                    [서비스] 리뷰를 수정 또는 삭제할 수 있나요?
                </Text>
                <Image
                    style = {styles.img}
                    source = {{uri : "icon_rsquare_bracket_under"}}
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.qst}>
                <Text style = {styles.qstTxt}>
                    [서비스] 리뷰등록 포인트는 얼마인가요?
                </Text>
                <Image
                    style = {styles.img}
                    source = {{uri : "icon_rsquare_bracket_under"}}
                />
            </TouchableOpacity>
            
            <TouchableOpacity style = {styles.qst}>
            <Text style = {styles.qstTxt}>
                [서비스] 최종 예약 시 적립 포인트는 얼마인가요?
            </Text>
            <Image
                style = {styles.img}
                source = {{uri : "icon_rsquare_bracket_under"}}
            />
        </TouchableOpacity>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    qst : {
        flexDirection : 'row',
        fontSize : 14,
        color : Utill.color.textBlack,
    },
    qstTxt : {
        fontSize : 14,
        marginRight : 20,
        marginBottom : 20,
    },
    img : {
        height : 7,
        width : 12,
    },
    cont : {
        height:50,
        fontSize : 16,
    },
    parent : {                         // 디나포인트 + 나의리뷰 두개합친 뷰
        flexDirection : 'row',
        height : 90,
    },
    child : {                          // 디나포인트, 나의리뷰 각각의 뷰 두개
        width : '50%',
        alignItems : 'center',
        justifyContent : 'center',
    }, 
    menu : {
        flexDirection : 'row',
    },
    line : {
        borderBottomWidth: 1,
        borderBottomColor:Utill.color.border,
    },
    lline : {
        borderTopWidth : 1,
        borderBottomColor:Utill.color.border,
    },
   
})