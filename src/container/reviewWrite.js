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

import * as API from '../utill/API';
import * as Utill from '../utill';
import ImagePicker from 'react-native-image-picker';
import Dialog from "react-native-dialog";
import { Text } from '../component/common/';



const defaultImageSource = {uri: 'icon_add_photo'};
const addImageSource = {uri: 'icon_add_photo_add'};
const defaultStar = {uri : 'icon_star_empty_review'};
const checkStar = {uri : 'icon_star_full_review'};

export default () => {
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ content, setContent ] = useState('');
    const [ imageArray, setImageArray ] = useState([{
        id : 0,
        source : defaultImageSource,
        isLoaded : false,
    }]);
    const [ visible, setVisible ] = useState(false);

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

    const _addSource = (source) =>{
        const length = imageArray.length-1 ;
        setImageArray(imageArray.map(
            (item, i) => {
                if(i===length){
                    return {...item,source}
                }else{
                    return item
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
            rating : 5,
            reviewId : 93,
            image
        }
        const res = await API.reviewWirte(token,data);
        if(res)alert('리뷰가 등록되었습니다!');
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
        <TouchableWithoutFeedback 
        onPress  = {()=>{Keyboard.dismiss();}}>
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Text>별점을 선택해주세요</Text>
                <View style = {styles.contentStar}>
                    {starArray.map(
                        item => (
                            <TouchableOpacity style = {styles.star} onPress = {()=>_updateRating(item.id)}>
                            <Image source = {!item.check?defaultStar:checkStar} style = {styles.star}/>
                            </TouchableOpacity>
                        )
                    )}
                </View>
            </View>
            <TextInput
                style = {[styles.textinput]}
                placeholder = {'솔직한 리뷰를 작성해주세요.'}
                editable = {true}
                maxLength = {1000}
                multiline = {true}
                numberOfLines = {6}
                onChangeText = { (text) => setContent(text)}
             />
             {isLoaded && <ActivityIndicator style = {styles.indicator}/>}
             <ScrollView horizontal = {true}>
            <View style = {{flexDirection: 'row'}}>
                {imageArray.map(
                item => 
                (
                    <TouchableOpacity
                        style = {styles.picker}
                        onPress = {()=>{
                            if(item.source===defaultImageSource ||
                                item.source===addImageSource){_picker(item)}
                            else _deleteSource(item);
                        }}> 
                        <Image 
                            source = {item.source} 
                            style = {styles.addimage}                        
                        
                        />
                        {isLoaded && <ActivityIndicator style = {styles.indicator}/>}
                        {
                        <Dialog.Container
                        visible = {visible}>
                        <Dialog.Title>사진 삭제</Dialog.Title>
                        <Dialog.Description>
                            사진을 삭제하시겠습니까?
                        </Dialog.Description>
                        <Dialog.Button label="취소"
                            onPress = {()=>setVisible(false)} />
                        <Dialog.Button label="삭제"
                            onPress = {()=>{setVisible(false);_deleteSource(item)}} 
                            />
                        </Dialog.Container>
                        }
                    </TouchableOpacity>
                    )
                )}
            </View>
            </ScrollView>
            <Text>
             식당과 관계없는 글, 광고성, 명예훼손, 욕설, 비방글 등은 예고 없이 삭제됩니다.
             </Text>
             <Button
                title = '작성하기'
                onPress = {_uploadReview}
                >
             </Button>
        </View>  
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingLeft : 20,
        paddingRight : 20,
    },
    header : {
        marginTop : 50,
        justifyContent : 'center',
        alignItems :'center',
        marginBottom : 30
    },
    content : {
        
    },
    textinput : {
        paddingLeft : 10,
        paddingRight : 10,
        height: 200,
        borderColor: 'gray',
        borderWidth: 1
    },
    picker : {
        marginTop : 15,
        marginBottom : 14,
        alignItems : 'center',
        justifyContent : 'center',
        width : 60,
        height : 60,
        marginRight : 6,
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
        marginTop : 20,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',

    },  
    star : {
        width : 41.87,
        height : 40,
        marginRight : 13.1,
    }
})
