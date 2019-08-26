import React, {useState, useEffect, memo, useRef} from 'react';
import {View, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Utill from '../../../utill'
import { Text } from '../../../component/common';

import { getInset } from 'react-native-safe-area-view';

const {width, height} = Dimensions.get('screen');
const HEADER_BOTTOM_SAFE = getInset('bottom', false);
const ratio = width/360;


const icon_star = {uri : 'icon_star_full_review'}
const icon_star_blur = {uri : 'icon_star_empty_review'};


const Help = (props) => {
    const {initialScroll, onScroll, paddingTop, onPressManageReviewButton, data} = props;
    const [refFlatList, setRefFaletList] = useState(null);
    const [force,setForce] = useState(0);

    useEffect(()=> {        
        if (refFlatList != null) setTimeout (()=>scrollToTop(0, false), 1);
     }, [refFlatList]);
     const scrollToTop = (offset = initialScroll, animated = false) => {
         if (refFlatList != null) refFlatList.scrollToOffset({ offset, animated});
     }

    return (
        <View style = {{flex : 1, paddingBottom : 50+HEADER_BOTTOM_SAFE,backgroundColor : Utill.color.white,}}>
            <FlatList
                contentContainerStyle = {{paddingTop, zIndex : 0, paddingHorizontal : 15}}
                nestedScrollEnabled={true}
                scrollEventThrottle={16}
                ref = {r=>setRefFaletList(r)}
                onScroll = {(e)=>onScroll(e)}
                data = {data.review}
                keyExtractor = {(item, index)=>index.toString()}
                ListHeaderComponent={
                    ()=>{
                        return (
                            <View style={{paddingTop:25, paddingBottom:15, borderBottomColor : '#CCCCCC', borderBottomWidth:1}}>
                                <Text style={{fontSize:14, color:'#555555'}}>
                                    {`리뷰${data.totalCount}개`}
                                </Text>
                            </View>
                        )
                    }
                }
                renderItem = {
                    ({item, index})=> {
                        if(item.rating!==null){
                            return (
                                <ReviewItem data={{...item, daysAgo:index}} key={`p3-${index}`} onPressManageReviewButton={onPressManageReviewButton}/>
                            )
                        }
                    }
                }
                >
            </FlatList>
        </View>
    )
}

export default Help;

const ReviewItem =({data, onPressManageReviewButton}) => {
    const {
        reviewId=0,
        name = '손님', 
        hostName = '사장님',
        content = '내용이 없습니다.', 
        rating = 0, 
        daysAgo = 0, 
        answer = null,
        image = null, 
        createdAt = null,
        profile = null
    } = data;
    var imageArray =  image.substring(1,image.length-1).split(',');
    console.log(imageArray[0]);
    console.log(imageArray[1]);

    return (
        <View style={{flexDirection:'row',  marginTop : 20, marginBottom : 12,}}>
            <View>
                <Image style={{width : 45 * ratio, height : 45 * ratio, borderRadius:22.5 * ratio, backgroundColor:'#CCCCCC'}} source={{uri : profile}}/>
            </View>
            <View style={{marginLeft:13 * ratio}}>
                <View style={{paddingTop:7}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>{name}</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image style={styles.contentStar} source={rating>0 ? icon_star : icon_star_blur} />
                        <Image style={styles.contentStar} source={rating>1 ? icon_star : icon_star_blur} />
                        <Image style={styles.contentStar} source={rating>2 ? icon_star : icon_star_blur} />
                        <Image style={styles.contentStar} source={rating>3 ? icon_star : icon_star_blur} />
                        <Image style={styles.contentStar} source={rating>4 ? icon_star : icon_star_blur} />
                       {/* <Text style={{marginLeft:5}}>{daysAgo==0?'오늘': (daysAgo<7 ? `${daysAgo}일 전`:(daysAgo<30?`${Math.floor(daysAgo/7)}주 전`:'오래전'))}</Text> */}
                       <Text style = {{marginLeft :5, fontSize :12 }}> {createdAt.substring(0,10)} </Text>
                    </View>

                     <View style={{marginTop:14,}}>
                         {imageArray.length>=1 && imageArray[0].length>=3 &&  <FastImage 
                            resizeMethod = 'resize'
                            style={{width : 272 * ratio, height : 150 * ratio, backgroundColor : '#eeeeee'}} 
                            source={{uri:imageArray[0].substring(1,imageArray[0].length-1)}}/>}
                        
                        {imageArray.length>=2 &&   <FastImage 
                        resizeMethod = 'resize'
                            style={{width : 272 * ratio, height : 150 * ratio, backgroundColor : '#eeeeee'}} 
                            source={{uri:imageArray[1].substring(1,imageArray[1].length-1)}}/>}
                        {imageArray.length>=3 &&   <FastImage 
                        resizeMethod = 'resize'
                            style={{width : 272 * ratio, height : 150 * ratio, backgroundColor : '#eeeeee'}} 
                            source={{uri:imageArray[2].substring(1,imageArray[2].length-1)}}/>}
                    </View>
                    <View style={{marginTop:15,}}>
                        <Text style={{width : 272 * ratio}} >
                            {content}
                        </Text>
                    </View>
                 
                    {!!answer && 
                        <View
                            style={{
                                marginTop : 15,
                                paddingHorizontal:17, 
                                paddingVertical:15,
                                backgroundColor : '#eeeeee',
                                borderRadius : 10 *ratio,
                            }}>
                            <View 
                                style={{flexDirection:'row'}}>
                                <Text style={{color:"#111111", fontSize:12}}>
                                    {hostName}
                                </Text>
                                <Text style={{color:"#555555", fontSize:10, marginLeft:5}}>
                                    {createdAt.substring(0,10)}
                                </Text>
                                
                            </View>
                            <Text style={{color:"#111111", lineHeight : 19, fontSize:12, marginTop:10}}>
                                    {answer}
                                </Text>
                        </View>}
                </View>

            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    contentStar : {
        width:12.6,
        height:12,
        marginRight : 0.4,
    }
});