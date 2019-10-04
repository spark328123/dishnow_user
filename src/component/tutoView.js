import React, {useState, memo} from 'react';
import {Dimensions, View, Text,  FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { BigTuto, CustomAlert, CustomAlert1 } from '../component/common'
import { getInset } from 'react-native-safe-area-view';
import FastImage from 'react-native-fast-image';

import * as API from '../utill/API';

const {width, height} = Dimensions.get('screen');
const HEADER_TOP_SAFE = getInset('top', false);

export default memo(({photos,navigator}) => {
    const [page, setPage] = useState(0);
    const bannerScrollHandle = (event) => {
        let contentOffset = event.nativeEvent.contentOffset;
        let viewSize = event.nativeEvent.layoutMeasurement;
        let pageNum = Math.round(contentOffset.x / viewSize.width);
        setPage(pageNum);
        console.log("페이지");
        console.log(page);        
    }

    const _onPress = async()=>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.setTutorial(token); 
        navigator.navigate('TabHome');
    }
        

    if (photos.length)
        return (
            <View style = {styles.container}>
                {/*
                <ImageView
                    images={images}
                    imageIndex={0}
                    isVisible={isImageViewVisible}
                />
                */}
                {!photos && <Text></Text>}
                {photos &&
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={photos}
                        horizontal={true}
                        pagingEnabled={true}
                        keyExtractor = {(item, index) => `bnv-${index}`}
                        onScroll={bannerScrollHandle}
                        renderItem= {({item}) =>{ 
                            return (<View>
                                    <Image
                                        style={styles.images}
                                        source={{uri:item}}
                                        resizeMode={'cover'}
                                    />
                            </View>)    
                    }}/>
                }
                    {page===3 &&  (
                        <View style={{position : 'absolute' , top : "90%"}}>
                    <BigTuto
                    style={{top : 1, width : "50%"}}
                    onPress ={()=>_onPress()}
                    title = {'시작 하기'}
                    />
                        </View>
                    )}

            </View>
        )
});

const styles = StyleSheet.create({
    container : {
        width,
        height : "100%",
        backgroundColor : '#FFFFFF',
        justifyContent : 'center',
        alignItems : 'center',
    },
    images : {
        width,
        height : "100%",
        backgroundColor : '#AAAAFF',
    },
    indexArea : {
        height : 22,
        position : 'absolute',
        color : '#FFFFFF',
        alignSelf : 'flex-end',
        backgroundColor : '#030303',
        borderRadius :11,
        paddingHorizontal : 10,
        paddingVertical : 3,        
        top : 10 + HEADER_TOP_SAFE,
        right : 10,
    },
    indexText : {
        fontSize : 12,
        color : '#FFFFFF',
    }
})