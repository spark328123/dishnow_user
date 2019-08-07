import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {NavHead} from '../../component/common'
export default Client = ({navigation}) =>{
    //press 시 마다 setPressed로 isPressed 값 변경
    const [isPressed,setPressed] = useState(false);
    useEffect(()=>{
        setPressed(isPressed);
    },[])
    console.log('Pressed?',isPressed)
    const _Pressed = () => {
        isPressed = true;
    }
    return(
        <View style ={styles.container}>
            <NavHead navigation = {navigation} title = {'고객센터'}/>
            <View style ={styles.qst}>
                <TouchableOpacity
                   >
                    <Text style = {styles.qstTxt}>
                        전화문의
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style = {styles.qstTxt}>
                        카카오톡 문의
                    </Text>
                </TouchableOpacity>
            </View>
        <View style = {styles.qstTxt}>
            <Text>FAQ</Text>
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
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    qst : {
        flexDirection : 'row',
        fontSize : 14,
        marginRight : 20,
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
    }
   
})