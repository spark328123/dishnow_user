import React, {useState, useEffect, memo, useRef} from 'react';
import {View, FlatList,  TouchableOpacity, Dimensions, Image} from 'react-native';
import { Text } from '../../../component/common';


import { getInset } from 'react-native-safe-area-view';
const {width, height} = Dimensions.get('screen');
const HEADER_BOTTOM_SAFE = getInset('bottom', false);
const ratio = width/360;

const icon_square_bracket_down = {uri : 'icon_rsquare_bracket_under'}


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