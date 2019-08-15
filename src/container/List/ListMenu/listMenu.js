import React, {Component, useState, useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { getInset } from 'react-native-safe-area-view';
import {NavHead, NavSwitchHead} from '../../../component/common';
import {handleAndroidBackButton} from '../../../component/common/hardwareBackButton'
import BannerView from '../../../component/bannerView';
import TabButton from '../../../component/TabButton';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import * as API from '../../../utill/API';
import call from 'react-native-phone-call';
import { Text,CustomAlert } from '../../../component/common';
import { connect } from 'react-redux';
import * as Utill from '../../../utill'
const icon_square_bracket_left = {uri : 'icon_square_bracket_left'};
const icon_on_map = {uri : 'icon_on_map_black'};
const icon_call = {uri : 'icon_call'};
const icon_star_outline = {uri : 'icon_star_full_list'};
const icon_star_outline_half = {uri : 'icon_star_half_list'};
const icon_star_outline_empty = {uri : 'icon_star_empty_list'};

const ReviewAward = 500;

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

const ListMenu = (props) =>  {
  const phone = props.phone;
  const [data] = useState(props.navigation.getParam('resDetail'));
  const [reviewData] = useState(props.navigation.getParam('resReview'));
  const [photos] = useState(props.navigation.getParam('photos'));
  const isReservation = props.navigation.getParam('isReservation');
  const {navigation,navtitle,title} = props;
  const isConfirm = navigation.getParam('isConfirm');
  const [page1Data] = useState({
      "mainMenu" : JSON.parse(data.mainMenu),
      "subMenu" : JSON.parse(data.subMenu),
  });
  const [page2Data] = useState({
    "name": data.name,
    "mainPhone": data.mainPhone,
    "content": data.content,
    "address": data.address,
    "facilities": JSON.parse(data.facilities),
    "businessHour": data.businessHour,
  });
  const [page3Data] = useState({
      review : reviewData.review,
      totalCount : reviewData.totalCount,
  });
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
  const [isAlertVisible, setIsAlertVisible] = useState(false);

    const _onPressAlertCancel = async() => {
        setIsAlertVisible(false);
    }

    const _onPressAlertOk = () => {
        setIsAlertVisible(false);
        _onPressReservationButton();
    }
  _goBack = () => {
    isReservation ? navigation.navigate('List') :navigation.navigate('TabBooked')
}

handleAndroidBackButton(_goBack);
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
    if(isConfirm){
        props.navigation.navigate('TabHome');
        return;
    }
    //예약 중이면 
    if(!isReservation)props.navigation.navigate('TabBooked');

    //예약 중이 아니면 
    else props.navigation.pop();
    console.log('_onPressBackButton');
    return;
  }
  // 화면 하단 전화기 버튼
  const _onPressPhoneButton = () => {
    const args = {
      number: data.mainPhone, // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
  call(args).catch(console.error)
    console.log('_onPressPhoneButton');
    return;
  }
  // 화면 하단 지도 버튼
  const _onPressMapButton = () => {
    const name = data.name;
    const theme = '전체';
    const latitude = props.navigation.getParam('latitude');
    const longitude = props.navigation.getParam('longitude');
    if(!isReservation){
        props.navigation.navigate('StoreMap',{
            page1Data,
            latitude,
            longitude,
            name,
            theme,
            isReservation,
            mainMenu : data.mainMenu,
        });
    }else{
    console.log(data.latitude,data.longitude);
        props.navigation.navigate('StoreMap',{
            latitude : data.latitude,
            longitude : data.longitude,
            name,
            theme : props.navigation.getParam('theme'),
            isReservation,
            distance : props.navigation.getParam('distance'),
        })
    }
    console.log('_onPressPhoneButton');
    
    return;
  }
  
  // 화면 하단 예약하기 버튼
  const _onPressReservationButton = async() => {
      if(isConfirm){
          alert('이미 예약하신 식당입니다.');
          return;
      }
    if(!isReservation){
        alert('예약이 불가능한 상태입니다.');
      return;
    }
    console.log('_onPressReservationButton');
    const token =  await API.getLocal(API.LOCALKEY_TOKEN);
    await API.reservation_confirm(token,{
        storeId : props.navigation.getParam('storeId'), 
        reservationId : props.navigation.getParam('reservationId')})
    await API.postDNpoint(token,{
        phone,
        type : 'save',
        diff : ReviewAward,
        name : data.name,
    });
    navigation.navigate('Booked',{
        peopleNumber : navigation.getParam('peopleNumber'),
        minutes : navigation.getParam('minutes'),
        name : data.name,
    });
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
       <CustomAlert 
                visible={isAlertVisible} 
                mainTitle={'예약'}
                mainTextStyle = {styles.txtStyle}
                subTitle = {'최종 예약 하시겠습니까?'}
                subTextStyle = {styles.subtxtStyle}
                buttonText1={'아니오'} 
                buttonText2={'네'} 
                onPressCancel = {_onPressAlertCancel}
                onPress={_onPressAlertOk} 
        />
      {/* 각 페이지를 담는 부분입니다.*/}
      {page == 0 && <Page1 paddingTop={HEADER_MAX_HEIGHT + HEADER_TAB_HEIGHT} initialScroll={scrollY._value} onScroll={_onScroll} data={page1Data} />}
      {page == 1 && <Page2 paddingTop={HEADER_MAX_HEIGHT + HEADER_TAB_HEIGHT} initialScroll={scrollY._value} onScroll={_onScroll} data={page2Data}/>}
      {page == 2 && <Page3 paddingTop={HEADER_MAX_HEIGHT + HEADER_TAB_HEIGHT} initialScroll={scrollY._value} onScroll={_onScroll} onPressManageReviewButton={_onPressManageReviewButton} data={page3Data}/>}


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
              <Image style={styles.contentStar} source={data.rating>0 ? (data.rating<1 ? icon_star_outline_half : icon_star_outline) : icon_star_outline_empty}/>
              <Image style={styles.contentStar} source={data.rating>1 ? (data.rating<2 ? icon_star_outline_half : icon_star_outline) : icon_star_outline_empty}/>
              <Image style={styles.contentStar} source={data.rating>2 ? (data.rating<3 ? icon_star_outline_half : icon_star_outline) : icon_star_outline_empty}/>
              <Image style={styles.contentStar} source={data.rating>3 ? (data.rating<4 ? icon_star_outline_half : icon_star_outline) : icon_star_outline_empty}/>
              <Image style={styles.contentStar} source={data.rating>4 ? (data.rating<5 ? icon_star_outline_half : icon_star_outline) : icon_star_outline_empty}/>

              <Text 
                style={[styles.contentStarText]}
              >
                {data.rating}
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
          <View style={{flex : 1, borderRightWidth:1, borderColor:'#EEEEEE'}}>
            <TouchableOpacity 
              onPress={_onPressPhoneButton}
              style ={{
                height : 50,
                justifyContent : 'center',
                alignItems : 'center',
              }}>
              <Image style={{width:16.6, height:22,}} source={icon_call}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            onPress={_onPressMapButton}
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
          backgroundColor : !isConfirm && isReservation?'#733fff':'#CCCCCC'
          }}>
          <TouchableOpacity 
            onPress={()=>setIsAlertVisible(true)}
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


const mapStateToProps = (state) => {
    console.log(state);
    return {
        phone : state.User._root.entries[3][1],
    }
}

export default connect(mapStateToProps)(ListMenu);


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
  txtStyle : {
    marginBottom : Utill.screen.Screen.customHeight(9),
    fontSize : 18,
    fontWeight : 'bold',
    color : Utill.color.primary1,
    alignSelf : 'center',
},
subtxtStyle : {
    marginBottom : Utill.screen.Screen.customHeight(35),
    fontSize : 16,
    color : Utill.color.textBlack,
    alignSelf : 'center',
},
});

// export default ScrollableHeader;
