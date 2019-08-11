import React,{useState,useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import {NavSwitchHead,TopMenuButton} from '../../component/common'
import {handleAndroidBackButton} from '../../component/common/hardwareBackButton'
import * as Utill from '../../utill'
import Text from '../../component/common/Text'
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
   
    _setIsPressed = (isPressed) => {
        setPressed(isPressed);
        if(isPressed)
            <View style = {styles.txt}></View>
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
                            onPress={()=>Utill.dishnow.callQnA()} 
                        />
                            <View style={{ justifyContent : 'center', alignItems : 'center', }}>
                            
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.lline}/>
                    <View style={styles.child}>
                        <TouchableOpacity
                        >
                        <TopMenuButton 
                            title={`카카오톡 문의`} 
                            source={{uri:'icon_message_purple_helpcenter'}} 
                            color = {Utill.color.primary1}
                            onPress = {()=>Utill.dishnow.openKakaoPlusFreind()}
                        />
                            <View style ={{ justifyContent : 'center', alignItems : 'center', }}>
                            
                            </View>

                        </TouchableOpacity>
                    </View>
                </View>

            <View style={styles.line}/>
            
        <View style = {{paddingRight : 15, paddingLeft : 15}}>

            <Text style = {{marginTop:12,fontWeight :'bold'}}>FAQ</Text>

            <TouchableOpacity style = {styles.qst}
                onPress = { () => _setIsPressed(true)}
            >
                <Text style = {{color : Utill.color.textBlack, fontSize : 14}}>
                [회원정보] 개인이 여러 개의 아이디를 만들 수 있나요?
                </Text>
                <Image
                    style = {styles.img}
                    source = {{uri : "icon_rsquare_bracket_under"}}
                />
            </TouchableOpacity>

            <View style={styles.line}/>

            <TouchableOpacity style = {styles.qst}>
                <Text style = {{color : Utill.color.textBlack, fontSize : 14}}>
                    [서비스] 예약을 취소 시 패널티가 있나요?'
                </Text>
                <Image
                    style = {styles.img}
                    source = {{uri : "icon_rsquare_bracket_under"}}
                />
            </TouchableOpacity> 

            <View style={styles.line}/>

            <TouchableOpacity style = {styles.qst}>
            <Text style = {{color : Utill.color.textBlack, fontSize : 14}}>
                    [서비스] 리뷰를 수정 또는 삭제할 수 있나요?
                </Text>
                <Image
                    style = {styles.img}
                    source = {{uri : "icon_rsquare_bracket_under"}}
                />
            </TouchableOpacity>

            <View style={styles.line}/>

            <TouchableOpacity style = {styles.qst}>
            <Text style = {{color : Utill.color.textBlack, fontSize : 14}}>
                    [서비스] 리뷰등록 포인트는 얼마인가요?
                </Text>
                <Image
                    style = {styles.img}
                    source = {{uri : "icon_rsquare_bracket_under"}}
                />
            </TouchableOpacity>

            <View style={styles.line}/>

            <TouchableOpacity style = {styles.qst}>
            <Text style = {{color : Utill.color.textBlack, fontSize : 14}}>
                [서비스] 최종 예약 시 적립 포인트는 얼마인가요?
            </Text>
            <Image
                style = {styles.img}
                source = {{uri : "icon_rsquare_bracket_under"}}
            />
            </TouchableOpacity>

            <View style={styles.line}/>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : Utill.color.white,
    },
    qst : {
        flexDirection : 'row',
        fontSize : 14,
        color : Utill.color.textBlack,
        alignItems : 'center',
        height : 56,
        justifyContent : 'space-between',
    },
   
    txt : {
        height : 84,
        fontSize : 12,
    },
    img : {
        height : 7,
        width : 12,
    },
    parent : {                         // 디나포인트 + 나의리뷰 두개합친 뷰
        flexDirection : 'row',
        height : 80,
    },
    child : {                          // 디나포인트, 나의리뷰 각각의 뷰 두개
        width : '50%',
        alignItems : 'center',
        justifyContent : 'center',
    }, 
    line : {
        borderBottomWidth: 1,
        borderBottomColor:Utill.color.border,
    },
    lline : {
        borderLeftWidth: 1,
        borderLeftColor: Utill.color.border,
        height : 60,
        alignSelf : 'center',
    },
   
})