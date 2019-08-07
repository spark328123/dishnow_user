import React, {Component, useState, useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { getInset } from 'react-native-safe-area-view';

import BannerView from '../../../component/bannerView';
import TabButton from '../../../component/TabButton';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';

const icon_square_bracket_left = {uri : 'icon_square_bracket_left'};
const icon_on_map = {uri : 'icon_on_map_black'};
const icon_call = {uri : 'icon_call'};
const icon_star_outline = {uri : 'icon_star_full_list'};
const icon_star_outline_half = {uri : 'icon_star_half_list'};
const icon_star_outline_empty = {uri : 'icon_star_empty_list'};

const photos =['http://www.the-pr.co.kr/news/photo/201809/40978_61156_1748.jpg',
               'http://www.the-pr.co.kr/news/photo/201809/40978_61156_1748.jpg',
               'http://www.the-pr.co.kr/news/photo/201809/40978_61156_1748.jpg']


const data = {
"name": "ㅁㄴㅇㅁㄴㅇ",
rate : 2.2,
"mainPhone": "123123",
"mainMenu": "[{\"name\":\"넘나 힘들어요\",\"price\":\"720005000\",\"image\":[\"https://dishnow.s3.ap-northeast-2.amazonaws.com/5ab67526bbaedd8835aa416e6769b3274d6423506b7a6d127af85634fc4f60b9ef0aacd310b278b79fb1d76666ac23dc\"]},{\"name\":\"살려주세요\",\"price\":\"4646461\",\"image\":[\"https://dishnow.s3.ap-northeast-2.amazonaws.com/852288a26d0f52c3bdb1e8b2808b426777814d120e5ffec1bbe5f7b8f9ff149f1c7660b42984dbe5979ab187d221113b\"]},{\"name\":\"ㅗ촐ㄹ\",\"price\":\"494959595\",\"image\":[\"https://dishnow.s3.ap-northeast-2.amazonaws.com/0b4b1e0adb9672239bc147720cd71e1c39976c928f04ec40ccebcab61c5a0c0fde9147c6c2400f7a252c196c6d03c114\"]}]",
"subMenu": "[{\"name\":\"카테고리\",\"menu\":[{\"name\":\"양념치킨 \",\"price\":\"12000\"},{\"name\":\"2번 메뉴 gg\",\"price\":\"30000\"}]},{\"name\":\"치킨메뉴\",\"menu\":[{\"name\":\"짜장면\",\"price\":\"6000\"},{\"name\":\"ㄴㅇㄱ ㄴㅇㄱ\",\"price\":\"250800\"}]},{\"name\":\"반찬류\",\"menu\":[{\"name\":\"양념 게장\",\"price\":\"5600\"},{\"name\":\"간장 게장\",\"price\":\"5200\"}]}]",
"content": "싱싱한 닭이나옵니다ㅇㅇ",
"address": "주소가 여기에 ",
"facilities": JSON.parse("{\"wifi\":true,\"battery\":true,\"parking\":true,\"somke\":false,\"pet\":false,\"kids\":true}"),
"businessHour": {
    "mondayOpen": "00:00:00",
    "mondayClose": "00:00:00",
    "tuesdayOpen": "08:30:00",
    "tuesdayClose": "02:50:00",
    "wednesdayOpen": "09:50:00",
    "wednesdayClose": "20:55:00",
    "thursdayOpen": "09:05:00",
    "thursdayClose": "00:00:00",
    "fridayOpen": "05:30:00",
    "fridayClose": "02:00:00",
    "saturdayOpen": "07:40:00",
    "saturdayClose": "06:30:00",
    "sundayOpen": "00:00:00",
    "sundayClose": "00:00:00",
    "breakTime": "오후 2시 ~ 3시는 휴식시간 입니다."
}
};
            

const {width, height} = Dimensions.get('screen');
const HEADER_TOP_SAFE = getInset('top', false);
const HEADER_BOTTOM_SAFE = getInset('bottom', false);
const HEADER_HEIGHT  = 50 + HEADER_TOP_SAFE;
const HEADER_MIN_HEIGHT = HEADER_HEIGHT + HEADER_TOP_SAFE;
const HEADER_MAX_HEIGHT = 182 + HEADER_TOP_SAFE;
const HEADER_OVER_HEIGHT = 200 + HEADER_TOP_SAFE;
const HEADER_TITLE_HEIGHT = 82;
const HEADER_TITLE_MAX_HEIGHT = HEADER_MAX_HEIGHT - HEADER_TITLE_HEIGHT/2;

const HEADER_TAB_HEIGHT = 88;


const SCREEN_HEIGHT = height - HEADER_MAX_HEIGHT;

const ListMenu = ({navigation}) =>  {
  const [scrollY] = useState(new Animated.Value(0));
  const [scrollYListener, setScrollYListener] = useState(null);
  const [yValue, setYValue] = useState(0);
  const [page, setPage] = useState(0);

  // background
  const _backgroundHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_TOP_SAFE],
    extrapolate: 'clamp',
  });

  // card animation
  const _titleCardPostion = scrollY.interpolate({
    inputRange: [0 , HEADER_TITLE_MAX_HEIGHT,HEADER_OVER_HEIGHT],
    outputRange: [HEADER_TITLE_MAX_HEIGHT, HEADER_TOP_SAFE ,  0],
    extrapolate: 'clamp',
  });
  const _titleCardPaddingTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT-41, HEADER_MAX_HEIGHT],
    outputRange: [0, 0, 32+HEADER_TOP_SAFE],
    extrapolate: 'clamp',
  });
  const _titleCardHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT-41, HEADER_MAX_HEIGHT],
    outputRange: [82, 82, HEADER_HEIGHT],
    extrapolate: 'clamp',
  });
  const _titleCardWidth = scrollY.interpolate({
    inputRange: [0, HEADER_TITLE_MAX_HEIGHT, HEADER_OVER_HEIGHT],
    outputRange: [250, 250, width],
    extrapolate: 'clamp',
  });
  const _titleCardShadow = scrollY.interpolate({
    inputRange: [0, 100, HEADER_OVER_HEIGHT],
    outputRange: [0.4, 0.4, 0],
    extrapolate: 'clamp',
  });
  const _titleCardElevation= scrollY.interpolate({
    inputRange: [0, HEADER_OVER_HEIGHT-40],
    outputRange: [2, 0],
    extrapolate: 'clamp',
  });
  const _titleCardRadius = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT, HEADER_OVER_HEIGHT],
    outputRange: [20, 20, 0],
    extrapolate: 'clamp',
  });
  const _titleTextSize = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT-41, HEADER_MAX_HEIGHT],
    outputRange: [16, 16, 18],
    extrapolate: 'clamp',
  });

  // content
  const _contentOpactity = scrollY.interpolate({
    inputRange: [0, HEADER_OVER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const _tabBarPosition = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT,  + HEADER_TOP_SAFE],
    extrapolate: 'clamp',
  });

  //backbutton
  const _backButtonColorTint = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT-30, HEADER_OVER_HEIGHT],
    outputRange: ['rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(0,0,0)'],
    extrapolate: 'clamp',
  });
  const _onScroll = (e) => {
    // console.log(e.nativeEvent.contentOffset.y)
      scrollY.setValue(e.nativeEvent.contentOffset.y);
  }
  const _setPage = (pageIndex) => {
    setPage(pageIndex);
    scrollY.setValue(scrollY._value > HEADER_OVER_HEIGHT ? HEADER_OVER_HEIGHT : scrollY._value);
  }

  // =========================================================================================================
  // =========================================================================================================
  // =========================================================================================================
  // button action 

  // 화면 좌측 상단 뒤로가기 버튼
  const _onPressBackButton = () => {
    navigation.pop();
    console.log('_onPressBackButton');
    return;
  }
  // 화면 하단 전화기 버튼
  const _onPressPhoneButton = () => {
    console.log('_onPressPhoneButton');
    return;
  }
  // 화면 하단 지도 버튼
  const _onPressMapButton = () => {
    console.log('_onPressMapButton');
    return;
  }
  // 화면 하단 예약하기 버튼
  const _onPressReservationButton = () => {
    console.log('_onPressReservationButton');
    return;
  }


  // 화면 하단 예약하기 버튼
  const _onPressManageReviewButton = (reviewId) => {
    console.log(`_onPressManageReviewButton -> ${reviewId}`);
    return;
  }

  // =========================================================================================================
  // =========================================================================================================
  // =========================================================================================================

  return (
    <View style ={{flex : 1,backgroundColor:'#EEEEEE'}}>

      {/* 각 페이지를 담는 부분입니다.*/}
      {page == 0 && <Page1 paddingTop={HEADER_MAX_HEIGHT + HEADER_TAB_HEIGHT} initialScroll={scrollY._value} onScroll={_onScroll} />}
      {page == 1 && <Page2 paddingTop={HEADER_MAX_HEIGHT + HEADER_TAB_HEIGHT} initialScroll={scrollY._value} onScroll={_onScroll} />}
      {page == 2 && <Page3 paddingTop={HEADER_MAX_HEIGHT + HEADER_TAB_HEIGHT} initialScroll={scrollY._value} onScroll={_onScroll} onPressManageReviewButton={_onPressManageReviewButton}/>}


      {/* 매장 사진 */}
      <Animated.View style={[styles.header, {height: _backgroundHeight}]}>
        <BannerView photos={photos}/>
      </Animated.View>
      
      {/* 탭 버튼 */}
      <Animated.View 
        style={[{
          width,
          position : 'absolute',
          flexDirection : 'row',
          height : HEADER_TAB_HEIGHT, 
          alignItems : 'flex-end',
          justifyContent : 'center',
          paddingHorizontal : 15,
          backgroundColor:'#FFFFFF',
          zIndex : 5,
          shadowOpacity : 0.5,
          shadowOffset:{width: 0,  height: 0.5},
          elevation : 2,

        },{
          top : _tabBarPosition,
        }]}
      > 
        <TabButton title={'메뉴'} isFocus={page==0} onPress={()=>_setPage(0)}/>
        <TabButton title={'정보'} isFocus={page==1} onPress={()=>_setPage(1)}/> 
        <TabButton title={'리뷰'} isFocus={page==2} onPress={()=>_setPage(2)}/> 
      </Animated.View>

      {/* 매장 이름 & 별점 */}
      <Animated.View 
        style={
          { 
            width,
            position : 'absolute',
            top : _titleCardPostion,
            alignItems : 'center',
            elevation : 4,
            zIndex : 100,
            overflow : 'visible'
          }
        }>
        <Animated.View 
        style={ 
          { 
            position : 'absolute',
            width : _titleCardWidth,
            height : _titleCardHeight, 
            alignItems: 'center',
            alignSelf : 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius : _titleCardRadius,
            shadowOpacity: _titleCardShadow,
            shadowOffset : {x : 0, y: 0.5},
            elevation : _titleCardElevation,
          }
        }>
          <Animated.View 
            pointerEvents="none"
            style={{ 
                flexDirection:'column-reverse',
                paddingTop : _titleCardPaddingTop,
                justifyContent : 'center',
                alignItems : 'center',
              }}
          >

            <Animated.View style={[styles.cardContent, {opacity : _contentOpactity}]}>
              <Image style={styles.contentStar} source={data.rate>0 ? (data.rate<1 ? icon_star_outline_half : icon_star_outline) : icon_star_outline_empty}/>
              <Image style={styles.contentStar} source={data.rate>1 ? (data.rate<2 ? icon_star_outline_half : icon_star_outline) : icon_star_outline_empty}/>
              <Image style={styles.contentStar} source={data.rate>2 ? (data.rate<3 ? icon_star_outline_half : icon_star_outline) : icon_star_outline_empty}/>
              <Image style={styles.contentStar} source={data.rate>3 ? (data.rate<4 ? icon_star_outline_half : icon_star_outline) : icon_star_outline_empty}/>
              <Image style={styles.contentStar} source={data.rate>4 ? (data.rate<5 ? icon_star_outline_half : icon_star_outline) : icon_star_outline_empty}/>

              <Text 
                style={[styles.contentStarText]}
              >
                {data.rate}
              </Text>
            </Animated.View>


            <Animated.Text 
              style={[
                styles.title,
                {
                  fontSize : _titleTextSize}
              ]}>
              {data.name}
            </Animated.Text>
        </Animated.View>
      </Animated.View>
      </Animated.View>
      
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity 
        onPress={_onPressBackButton}
        // hitSlop ={{top:17, bottom:5, left:15, right : 17}}
        style={{  
          position:'absolute', 
          left : 6.525, 
          top: 9 +HEADER_TOP_SAFE, 
          zIndex : 1000, 
          elevation : 1000,
          }}>
          <Animated.Image 
            style={[
              {width:27.5, height : 34,},
              {tintColor : _backButtonColorTint}
            ]} 
            source={icon_square_bracket_left}
          />
      </TouchableOpacity>

      {/* 하단 버튼 {전화기, 지도, 예약하기} */}
      <View style={{
        paddingBottom : HEADER_BOTTOM_SAFE,
        flexDirection : 'row',
        position : 'absolute',
        bottom : 0,
        backgroundColor:'#FFFFFF',
        shadowOpacity : 0.3,
        shadowOffset:{  width: 0,  height: 0.3,  },
        elevation : 2,
      }}>
        <View style={{
          flex:1, 
          flexDirection:'row'
        }}>
          <View style={{flex : 1, borderRightWidth:1, borderColor:'#cccccc'}}>
            <TouchableOpacity 
              onPress={_onPressMapButton}
              style ={{
                height : 50,
                justifyContent : 'center',
                alignItems : 'center',
              }}>
              <Image style={{width:16.6, height:22,}} source={icon_call}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            onPress={_onPressPhoneButton}
              style = {{
              flex : 1,
              height : 50,
              justifyContent : 'center',
              alignItems : 'center',
            }}>
            <Image style={{width:27.4, height:22,}} source={icon_on_map}/>
          </TouchableOpacity>
        </View>
        <View style={{
          flex:1,
          backgroundColor : true?'#733fff':'#CCCCCC'
          }}>
          <TouchableOpacity 
            onPress={_onPressReservationButton}
              style = {{
              flex : 1,
              alignSelf : 'stretch',
              justifyContent : 'center',
              alignItems : 'center',
          }}>
            <Text style={{color:'#FFFFFF', fontSize:18}}>{`예약하기`}</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}



const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex : 1,
  },
  backButton :{
    position : 'absolute',
    top : 43,
    left : 20,  
  },
  backButtonImage : {
    width : 27.5,
    height : 34,
  },
  bg: {
    width : '100%',
    height : HEADER_MAX_HEIGHT,
    backgroundColor : '#7f3d3d'
  },
  card: {
    position : 'absolute',
    width : 282,
    alignItems: 'center',
    alignSelf : 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowOffset:{  width: 0.5,  height: 0.5,  },
    shadowColor: '#555555',
  },
  cardContent : {
    height : 18,
    marginTop : 10,
    flexDirection : 'row',
    alignItems : 'center',
  },
  contentStar : {
    width : 16.8,
    height : 16,
    marginRight : 3.6,
  },
  contentStarText : {
    marginLeft : 7.9,
    color: '#000000',
    fontSize: 18,
  },
  title: {
    // textAlignVertical : 'center',
    color: '#000000',
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
});

// export default ScrollableHeader;
export default ListMenu;
