import React,{useState,useEffect} from 'react';
import { ScrollView,View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import {NavSwitchHead,TopMenuButton} from '../../component/common'
import {handleAndroidBackButton} from '../../component/common/hardwareBackButton'
import * as Utill from '../../utill'
import Text from '../../component/common/Text'
export default Client = ({navigation}) =>{
    _goBack = () => {
        navigation.navigate('TabMy')
    }

    handleAndroidBackButton(_goBack);

    const [data,setData] = useState([
        {
            id : 0,
            isPressed : false,
            title : '[회원정보] 개인이 여러 개의 아이디를 만들 수 있나요?',
            content : '디쉬나우는 한 사람이 여러 개의 아이디를 만드는 것을 허용합니다.단, 개별 아이디에 적립된 포인트는 양도가 불가합니다.또한,'+ 
            '두 가지의 간편 로그인을 통하여 가입을 하게 될 경우두 아이디의 연동은 어려우니 이용하시는데 불편 없으시길 바랍니다.',
        },
        {
            id : 1,
            isPressed : false,
            title : '[서비스] 예약 취소는 어떻게 하나요?',
            content : '디쉬나우 실시간 예약 특성상 예약완료 후에는 업장에서 다른 손님들이 예약을 할 수 없기 때문에 업주님들의 손실이 불가피합니다.'+
            '따라서 예약취소 불가를 원칙으로 하고 있습니다.예약완료 시 신중히 선택해 주시기 바랍니다.기타 통보 없이 업장을 방문하지 않는 경우는 '+
            '‘No-Show’로 간주되어 업장에게 금전적인 피해를 줄 수 있습니다.디쉬나우는 이에 대해 강력하게 대응하고 있습니다.신규 회원가입 이후 3회 이상의 노쇼를 '+
            '하는 유저는 디쉬나우의 블랙리스트에 등재되고, 계정이 정지되어 해당 개인 정보를 통해서는 차후 디쉬나우를 이용할 수 없게 됩니다.불가피하게 예약을 지키기 '+
            '어려운 경우에는 업장에 개인적인 연락을 통해 양해를 구하시고, 디쉬나우 카카오톡 문의를 통해 예약정보와 취소사유를 통보해주시기 바랍니다.'+
            '자사에서는 업장과의 연락과 사유를 바탕으로 조치를 취하고 있습니다.예약문화는 업장과의 약속과 예의입니다.국내 음식점 노쇼는 연간 매출액 손실이 '+
            '1.8조원이 넘어가고 있는 사회적 문제입니다.건전한 예약문화는 외식 문화 발전의 초석입니다.출처:http://www.korea.kr/news/reporterView.do?newsId=148815794',
        },
        {
            id : 2,
            isPressed : false,
            title : '[서비스] 리뷰를 수정 또는 삭제할 수 있나요?',
            content : 'MY -> 나의 리뷰’ 에서 리뷰 수정 및 삭제가 가능합니다.'
        },
        {
            id : 3,
            isPressed : false,
            title : '[서비스] 리뷰등록 포인트는 얼마인가요?',
            content : '리뷰 등록을 통한 디나포인트는 500원씩 적립됩니다.디나포인트는 5,000원 이상 100원 단위로 사용 가능합니다.디나포인트의 유효기간은 1년입니다.',
        },
        {
            id : 4,
            isPressed : false,
            title : '[서비스] 최종 예약 시 적립 포인트는 얼마인가요?',
            content : '예약 완료 후, 사용자 방문을 확인한 업장에서 ‘디쉬나우 사장님’ 어플에서 ‘도착’버튼 누르게 되면 500원이 적립됩니다.‘디쉬나우 사장님’ 어플에서 ‘도착’버튼을 누르지 않게 되면 적립이 되지 않으니,' +
            ' 이용하시는데 불편 없으시길바랍니다.디나포인트는 5,000원 이상부터 100원 단위로 사용 가능합니다.디나포인트의 유효기간은 1년입니다'
        },
    ]);

    const _setIsPressed = ({id})=>{
        setData(data.map(item => 
            item.id===id ? {...item,isPressed:!item.isPressed} : {...item,isPressed:false}));
    }

    const _renderItem = ({item}) => {
        return (

            <View style = {styles.container}>
                <TouchableOpacity onPress = {()=>_setIsPressed(item)}>
                    <View style= {{padding : 15}}>
                        <View style ={{flexDirection : 'row',flex : 1, justifyContent : 'space-between', alignItems : 'center'}}>
                            <Text style = {{fontSize : 16}}>
                                {item.title}
                            </Text>
                            <Image 
                                style = {{width : 12, height : 7}} 
                                source = {!item.isPressed?{uri : 'icon_rsquare_bracket_under'}:{uri:'icon_rsquare_bracket_upper'}}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                {item.isPressed?(
                  <View style= {{padding : 15, backgroundColor : Utill.color.border}}>
                      <Text style = {{fontSize : 15}}>
                          {item.content}
                      </Text>
                      </View>  
                ):null}
            </View>
        )
    }    

    return(
        <View style ={styles.container}>
            <NavSwitchHead navigation = {navigation} navtitle = {'TabMy'} title = {'고객센터'}/>
            {/* 상단 버튼 */}
            <View style = { styles.parent }>
                <View style={styles.child}>
                    <TopMenuButton 
                        title={`전화문의`} 
                        source={{uri:'icon_call_purple_helpcenter'}}
                        color = {Utill.color.primary1}
                        onPress={()=>Utill.dishnow.callQnA()} 
                    />
                </View>
                <View style = {styles.lline}/>
                <View style={styles.child}>
                    <TopMenuButton 
                        title={`카카오톡 문의`} 
                        source={{uri:'icon_message_purple_helpcenter'}} 
                        color = {Utill.color.primary1}
                        onPress = {()=>Utill.dishnow.openKakaoPlusFreind()}
                    />
                </View>
            </View>

            <View style={styles.line}/>
            <View style = {{flexGrow: 0,paddingRight : 15, paddingLeft : 15}}>
            <Text style = {{marginTop:12,fontWeight :'bold'}}>FAQ</Text>
                <FlatList data={data} renderItem = {_renderItem}/>
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