import React from 'react';
import {View,StyleSheet,Alert,Image, FlatList, TouchableOpacity} from 'react-native';
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
        const res= await API.postDNpoint(token,{
            phone,
            name,
            diff,
            type,
        });
        dispatch(User.updatepoint(res.point));
    }

    const _renderItem = ({item})=>{
        return(
            <View style ={styles.container}>
                <View 
                    style = {styles.block}>
                <Image 
                    style = {{width:50,height:50,marginLeft:9,}}
                    source = {{uri : 'icon_x'}}
                    />


                <Text style ={{color : Utill.color.textBlack,fontSize : 14,}}>
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
                <View style = {styles.line}/>
            </View>
            
         )
    }

    return (
        <View style = {styles.container}>
            <View style = {{flexDirection:'row'}}>
               <FlatList renderItem={_renderItem} data={data}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        height: Utill.screen.Screen.customHeight(133),
    },
    button : { 
        width : "30%",
        height:Utill.screen.Screen.customHeight(31),

    },
    line : {
        borderBottomColor: Utill.color.border,
        borderBottomWidth : 1,
    },
    block : {
        flexDirection : 'row', 
        marginRight : 15,
        marginLeft : 15,
        alignContent : 'center',
    },
})