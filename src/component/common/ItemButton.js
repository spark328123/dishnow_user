import React from 'react';
import {View,StyleSheet,Alert,Image, FlatList, ScrollView} from 'react-native';
import {Text,BigButtonBorder} from '../../component/common'
import * as User from '../../store/modules/user';
import CustomAlert from '../../component/common/CustomAlert';
import * as API from '../../utill/API';
import * as Utill from '../../utill';
import { useDispatch } from 'react-redux';


export default ItemButton = (props)=> {
   const { point ,phone,data,name,diff,type } = props;
   const dispatch = useDispatch();

   const _usePoint = async({name})=>{
       console.log(parseInt(point));
       const token = await API.getLocal(API.LOCALKEY_TOKEN);
       if(point<parseInt(diff)){
           alert('보유 포인트가 부족하여 교환이 어려워요!\n디쉬나우를 이용해 포인트를 모아보세요!');
           return;
       }
       const res = await API.postDNpoint(token,{
           phone,
           name,
           diff,
           type,
       });
       
       dispatch(User.updatepoint(res.point));
       alert('2~3일 안에 카카오톡 선물하기로 개별 발송해드립니다.');
   }

    const _renderItem = ({item})=>{
        return(
            <ScrollView style ={styles.container}>
                <View    
                    style = {styles.block}>
                
                    <View style = {{width:'50%',justifyContent : 'center'}}>
                        <Image 
                            style = {styles.image}
                            source = {item.image}
                            />
                    </View>

                    <View style = {{width:'50%',justifyContent : 'center'}}>
                        <View style = {{flexDirection : 'column'}}>
                            <Text style ={{color : Utill.color.textBlack,fontSize : 14,marginBottom:12,}}>
                                {`${item.name}`}
                            </Text>
                            <BigButtonBorder
                                onPress = {()=>_usePoint(item)}
                                style = {styles.button}
                                title = {'교환하기'}
                                disabled = {false}
                            >
                            </BigButtonBorder>
                        </View> 
                    </View>
                </View>

                <View style = {styles.line}/>

            </ScrollView>
            
         )
    }

    return (
        <View style = {styles.container}>
            <View style = {{flexDirection:'row'}}>
               <FlatList removeClippedSubviews={true} renderItem={_renderItem} data={data}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    button : { 
        width :Utill.screen.Screen.customHeight(110),
        height:Utill.screen.Screen.customHeight(31),
        borderRadius : 25,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : Utill.color.onColorBackground,
        borderWidth : 1,
        borderColor : Utill.color.primary1,
    },
    image : {
        height :Utill.screen.Screen.customHeight(90),
        width : Utill.screen.Screen.customWidth(90),
        alignSelf : 'center',
    },
    line : {
        borderBottomColor: Utill.color.border,
        borderBottomWidth : 1,
    },
    block : {
        height: Utill.screen.Screen.customHeight(133),
        flexDirection : 'row', 
        marginRight : 15,
        marginLeft : 15,
    },
})