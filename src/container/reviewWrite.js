import React, { useState, memo, useEffect } from 'react';
import { View,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import * as API from '../utill/API';
import * as Utill from '../utill';
import ImagePicker from 'react-native-image-picker';
import Dialog from "react-native-dialog";
import { Text,NavHead,NavSwitchHead } from '../component/common/';
import {handleAndroidBackButton} from '../component/common/hardwareBackButton';
import Toast from 'react-native-simple-toast';
import { connect, useDispatch } from 'react-redux';
import User from '../store/modules/user';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const defaultImageSource = {uri: 'icon_add_photo'};
const addImageSource = {uri: 'icon_add_photo_add'};
const defaultStar = {uri : 'icon_star_empty_review'};
const checkStar = {uri : 'icon_star_full_review'};

const ReviewAward = 500;
 
const ReviewWrite = (props) => {
    const { navigation, phone } = props;
    const dispatch = useDispatch();
    const storeName = navigation.getParam('storeName');
    const isUpdate = navigation.getParam('isUpdate');
    const [ reviewId ] = useState(navigation.getParam('reviewId'));
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ content, setContent ] = useState('');
    const [ imageArray, setImageArray ] = useState([{
        id : 0,
        source : defaultImageSource,
        isLoaded : false, 
    }]);
    const [ visible, setVisible ] = useState(false);
    const [ canPress, setCanPress ] = useState(false);
    const [ screenWidth ] = useState(Utill.screen.screenWidth);
    const [ screenHeight ] = useState(Utill.screen.screenHeight);
    const [ imageReq, setImageReq ] = useState([]);
    const [ starArray, setStarArray ] = useState([
        {
            id : 1,
            check : false,
        },
        {
            id : 2,
            check : false,
        },
        {
            id : 3,
            check : false,
        },
        {
            id : 4,
            check : false,
        },
        {
            id : 5,
            check : false,
        },
    ])
    const [ rating, setRating ] = useState(0);

    _goBack = () => {
        {navigation.getParam('my')==true?navigation.navigate('MyReview') : navigation.navigate('TabBooked')}
    }

    handleAndroidBackButton(_goBack);

    const _picker = async (item) => {
       await ImagePicker.showImagePicker(options,(response)=>{
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                const source = { uri: response.uri };
                setImageReq(imageReq.concat(response.uri));
                _addSource(source);
              }
        })
    }

    const _textListener = ( text ) => {
        setContent(text)
        console.log(content,content.length);
        if(content.length>=5)setCanPress(true);
        else setCanPress(false);
    }

    const _addSource = (source) =>{
        const length = imageArray.length-1 ;
        if(length>=3){
            alert('사진은 총 세장까지 올릴 수 있습니다.');
            return;
        }
        setImageArray(imageArray.map(
            (item, i) => {
                if(i===length){
                    return {...item,source};
                }else{
                    return item;
                }
            }
        ).concat({
            id : imageArray.length,
            source : addImageSource,
            isLoaded : false,
        }));
    }

    const _deleteSource = (item) => {   //view && req remove
        setImageArray(
            imageArray.filter(info => info.source !== item.source)
        );
        setImageReq(
            imageReq.filter(info => info !== item.source.uri)
        );
    }

    const _updateRating = async(id) => {
        setStarArray(starArray.map(
            item => {
                if(item.id <= id){
                    return {...item,check : true}
                }else{
                    return  {...item, check : false}
                }
            }
        ))
        setRating(id);
    }
    const _uploadPhoto = async(data) => {       //upload(s3) 
        const res = await API.uploadPhoto(data);
        return JSON.stringify(res.data);
    }

    const _uploadReview = async() => {  // review upload
        var image = await _uploadPhoto(imageReq);
        if(image===undefined)image='[]';
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const data = {
            content,
            rating,
            reviewId,
            image,
            isUpdate,
        }
        console.log(data);
        const res = await API.reviewWirte(token,data);
        console.log(res);
        if(res){
            if(isUpdate==='false'){
                Toast.show('리뷰가 등록되었습니다!');
                navigation.navigate('TabBooked');
                await API.postDNpoint(token,{
                    phone,
                    type : 'save',
                    diff : ReviewAward,
                    name : storeName,
                });
                const res = await API.me(token);
                console.log(res.point);
                dispatch(User.updatepoint(res.point));
            }else {
                Toast.show('리뷰가 수정되었습니다!');
                navigation.navigate('MyReview');
            }
        }
        else alert('통신 상태를 확인해 주세요');
    }

    const options = {
        title: '올리실 사진을 선택해주세요.',
        takePhotoButtonTitle : '직접 사진 찍기',
        chooseFromLibraryButtonTitle : '사진첩으로 가기',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
    
    return (      

        
        <TouchableWithoutFeedback onPress  = {()=>{Keyboard.dismiss();}}>
            <View style = {styles.container}>
            <NavSwitchHead navigation = {navigation} title = {storeName} navtitle={navigation.getParam('my')==true?'MyReview' : 'TabBooked'}/>
                <View style ={styles.contentContainer}>
                    <View style = {[styles.header, {marginTop: Utill.screen.Screen.customHeight(20)}]}>
                        <Text style = {{color: "#CCCCCC"}}>별점을 선택해주세요</Text>
                        <View style = {[styles.contentStar, {marginTop: Utill.screen.Screen.customHeight(20)}]}>
                            {starArray.map(
                                item => (
                                    <TouchableOpacity style = {styles.star} onPress = {()=>_updateRating(item.id)}>
                                        <Image source = {!item.check?defaultStar:checkStar} style = {styles.star}/>
                                    </TouchableOpacity>
                                        ))}
                        </View>
                    </View>
                    <View style={[
                        styles.textInputContainer, 
                        {width: Utill.screen.Screen.customWidth(330),
                        height: Utill.screen.Screen.customHeight(150),
                        marginTop: Utill.screen.Screen.customHeight(30)}]}>

                        <KeyboardAwareScrollView>
                        <TextInput 
                            placeholder = {'솔직한 리뷰를 작성해주세요.'}
                            editable = {true}
                            maxLength = {1000}
                            multiline = {true}
                            numberOfLines = {6}
                            onChangeText = { (text)=>_textListener(text) }
                            style = {[styles.textInput,{width: Utill.screen.Screen.customWidth(306),
                                    height: Utill.screen.Screen.customHeight(120)}]} />
                        </KeyboardAwareScrollView>

                    </View>
                    {isLoaded && <ActivityIndicator style = {styles.indicator}/>}
                        <View style = {[styles.imagePickerContainer, {width: Utill.screen.Screen.customWidth(330)}]}>
                            {imageArray.map( item => (
                                <TouchableOpacity
                                    style = {[styles.picker, {marginTop: Utill.screen.Screen.customHeight(15)}]}
                                    onPress = {()=>
                                    { if(item.source===defaultImageSource || item.source===addImageSource){_picker(item)} else _deleteSource(item);}}>
                                <FastImage
                                    source = {item.source} 
                                    style = {styles.addimage} />
                                {isLoaded && <ActivityIndicator style = {styles.indicator}/>}
                                {
                                    <Dialog.Container visible = {visible}>
                                    <Dialog.Title>사진 삭제</Dialog.Title>
                                    <Dialog.Description>사진을 삭제하시겠습니까?</Dialog.Description>
                                    <Dialog.Button label="취소" onPress = {()=>setVisible(false)} />
                                    <Dialog.Button label="삭제"
                                        onPress = {()=>{setVisible(false);_deleteSource(item)}}/>
                                    </Dialog.Container>
                                }
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style = {[styles.noticeTextContainer, {marginTop: Utill.screen.Screen.customHeight(15),
                            marginLeft: Utill.screen.Screen.customWidth(15),
                            marginRight: Utill.screen.Screen.customWidth(15),
                            width: Utill.screen.Screen.customWidth(320)}]}>
                            <Text style={{fontSize: 12, color: "#CCCCCC"}}>
                                식당과 관계없는 글, 광고성, 명예훼손, 욕설, 비방글 등은 예고 없이 삭제됩니다.</Text>
                        </View>
                </View>
                {canPress ? 
                    (<TouchableOpacity style={[styles.writeButton, {width: screenWidth, height: Utill.screen.Screen.customHeight(50)}]} onPress = {_uploadReview}>
                        <Text style={styles.writeButtonText}>작성하기</Text>
                    </TouchableOpacity>) : 
                    (<View style={[styles.unWriteButton, {width: screenWidth, height: Utill.screen.Screen.customHeight(50)}]}>
                        <Text style={styles.unWriteButtonText}>작성하기</Text>
                    </View>)}
            </View>
        </TouchableWithoutFeedback>
    );
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        phone : state.User._root.entries[3][1],
    }
}

export default connect(mapStateToProps)(ReviewWrite);

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : Utill.color.white,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center'
    },
    header : {
        justifyContent : 'center',
        alignItems :'center',
    },
    imagePickerContainer :{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    textInputContainer:{
        paddingLeft : 15,
        paddingRight : 15,
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 3,},
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        backgroundColor: "#FFFFFF",
        justifyContent: 'center'
    },
    textInput : {
        fontSize: 14,
        fontFamily: "NanumSquareOTFR"
    },
    picker : {
        alignItems : 'center',
        justifyContent : 'center',
        width : 60,
        height : 60,
        marginRight : 6
    },
    addimage : {
        width : 60,
        height :60,
    },
    indicator: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        justifyContent: "center",
        alignItems: "center",
    },
    contentStar : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
    },
    star : {
        width : 41.87,
        height : 40,
        marginRight : 13.1,
    },
    noticeTextContainer:{
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    writeButton :{
        backgroundColor: '#733FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    writeButtonText:{
        color: '#FFFFFF',
        fontSize: 16
    },
    unWriteButton :{
        backgroundColor: '#CCCCCC',
        justifyContent: 'center',
        alignItems: 'center'
    },
    unWriteButtonText:{
        color: '#FFFFFF',
        fontSize: 16
    }
})