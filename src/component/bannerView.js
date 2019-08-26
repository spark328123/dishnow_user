import React, {useState, memo} from 'react';
import {Dimensions, View, Text,  FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { getInset } from 'react-native-safe-area-view';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-view';
import Lightbox from 'react-native-lightbox';

const ratio = width/360;

const {width, height} = Dimensions.get('screen');
const HEADER_TOP_SAFE = getInset('top', false);

export default memo(({photos,navigator}) => {
    console.log(photos);
    const [isImageViewVisible, setIsImageViewVisible] = useState(false);

    const [page, setPage] = useState(0);
    const bannerScrollHandle = (event) => {
        let contentOffset = event.nativeEvent.contentOffset;
        let viewSize = event.nativeEvent.layoutMeasurement;
        let pageNum = Math.round(contentOffset.x / viewSize.width);
        setPage(pageNum);        
    }

    const images = photos.map(item=>{
        return {
            source: {
                uri: item,
            },
            width,
            height: 180,
        }
    });
        

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
                                <Lightbox>
                                    <FastImage
                                        style={styles.images}
                                        source={{uri:item}}
                                        resizeMode={'cover'}
                                    />
                                </Lightbox>
                            </View>)    
                    }}/>
                }

                <View style={styles.indexArea}>
                    <Text style={styles.indexText}>{`${page+1} / ${photos.length}`}</Text>
                </View>
            </View>
        )

    return <View style = {styles.container}>
        <Text>{'등록된 사진이 없어요!'}</Text></View>
});

const styles = StyleSheet.create({
    container : {
        paddingTop : HEADER_TOP_SAFE,
        width,
        height : 182 + HEADER_TOP_SAFE,
        backgroundColor : '#FFFFFF',
        justifyContent : 'center',
        alignItems : 'center',
    },
    images : {
        width,
        height : 182,
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