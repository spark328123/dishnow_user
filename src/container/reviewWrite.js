import React, { useState } from 'react';
import { View,
    Text,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image'
import * as API from '../utill/API';
import * as Utill from '../utill';
import Images from '../assets/images';
import ImagePicker from 'react-native-image-picker';
const defaultImageSource = Images.images.icon_addimage;
const addImageSource = Images.images.icon_x;

export default () => {
    const [ content, setContent ] = useState('');
    const [ imageArray, setImageArray ] = useState([{
        id : 0,
        source : defaultImageSource,
        isLoaded : false,
    }]);

    const _picker = async (i) => {
        await ImagePicker.showImagePicker(options,(response)=>{
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                const source = { uri: response.uri };
                _addSource(source);
              }
        })
    }

    const _addSource = (source) =>{
        setImageArray(imageArray.map(
            item => item.id === imageArray.length-1 ?
             {...item, source} : item
        ).concat({
            id : imageArray.length,
            source : addImageSource,
            isLoaded : false,
        }))
    }



    const Show = () => {    
        let rows = [];
        for(var i=0; i< imageArray.length; i++){
            rows.push(
                <TouchableOpacity
                    style = {styles.picker}
                    onPress = {_picker}
                > 
                    <FastImage
                      
                        style = {styles.addimage}
                        source = {imageArray[i].source}
                    />
                    {imageArray[i].isLoaded && <ActivityIndicator style = {styles.indicator}/>}
                </TouchableOpacity>
            )
        }
        return rows;
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
                <Text>*****</Text>
            </View>
            <TextInput
                style = {[styles.textinput]}
                placeholder = {'솔직한 리뷰를 작성해주세요.'}
                editable = {true}
                maxLength = {1000}
                multiline = {true}
                numberOfLines = {6}
                onChangeText = { (text) => setContent(text)
                }
             />
             <ScrollView horizontal = {true}>
            <View style = {{flexDirection: 'row'}}>
                <Show />
            </View>
            </ScrollView>
            <Text>
             식당과 관계없는 글, 광고성, 명예훼손, 욕설, 비방글 등은 예고 없이 삭제됩니다.
             </Text>
             <Button
                title = '작성하기'
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
        backgroundColor : Utill.color.secondary2,
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
})