import React, { useState, useEffect} from 'react';
import { View, StyleSheet, TextInput, ScrollView,Image, TouchableOpacity, Alert} from 'react-native';
import {Button, BigButtonColor, BigButton, BigButtonBorder, CustomAlert1, Text, NavSwitchHead} from '../component/common/'
import {RegistInput, RegisterInputPhone, RegisterInputCode, } from '../component/register';
import {removeAndroidBackButtonHandler,handleAndroidBackButton} from '../component/common/hardwareBackButton'
import * as API from '../utill/API';
import user, * as User from '../store/modules/user';
import regs, * as Regs from '../store/modules/regs';
import {useSelector, useDispatch} from 'react-redux';
import * as Utill from '../utill';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast'
const Register = (props) => {

    const dispatch = useDispatch();

    const [valid, setValid] = useState(
        {vname :false, vphone : false, vcode: null, vpassword: false, 
            vpassword1 : false, vstatus: false});

    const { navigation } = props;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [sex, setSex] = useState('nop');
    const [birthDate, setBirth] = useState('');
    const [code, setCode] = useState('');
    const [phoneRes, setPhoneRes] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [nickname, setNickname] = useState('');
    const [timerCount, setTimerCount] = useState(0);
    const [isitokay, setIsitokay] = useState(false);
    const [isitemail, setisitemail] = useState(navigation.getParam('type')==='email');
    const [man, setMan] = useState(false);
    const [woman, setWoman] = useState(false);
    const [nosex, setNosex] = useState(false);
    const [alertTxt,setAlertTxt] = useState('전송되었습니다.');
    const [alertMainTxt,setAlertMainTxt] = useState('인증');
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [type] = useState(navigation.getParam('type'));
    const [token] = useState(navigation.getParam('token'));
    const [kakaoProfile] = useState(navigation.getParam('kakaoProfile'));
    const [faceBookProfile] = useState(navigation.getParam('faceBookProfile'));
    const [naverProfile] = useState(navigation.getParam('naverProfile'));

    _goBack = () =>{
        navigation.navigate('Terms',{
            type,
            token,
            kakaoProfile,
            faceBookProfile,
            naverProfile,
        })
    }
    handleAndroidBackButton(_goBack);
    const _onPressAlertCancel = () => {
        setIsAlertVisible(false);
    }

    const _onPressAlertOk = () => {
        setIsAlertVisible(false);
    }

    const _renderSex = ({check}) => {
        console.log(check);

        if(check){
            return(
                <Image style = {{width : 22,height : 22,marginRight:10}} source = {{uri : 'icon_check_box_purple'}}/>
            )
        }
        else{
            return(
                <Image style = {{width : 22,height : 22,marginRight:10}} source = {{uri : 'icon_check_box_grey'}}/>
            )
        }
    }

    const _onPressMan = (man) => {
        if(man===false){
            setMan(true);
            setWoman(false);
            setNosex(false);
            setSex('male');
        }else{
            setMan(false);
        }
    }
    const _onPressWoman = (man) => {
        if(man===false){
            setMan(false);
            setWoman(true);
            setNosex(false);
            setSex('female');
        }else{
            setWoman(false);
        }
    }
    const _onPressNosex = (man) => {
        if(man===false){
            setMan(false);
            setWoman(false);
            setNosex(true);
            setSex('d');
        }else{
            setNosex(false);
        }
    }

    const _phoneAuth = async() =>{
        const phoneRes = await API.phoneAuth({ phone: phone.text });
        setPhoneRes(phoneRes);
        setIsAlertVisible(true);
        
        console.log('phoneRes:' + phoneRes);
        console.log('ps:' + phone.text );
    }


    const _register = async () => {
        console.log('isisemail : ' + isitemail);

        if(!isitemail){
            let token = navigation.getParam('token');
            const type = navigation.getParam('type');
         
            const res1 = /^[가-힣]{2,25}|[a-zA-Z]{2,25}\s[a-zA-Z]{2,25}$/.test(name.text);
            const res2 = /^\d{11}$/.test(phone.text);
            const res5 = /^[가-힣A-Za-z0-9]{2,20}$/.test(nickname.text)&&nickname.text!==undefined;
            const res7 = /^\d{8}$/.test(birthDate.text);
            const res8 = man||woman||nosex;

            if(!res1){
                Toast.show('이름을 확인해주세요');
            }
            else if(!res2){
                Toast.show('휴대폰 번호를 확인해주세요');
            }
            else if(!isitokay){
                Toast.show('휴대폰 인증을 완료해주세요');
            }
            else if(!res8){
                Toast.show('성별을 확인해주세요');
            }
            else if(!res7){
                Toast.show('생년월일을 확인해주세요');
            }
            else if(!res5){
                Toast.show('닉네임을 확인해주세요');
            }
            else if(isitokay&&res1&&res2&&res5) {
                const regRes = await API.register({
                    token,
                    type,
                    sex,
                    birthDate: birthDate.text,
                    phone: phone.text,
                    name: name.text,
                });
                
                console.log(regRes);
                const loginRes = await API.login({ token, type });
                if(type === 'kakao'){    
                    if(navigation.getParam('kakaoProfile')!=undefined){  
                        await API.changeprofile(loginRes.token,{
                            image : navigation.getParam('kakaoProfile')
                        });
                    }else{
                        await API.changeprofile(loginRes.token,{
                            image : `["https://ssl.pstatic.net/static/pwe/address/img_profile.png"]`
                        });
                    }
                }else if(type ==='facebook'){
                    await API.changeprofile(loginRes.token,{
                        image : navigation.getParam('faceBookProfile')
                    });
                }else if(type ==='naver'){
                    await API.changeprofile(loginRes.token,{
                        image : navigation.getParam('naverProfile')
                    });
                }else{
                    await API.changeprofile(loginRes.token,{
                        image : `["https://ssl.pstatic.net/static/pwe/address/img_profile.png"]`
                    });
                }
                await API.changenick(loginRes.token,{
                    nickname : nickname.text
                });
                API.setTimer(API.TAB_TIMER, JSON.stringify(new Date().getTime() - 120000));
                await API.setLocal(API.LOCALKEY_TOKEN, loginRes.token);
                dispatch(Regs.updateemail(email));
                dispatch(User.updatenickname(nickname.text));
                dispatch(User.upadtename(name));
                dispatch(User.updatephone(phone));
                navigation.navigate('Welcome', {
                    name: name.text
                });
            }
            else{
                Toast.show('정보를 확인해주세요');
                return;
            }
        }//////////////////////////////////////////////////////////
        else{
            let token = email.text + '/' + password.text;
            const type = navigation.getParam('type');
           
            const res1 = /^[가-힣]{2,25}|[a-zA-Z]{2,25}\s[a-zA-Z]{2,25}$/.test(name.text);
            const res2 = /^\d{11}$/.test(phone.text);
            const res3 = /^[A-Za-z0-9?=.*[~`!@#$%\^&*()-+=]{6,15}$/.test(password.text)&&password.text!==undefined;
            const res4 = (password.text===password1.text);
            const res5 = /^[가-힣A-Za-z0-9]{2,20}$/.test(nickname.text)&&nickname.text!==undefined;
            const res6 = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(email.text)&&email.text!==undefined;
            const res7 = /^\d{8}$/.test(birthDate.text);
            const res8 = man||woman||nosex;
    
            if(!res1){
                Toast.show('이름을 확인해주세요');
            }
            else if(!res2){
                Toast.show('휴대폰 번호를 확인해주세요');
            }
            else if(!isitokay){
                Toast.show('휴대폰 인증을 완료해주세요');
            }
            else if(!res8){
                Toast.show('성별을 선택해주세요');
            }
            else if(!res7){
                Toast.show('생년월일을 확인해주세요');
            }
            else if(!res6){
                Toast.show('이메일을 확인해주세요');
            }
            else if(!res3){
                Toast.show('비밀번호 형식을 맞춰주세요');
            }
            else if(!res4){
                Toast.show('비밀번호가 일치하지 않습니다');
            }
            else if(!res5){
                Toast.show('닉네임을 확인해주세요');
            }
            else if(isitokay&&res1&&res2&&res3&&res4&&res5&&res6) {
                const regRes = await API.register({
                    token,
                    type : navigation.getParam('type'),
                    sex,
                    birthDate: birthDate.text,
                    phone: phone.text,
                    name: name.text,
                })
                console.log(regRes);
                const loginRes = await API.login({ token, type });
                console.log(loginRes);
                await API.changenick(loginRes.token,{
                    nickname : nickname.text
                });
                await API.changeprofile(loginRes.token,{
                    image : `["https://ssl.pstatic.net/static/pwe/address/img_profile.png"]`
                })
                API.setTimer(API.TAB_TIMER, JSON.stringify(new Date().getTime() - 120000));
                await API.setLocal(API.LOCALKEY_TOKEN, loginRes.token);
                dispatch(Regs.updateemail(email));
                dispatch(User.updatenickname(nickname));
                dispatch(User.upadtename(name));
                dispatch(User.updatephone(phone));
                navigation.navigate('Welcome', {
                    name: name.text
                });
            }
            else{
                Toast.show('정보를 확인해주세요');
                return;
            }
        }
    }

    const _onPressVerifyCode = (injung) => {
        const st_injung = JSON.stringify(injung);
        if(st_injung===code.text&&code.text!==undefined){
            setAlertTxt('인증되었습니다.');
            setIsAlertVisible(true);
            setIsitokay(true);
        }
        else{
            setAlertTxt('인증 번호가 틀렸습니다.');
            setIsAlertVisible(true);
        }
    }

    return (
        <KeyboardAwareScrollView>

        <View style={{flex : 1}}>
        
        <CustomAlert1
            visible={isAlertVisible} 
            mainTitle={alertMainTxt}
            mainTextStyle = {styles.txtStyle}
            subTitle = {alertTxt}
            subTextStyle = {styles.subtxtStyle}
            buttonText1 = {'확인'}
            onPress={_onPressAlertOk} 
        />
        <ScrollView
            keyboardDismissMode="interactive"
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <NavSwitchHead navigation = {navigation} navtitle = {'Terms'} title = {'회원가입'} token={token} type={type} kakaoProfile={kakaoProfile} faceBookProfile={faceBookProfile} naverProfile={naverProfile}  />
            
            <View style = {{paddingLeft : 15,paddingRight : 15}}>
            <View style = {{flexDirection:'row',marginBottom:13}}>
                    <Image 
                        style ={{width : 4, height : 4,marginRight:3}}
                        source = {{uri:'dot_grey'}}
                    />
                    <Image 
                        style ={{width : 4, height : 4}}
                        source = {{uri:'dot_purple'}}
                    />
            </View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>본인 인증</Text>
            <Text style={{ fontSize: 12, marginBottom: 18 }}>허위/중복 가입을 막기 위한 절차입니다.</Text>
            <RegistInput 
                value = {name} 
                title='이름'
                placeholder='이름을 입력하세요'
                onChangeText={(text)=>setName({text})}
            />
            <RegisterInputPhone 
                value = {phone} 
                title='휴대폰 번호'
                placeholder={`휴대폰 번호를 '-' 없이 입력하세요`}
                onChangeText= {text=>setPhone({text})}
                onPress = {_phoneAuth}
            />
            <RegisterInputCode
                value = {phoneRes} 
                title='인증번호'
                placeholder='인증번호를 입력하세요'
                onChangeText={(text)=>setCode({text})}
                isValid = {valid.code}
                onPress={()=>_onPressVerifyCode(phoneRes)}
                time={timerCount}
            />
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 18, marginTop : 16}}>추가 정보</Text>
            <Text style={styles.textTitle}>성별</Text>
            <View style={{flexDirection : 'row', marginBottom : 12}}>
                <TouchableOpacity onPress = {()=>_onPressMan(man)} style={{flexDirection : 'row'}}>
                    <_renderSex check={man}></_renderSex><Text style ={{marginRight:48}}>남자</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>_onPressWoman(woman)} style={{flexDirection : 'row'}}>
                    <_renderSex check={woman}></_renderSex><Text style ={{marginRight:48}}>여자</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>_onPressNosex(nosex)} style={{flexDirection : 'row'}}>
                    <_renderSex check={nosex}></_renderSex><Text style ={{marginRight:48}}>선택안함</Text>
                </TouchableOpacity>
            </View>
            <RegistInput
                keyboardType={'number-pad'}
                value = {birthDate} 
                title='생년월일'
                placeholder='생년월일을 입력하세요 ex)19901231'
                onChangeText={(text)=>setBirth({text})}
            />
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 18, marginTop : 16}}>아이디 정보</Text>
            {isitemail&&(
                    <RegistInput
                    value = {email} 
                    title='이메일'
                    placeholder='이메일을 입력하세요'
                    onChangeText={(text)=>setEmail({text})}
                />
            )}
            {isitemail && (
                <RegistInput 
                    secureTextEntry = {true}
                    value = {password} 
                    title='비밀번호'
                    placeholder='영문,특수문자,숫자 6~15자의 비밀번호를 설정하세요'
                    errorMsg='영문, 숫자 6~15자의 비밀번호를 설정하세요'
                    onChangeText={(text)=>setPassword({text})}
                />
            )}
            {isitemail && (
                <RegistInput
                    secureTextEntry = {true}
                    value = {password1} 
                    title='비밀번호 확인'
                    placeholder='비밀번호를 다시 한 번 입력하세요'
                    onChangeText={(text)=>setPassword1({text})}
                />
            )}
            <RegistInput
                value = {nickname} 
                title='닉네임'
                placeholder='닉네임을 입력하세요(2~20자)'
                onChangeText={(text)=>setNickname({text})}
            />
                <View style={styles.nextButtonArea}>
                <BigButtonColor 
                    disabled={false}
                    title={'회원가입'} 
                    style={styles.nextButton} 
                    onPress={_register}>
                </BigButtonColor>
                </View>
            </View>
        </ScrollView>
        </View>
        </KeyboardAwareScrollView>
    )
}
export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Utill.color.white
    },
    textTitle: {
        color : Utill.color.itemTitle,
        fontSize: 14,
        marginBottom: 12,
    },
    textInput: {
        fontSize: 16,
        marginBottom: 29,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    nextButtonText : {
        fontSize : 18, 
        color : Utill.color.primary1,
    },
    nextButton : {
        width : 263,
        height : 51,
        borderRadius : 25.5,
        borderWidth : 0.5,
        borderColor : Utill.color.primary1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : Utill.color.onColorBackground
    },
    nextButtonArea : {
        flexDirection : 'row',
        justifyContent : 'center',
        marginTop : 39,
        marginBottom : 50,
    },
    txtStyle : {
        marginBottom : 9,
        fontSize : 18,
        fontWeight : 'bold',
        color : Utill.color.textBlack,
        textAlign : 'center',
    },
    subtxtStyle : {
        marginBottom : 35,
        width : Utill.screen.Screen.customWidth(262),
        fontSize : 16,
        color : Utill.color.textBlack,
        textAlign : 'center',
    },
})