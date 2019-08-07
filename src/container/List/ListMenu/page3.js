import React, {useState, useEffect, memo, useRef} from 'react';
import {View, FlatList, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';

import { getInset } from 'react-native-safe-area-view';

const {width, height} = Dimensions.get('screen');
const HEADER_BOTTOM_SAFE = getInset('bottom', false);
const ratio = width/360;


const icon_star = {uri : 'icon_star_full_review'}
const icon_star_blur = {uri : 'icon_star_empty_review'};

const data=[{
    reviewId : 122,
    createdAt : '2019.06.15',
    answerAt : '2019.06.15',
    profile : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3pVc096DoDW1pkzUFKkRoZ7s4zNbGLc9QY3KW1xVp3W4ZvKopGQ',
    image : 'https://images.foody.vn/res/g73/727803/prof/s480x300/foody-upload-api-foody-mobile-uncle-jpg-180329091435.jpg',
    name : '끄덕이는미식가',
    hostName : '사장님',
    rate : 5,
    answer : '',
    content : '맛있고 서비스도 좋아여^^\n다음에 또 여기 올듯~',
},
{
    reviewId : 55,
    createdAt : '2019.06.15',
    answerAt : '2019.06.15', 
    profile : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    image : '',
    name : '사용자2',
    hostName : '사장님',
    rate : 2,
    answer : '감사합니다.',
    content : '맛 없어요',
},
{
    reviewId : 24,
    createdAt : '2019.06.15',
    answerAt : '2019.06.15',
    profile : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    image : 'https://cdn.kapwing.com/final_5cc8f8c6df9c570014d84101_804902.jpg',
    name : '사용자1',
    hostName : '사장님',
    rate : 5,
    content : '맛있고 서비스도 좋아여^^\n다음에 또 여기 올듯~',
    answer : '감사합니다.',
},
{
    reviewId : 1,
    createdAt : '2019.06.15',
    answerAt : '2019.06.15',
    profile : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    image : 'https://cdn.kapwing.com/final_5cc8f8c6df9c570014d84101_804902.jpg',
    name : '사용자1',
    hostName : '사장님',
    rate : 5,
    answer : '감사합니다.',
}]

const Help = (props) => {
    const {initialScroll, onScroll, paddingTop, onPressManageReviewButton, data} = props;
    const [refFlatList, setRefFaletList] = useState(null);

    useEffect(()=> {        
        if (refFlatList != null) setTimeout (()=>scrollToTop(0, false), 1);
     }, [refFlatList]);
     const scrollToTop = (offset = initialScroll, animated = false) => {
         if (refFlatList != null) refFlatList.scrollToOffset({ offset, animated});
     }

    return (
        <View style = {{flex : 1, paddingBottom : 50+HEADER_BOTTOM_SAFE,}}>
            <FlatList
                contentContainerStyle ={{paddingTop, zIndex : 0, paddingHorizontal : 15}}
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
        content='내용이 없습니다.', 
        rate = 0, 
        daysAgo = 0, 
        answer = null,
        image=null, 
        profile =null
    } = data;

    return (
        <View style={{flexDirection:'row',  marginTop : 20, marginBottom : 12,}}>
            <View>
                <Image style={{width : 45 * ratio, height : 45 * ratio, borderRadius:22.5 * ratio, backgroundColor:'#CCCCCC'}} source={{uri : profile}}/>
            </View>
            <View style={{marginLeft:13 * ratio}}>
                <View style={{paddingTop:7}}>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>{name}</Text>

                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image style={styles.contentStar} source={rate>0 ? icon_star : icon_star_blur} />
                        <Image style={styles.contentStar} source={rate>1 ? icon_star : icon_star_blur} />
                        <Image style={styles.contentStar} source={rate>2 ? icon_star : icon_star_blur} />
                        <Image style={styles.contentStar} source={rate>3 ? icon_star : icon_star_blur} />
                        <Image style={styles.contentStar} source={rate>4 ? icon_star : icon_star_blur} />
                        <Text style={{marginLeft:5}}>{daysAgo==0?'오늘': (daysAgo<7 ? `${daysAgo}일 전`:(daysAgo<30?`${Math.floor(daysAgo/7)}주 전`:'오래전'))}</Text>
                    </View>

                     <View style={{marginTop:14,}}>
                        <Image 
                            style={{width : 272 * ratio, height : 150 * ratio, backgroundColor : '#eeeeee'}} 
                            source={{uri:image}}/>
                    </View>
                    <View style={{marginTop:15,}}>
                        <Text style={{width : 272 * ratio}} >
                            {content}
                        </Text>
                    </View>

                    {!answer && 
                    <TouchableOpacity onPress={()=>onPressManageReviewButton(reviewId)}>
                        <Text style={{color:"#733FFF", fontSize:14, marginTop:10}}>
                            {`리뷰관리`}
                        </Text>
                    </TouchableOpacity>}

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
                                    {`2019.06.15`}
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