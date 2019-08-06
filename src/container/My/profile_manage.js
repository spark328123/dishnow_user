import React, { useState, memo, useEffect } from 'react';
import { 
    Text, 
    View,
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
import * as API from '../../utill/API';
import * as Utill from '../../utill';
import ImagePicker from 'react-native-image-picker';
import Dialog from "react-native-dialog";
import { useDispatch, connect } from 'react-redux';

const defaultImageSource = ({uri: 'icon_add_photo'});

const Profile = ({navigation, userid, nickname, image, phone, point, name}) => {
    
    const [id, idChange] = useState(userid);
    const [nick, nickChange] = useState(nickname);
    const [photo, setPhoto] = useState(image);
    const [phonenum, phoChange] = useState(phone);
    const [pt, ptChange] = useState(point);
    const [nm, nmChange] = useState(name);

    const _handleChoosePhoto = async() => {
        const res = await _uploadPhoto(photo);
        const options = {
            noData : true,
        };
       ImagePicker.launchImageLibrary(options, response => {
            console.log("response", response);
            if(response.uri){
                setPhoto(response);
            }
       });
    }

    const _didMount = ()=>{
        let imageString = JSON.stringify(image);
        imageString = imageString.substring(4,imageString.length-4);
        setPhoto({uri :imageString});
        console.log(imageString);
        console.log(photo);
    }

    useEffect(()=>{
        _didMount();
    },[]);


    const _deleteSource = (item) => {   //view && req remove
        setImageArray(
            imageArray.filter(info => info.id !== item.id)
        );
        setImageReq(
            imageReq.filter(info => info !== item.source.uri)
        );
    }

    const _uploadPhoto = async(data) => {       //upload(s3) 
        const res = await API.uploadPhoto(data);
        return JSON.stringify(res.data);
    }

    const dispatch = useDispatch();
    
    return (      
        <View style={{flex : 1, marginLeft : 15, marginRight : 15}}>

            <TouchableOpacity onPress={()=>_handleChoosePhoto()}
                style = {{alignItems : 'center', marginTop : 15}}
            >
            {photo && (
                <Image
                source={{uri : photo.uri}}
                style={{ width: 90, height: 90 }}
                />
            )}

            {!photo && ( 
                <View
                style={{ width: 90, height: 90, backgroundColor : '#4682B4', }}
                />
            )}
            </TouchableOpacity>
            <View style={{justifyContent : 'center', flexDirection : 'row'}}>
                <TouchableOpacity
                    onPress = {()=>navigation.push('Nick',
                        {
                            id,
                            nickname : nick,
                        },
                    )
                }>
                <Text style={{fontSize : 16, color : '#111111', marginTop : 8}}> {nick} </Text>
                <Image source = {{uri : 'icon_profile_change'}} style = {{width : 10, height : 10}}
                />
                </TouchableOpacity>
            </View>
            <View style={styles.geajung}>
            <Text>계정정보</Text>
            </View>
            <TouchableOpacity style={styles.garo}>
                <View style={{width : '50%'}}>
                    <Text style={{fontSize : 14, color : '#555555', fontFamily : 'NanumSquareOTF' }}>이름</Text>
                </View>
                <View style={{width : '50%'}}>
                    <Text style={{fontSize : 16, color : '#111111', fontFamily : 'NanumSquareOTF', alignSelf: 'flex-end'}}>{nm}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.garo}>
                <View style={{width : '50%'}}>
                    <Text style={{fontSize : 14, color : '#555555', fontFamily : 'NanumSquareOTF' }}>이메일</Text>
                </View>
                <View style={{width : '50%'}}>
                    <Text style={{fontSize : 16, color : '#111111', fontFamily : 'NanumSquareOTF', alignSelf: 'flex-end'}}>이메일@입니다</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.garo}>
                <View style={{width : '50%'}}>
                    <Text style={{fontSize : 14, color : '#555555', fontFamily : 'NanumSquareOTF' }}>휴대폰 번호</Text>
                </View>
                <View style={{width : '50%'}}>
                    <Text style={{fontSize : 16, color : '#733FFF', fontFamily : 'NanumSquareOTF', alignSelf: 'flex-end'}}>{phonenum}</Text>
                </View>
            </TouchableOpacity>
            <View style = {styles.line}/>
            <View style={styles.geajung}>
            <Text >계정보안</Text>
            </View>

            <TouchableOpacity style={{height : 43, marginTop : 5, flexDirection : 'row'}}>
                <View style={{width : '50%'}}>
                    <Text style={{fontSize : 14, color : '#555555', fontFamily : 'NanumSquareOTF' }}>비밀번호 변경</Text>
                </View>
                <View style={{width : '50%', }}>
                    <View style={{alignSelf: 'flex-end'}}>
                      <Image source = {{uri : 'icon_rsquare_bracket'}} style = {{width : 9, height : 15}}/>
                    </View>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={{height : 43, flexDirection : 'row' }}>
                <View style={{width : '50%'}}>
                    <Text style={{fontSize : 14, color : '#555555', fontFamily : 'NanumSquareOTF' }}>디쉬나우 탈퇴</Text>
                </View>
                <View style={{width : '50%', }}>
                        <View style={{alignSelf: 'flex-end'}}>
                            <Image source = {{uri : 'icon_rsquare_bracket'}} style = {{width : 9, height : 15}}/>
                        </View>    
                </View> 
            </TouchableOpacity>
        </View>
    );
}

const mapStateToProps = (state) => {
    console.log(state);
    console.log(state.User._root.entries[6][1]);
    return {
        userid : state.User._root.entries[0][1],
        nickname : state.User._root.entries[2][1],
        image : state.User._root.entries[5][1],
        phone : state.User._root.entries[3][1],
        name : state.User._root.entries[6][1],
        point : state.User._root.entries[1][1],
    }
}

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
    pht : {
        height : 20,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#4682B4',
    },
    garo : {
        width : '100%',
        height : 43,
        flexDirection : 'row',
        alignItems : 'center',
    },
    geajung : {
        height : 42,
        justifyContent : 'center',
        fontSize : 12,
        color : '#555555',
        fontFamily : 'NanumSquareOTF'
    },
    line : {
        borderBottomWidth: 1,
        borderBottomColor:Utill.color.border,
    },

})