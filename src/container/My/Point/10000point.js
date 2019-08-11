import React from 'react';
import {View,StyleSheet,Alert,Image, FlatList, TouchableOpacity} from 'react-native';
import MyPoint from '../../../store/modules/myPoint'
import {Text,Button,ItemButton10000} from '../../../component/common'
import * as User from '../../../store/modules/user';
import CustomAlert from '../../../component/common/CustomAlert';
import * as API from '../../../utill/API';
import { useDispatch } from 'react-redux';

const diff = '10000';
const type = 'use';

export default Point2 = (props)=> {
    const { point ,phone } = props;
    const dispatch = useDispatch();

    const _usePoint = async({name})=>{
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

    const data = [
        {
            image : {uri : 'icon_x'},
            name : '[CGV]'
        },
        {
            image : {uri : 'icon_x'},
            name : '[스타벅스]'
        },
        {
            image : {uri : 'icon_x'},
            name : '[컬쳐랜드]'
        }
        
    ]

    const _renderItem = ({item})=>{
        return(
            <View>
                <View style ={{flexDirection:'row'}}>
                    <Image 
                        style = {{width:50,height:50}}
                        source = {{uri : 'icon_x'}}
                        />
                    <Text>{item.name}</Text>
                </View>
                <TouchableOpacity
                    onPress = {()=>_usePoint(item)}>
                    <Text>교환하기~</Text>
            </TouchableOpacity>
         
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
        marginRight : 15,
        marginLeft : 15,
    },
    btnStyle : {
        width :110,
        height : 31,
    }
})