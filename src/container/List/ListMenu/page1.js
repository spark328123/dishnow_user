import React, {useState, useEffect, memo, useRef} from 'react';
import {View, FlatList,  TouchableOpacity, Dimensions, Image} from 'react-native';
import { Text } from '../../../component/common';
import * as Utill from '../../../utill'

import { getInset } from 'react-native-safe-area-view';
const {width, height} = Dimensions.get('screen');
const HEADER_BOTTOM_SAFE = getInset('bottom', false);
const ratio = width/360;

const icon_square_bracket_down = {uri : 'icon_rsquare_bracket_under'}

const data = {

    "mainMenu": JSON.parse("[{\"name\":\"크림 송이\",\"price\":\"7200500\",\"image\":[\"https://dishnow.s3.ap-northeast-2.amazonaws.com/5ab67526bbaedd8835aa416e6769b3274d6423506b7a6d127af85634fc4f60b9ef0aacd310b278b79fb1d76666ac23dc\"]},{\"name\":\"살려주세요\",\"price\":\"4646461\",\"image\":[\"https://dishnow.s3.ap-northeast-2.amazonaws.com/852288a26d0f52c3bdb1e8b2808b426777814d120e5ffec1bbe5f7b8f9ff149f1c7660b42984dbe5979ab187d221113b\"]},{\"name\":\"ㅗ촐ㄹ\",\"price\":\"494959595\",\"image\":[\"https://dishnow.s3.ap-northeast-2.amazonaws.com/0b4b1e0adb9672239bc147720cd71e1c39976c928f04ec40ccebcab61c5a0c0fde9147c6c2400f7a252c196c6d03c114\"]}]"),
    "subMenu": JSON.parse("[{\"name\":\"카테고리\",\"menu\":[{\"name\":\"양념치킨 \",\"price\":\"12000\"},{\"name\":\"2번 메뉴 gg\",\"price\":\"30000\"}]},{\"name\":\"치킨메뉴\",\"menu\":[{\"name\":\"짜장면\",\"price\":\"6000\"},{\"name\":\"ㄴㅇㄱ ㄴㅇㄱ\",\"price\":\"250800\"}]},{\"name\":\"반찬류\",\"menu\":[{\"name\":\"양념 게장\",\"price\":\"5600\"},{\"name\":\"간장 게장\",\"price\":\"5200\"}]}]"),
};

const Help = (props) => {
    const {initialScroll, onScroll, paddingTop,data} = props;
    const [refFlatList, setRefFaletList] = useState(null);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(()=> {        
       if (refFlatList != null) setTimeout (()=>scrollToTop(0, false), 1);
    }, [refFlatList]);
    const scrollToTop = (offset = initialScroll, animated = false) => {
        if (refFlatList != null) refFlatList.scrollToOffset({ offset : initialScroll, animated});
    }

    const _encodePrice = (value) => {
        if(value.length < 3) return `${value}원`;
    
        let priceList = [];

        const first = value.length % 3;
        let head = first;
        let tail = 0;
        
        while(tail < value.length) {
            if (head!=0) priceList.push(value.slice(tail, head));
            tail = head; head += 3;
        }
        
        return `${priceList.join(',')}원`;
    }

    return (
        <View style = {{flex : 1, paddingBottom : 50+HEADER_BOTTOM_SAFE,}}>
            <FlatList
                contentContainerStyle ={{paddingTop, zIndex : 0, backgroundColor : '#CCCCCC', paddingBottom : 50,}}
                nestedScrollEnabled={true}
                scrollEventThrottle={16}
                ref = {r=>setRefFaletList(r)}
                onScroll = {(e)=>onScroll(e)}
                data = {data.subMenu}
                extraData ={refFlatList}
                keyExtractor = {(item, index)=>`p1-${index}`}
                ListHeaderComponent={
                    (props)=>{
                        return (
                            <View style={{
                                paddingTop : 30,
                                paddingBottom : 20,
                                paddingHorizontal : 15,
                                marginBottom : 20,
                                backgroundColor : '#FFFFFF',
                                elevation : 2,
                                shadowOpacity : 0.5,
                                shadowOffset:{  width: 0,  height: 0.5,  },
                            }}>
                                <Text style={{
                                    fontSize : 16, fontWeight :'bold'
                                }}>
                                    {`대표메뉴`}
                                </Text>
                                <View style={{
                                    marginTop : 12,
                                    flexDirection : 'row',
                                    justifyContent : 'space-around',
                                    alignItems : 'flex-start',
                                }}>
                                    <MainMenuItem 
                                        data={{
                                            uri: data.mainMenu[0].image[0],
                                            name:data.mainMenu[0].name,
                                            price:_encodePrice(data.mainMenu[0].price),
                                        }}
                                    />
                                    <MainMenuItem 
                                        data={{
                                            uri: data.mainMenu[1].image[0],
                                            name:data.mainMenu[1].name,
                                            price:_encodePrice(data.mainMenu[1].price),
                                        }}
                                    />
                                    <MainMenuItem 
                                        data={{
                                            uri: data.mainMenu[2].image[0],
                                            name:data.mainMenu[2].name,
                                            price:_encodePrice(data.mainMenu[2].price),
                                        }}
                                    />
                                </View>
                            </View>
                        )
                    }
                }
                renderItem = {
                    ({item, index})=> {
                        return (
                            <ListItem data={item} key={index}/>
                        )
                    }
                }>
            </FlatList>
        </View>
    )
}

export default Help;

const MainMenuItem = memo(({data})=> {
    const {uri, name, price} = data;
   return(
    <View style={{ justifyContent : 'flex-start'}}>
        <Image 
            style ={{width : 102*ratio, height : 102*ratio}}
            source={{uri}}
        />
        <Text  style={{lineHeight : 17, marginTop:10, fontSize:14, fontWeight:'bold', }}>{name}</Text>
        <Text style={{marginTop:6, }}>{price}</Text>
    </View>
   )
})

const ListItem = memo((props) => {
    const {data} = props;
    const {name, menu} = data;

    const [isOpen, setIsOpen] = useState(true);

    const _encodePrice = (value) => {
        if(value.length < 3) return `${value}원`;
    
        let priceList = [];

        const first = value.length % 3;
        let head = first;
        let tail = 0;
        
        while(tail < value.length) {
            if (head!=0) priceList.push(value.slice(tail, head));
            tail = head; head += 3;
        }
        
        return `${priceList.join(',')}원`;
    }


    return (
        <View style={{
            marginBottom : 12,
            backgroundColor : Utill.color.white,
        }}> 
            <View style ={{
                zIndex : 1,
                paddingVertical : 12,
                paddingHorizontal : 15,
                flexDirection : 'row',
                justifyContent : 'space-between',
                alignItems : 'center',
                backgroundColor : '#FFFFFF',
                elevation : 2.5,
                shadowOpacity : 0.3,
                shadowOffset:{  width: 0,  height: 0.3,  },
            }}> 
                <Text style={{fontSize:16, fontWeight:'bold'}}>{name}</Text>
                <TouchableOpacity onPress={()=>setIsOpen(open=>!open)}>
                    <Image style={{width:15, height:8.9}} source={icon_square_bracket_down} />
                </TouchableOpacity>
            </View>
            {isOpen &&
                <View style={{
                    paddingVertical : 5,
                    paddingHorizontal : 15,
                    backgroundColor : '#FFFFFF',
                    elevation : 2,
                    shadowOpacity : 0.3,
                    shadowOffset:{  width: 0,  height: 0.3,  },
                }}>

                    {menu.map((item, index)=> {
                        return (
                            <View 
                            key={`cm-${index}`}
                            style={{
                                paddingVertical : 15,
                                flexDirection : 'row',
                                justifyContent : 'space-between',
                                borderBottomColor : '#cccccc',
                                borderBottomWidth : index == menu.length-1 ? 0:1,

                            }}>
                                <Text style={{fontSize:14}}>{item.name} </Text>
                                <Text>{_encodePrice(item.price)}</Text>
                            </View>
                        )
                    })

                    }
               </View> 
            }
        </View>
    )

});