import React from 'react';
import {View,StyleSheet,Alert,Image, FlatList, TouchableOpacity} from 'react-native';
import MyPoint from '../../../store/modules/myPoint'
import {Text,Button,ItemButton5000} from '../../../component/common'
import * as User from '../../../store/modules/user'
import * as API from '../../../utill/API';

export default Point1 = (props)=> {

    const _usePoint = async({name})=>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        await API.postDNpoint(token,{
            phone : props.phone,
            name : name,
            diff : '5000',
            type : 'use',
        });
    }

    const data = [
        {
            image : {uri : 'icon_x'},
            name : '스타벅스'
        },
        {
            image : {uri : 'icon_x'},
            name : '베스킨라빈스'
        },
        {
            image : {uri : 'icon_x'},
            name : '컬쳐랜드'
        },
        
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