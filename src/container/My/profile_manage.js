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
    Alert,
} from 'react-native';
import * as API from '../../utill/API';
import * as Utill from '../../utill';
import ImagePicker from 'react-native-image-picker';
import Dialog from "react-native-dialog";
import { useDispatch, connect } from 'react-redux';
import {LogoutModal,LoadingModal,SucessionButton} from '../../component/common'
const defaultImageSource = ({uri: 'icon_add_photo'});

const Profile = ({navigation, userid, nickname, image, phone, point, name}) => {
    
    const [id, idChange] = useState(userid);
    const [nick, nickChange] = useState(nickname);
    const [photo, setPhoto] = useState();
    const [phonenum, phoChange] = useState(phone);
    const [pt, ptChange] = useState(point);
    const [nm, nmChange] = useState(name);
    const [alertVisible , setAlertVisible] = useState(false);
    const [isLoadingVisible, setIsLoadingVisible] = useState(false);
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

    const _onPressLogout = () => {
        setAlertVisible(true);
    }
    const _onPressLogoutConfirm = () => {
        setAlertVisible(false);
        setIsLoadingVisible(true);
        console.log('탈퇴');
        // setTimeout(()=> {
        //     _logout();
        // }, 100);
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
        <View style={styles.container}>
            
                     
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
                <Text style={{height : 21, fontSize : 16}}> {nick} </Text>
                <TouchableOpacity
                    onPress = {()=>navigation.push('Nick',
                        {
                            id,
                            nickname : nick,
                        },
                    )
                }
                >
                        <Text>
                            닉변
                        </Text>
                </TouchableOpacity>
            </View>
            <Text style={{fontSize : 12}}>계정정보</Text>
            <View style={styles.garo}>
                <Text>이름</Text>
                <Text>{nm}</Text>
            </View>
            <View style={styles.garo}>
                <Text>휴대폰 번호</Text>
                <Text>{phonenum}</Text>
            </View>
            <Text>계정보안</Text>
            <LoadingModal visible={false} />
            <LogoutModal 
                visible={alertVisible}
                title={null}
                subTitle={`디쉬나우를 탈퇴하시겠습니까?`}
                buttonOkText={'탈퇴'}
                buttonCancelText={'취소'}
                buttonOkTextColor={Utill.color.primary1}
                onPress={()=>_onPressLogoutConfirm()}
                onPressCancel={()=>setAlertVisible(false)}
            />  
            <SucessionButton
                onPress = {()=>_onPressLogout}
                title = '디쉬나우 탈퇴'
                source = {{uri : 'icon_x'}}
            /> 
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
    container : {
        paddingTop : Utill.screen.topSafe,
        flex : 1,
    },
    pht : {
        height : 20,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#4682B4',
    },
    garo : {
        height : 20,
        flexDirection : 'row',
    },
})