import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import { connect, dispatch } from 'react-redux';
import * as API from '../../../utill/API';
import { Text } from '../../../component/common';

const MyPoint = (props)=>{
    const { navigation, point } = props;
    const [ data, setData ] = useState([]); 
    
    const _renderItem = ({item}) =>{
        return (
            <View>
                <Text>
                    {item.name}
                </Text>
                <Text>
                    {`${item.diff}원 ${item.type=='save'?'적립':'사용'}`}
                </Text>
                <Text>
                    {item.createdAt.substring(0,10)}
                </Text>
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
            <View>  
                <Text>{`보유포인트 ${point}`}</Text>
                <Button title = '쇼핑' onPress = {()=>navigation.navigate('point')}></Button>
            </View>
                <Text>포인트 내역</Text>
                <FlatList data = {data} renderItem = {_renderItem}/>
            <View>

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
    },
});
