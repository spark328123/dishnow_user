import React, {useState, memo} from 'react';
import {Dimensions, View, Text,  FlatList, StyleSheet, ActivityIndicator, Image} from 'react-native';
import { getInset } from 'react-native-safe-area-view';

const ratio = width/360;

const {width, height} = Dimensions.get('screen');
const HEADER_TOP_SAFE = getInset('top', false);

export default memo(({photos}) => {

    const [page, setPage] = useState(0);

    const bannerScrollHandle = (event) => {
        let contentOffset = event.nativeEvent.contentOffset;
        let viewSize = event.nativeEvent.layoutMeasurement;
        let pageNum = Math.round(contentOffset.x / viewSize.width);
        setPage(pageNum);        
    }


    if (photos.length)
        return (
            <View style = {styles.container}>
                
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
                            return <View>
                                <Image
                                    style={styles.images}
                                    source={{uri:item}}
                                    resizeMode={'cover'}
                                />
                                 {item.substring(0,1) == "p" && 
                                    <Image
                                        style={styles.container}
                                        source={{uri:item}}
                                        resizeMode={'cover'}/>
                                }

                                {/*
                                {item.substring(0,1) != "p" &&  
                                    <FastImage 
                                        style = {styles.container}
                                        source = {{uri:item}}>
                                    </FastImage>
                                } 
                            */}
                            </View>      
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