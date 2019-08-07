import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView} from 'react-native';
import {Button, BigButtonColor, BigButton, BigButtonBorder, Text, NavHead} from '../component/common/'
import * as API from '../utill/API';

const Register = (props) => {

    const { navigation } = props;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [verifyNum, setVerifyNum] = useState('');
    const [sex, setSex] = useState('male');
    const [birthDate, setBirth] = useState('');
    const [phoneRes, setPhoneRes] = useState('');
    const _phoneAuth = async() =>{
        const phoneRes = await API.phoneAuth({ phone: phone.text });
        alert('인증번호가 전송되었습니다.');
        setPhoneRes(phoneRes);
    }

    const _register = async () => {
        let token = navigation.getParam('token');
        const type = navigation.getParam('type');

        const regRes = await API.register({
            token,
            type,
            sex,
            birthDate: birthDate.text,
            phone: phone.text,
            name: name.text,
        })
        if (!regRes) {
            alert('정보를 확인해주세요');
            return;
        }
        const loginRes = await API.login({ token, type });
        API.setLocal(API.LOCALKEY_TOKEN, loginRes.token);

        alert('회원가입이 완료되었습니다.');
        navigation.navigate('Welcome', {
            name: name.text
        });
    }


    return (
        
        <ScrollView
            keyboardDismissMode="interactive"
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <NavHead title = {'회원가입'}/>
            <View style = {{paddingLeft : 15,paddingRight : 15}}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>본인 인증</Text>
            <Text style={{ fontSize: 12, marginBottom: 18 }}>허위/중복 가입을 막기 위한 절차입니다.</Text>
            <Text style={styles.textTitle}>이름</Text>
            <TextInput
                style={styles.textInput}
                selectionColor='#733FFF'
                placeholder={'이름을 입력하세요'}
                onChangeText={(text) => setName({ text })}
            />
            <Text style={styles.textTitle}>휴대폰번호</Text>
            <TextInput
                style={styles.textInput}
                selectionColor='#733FFF'
                placeholder={'휴대폰 번호를 ‘-‘ 없이 입력하세요.'}
                onChangeText={(text) => setPhone({ text })}
            />
            <Button title='인증번호 전송'
                onPress={_phoneAuth} />
            <Text style={styles.textTitle}>인증번호</Text>
            <TextInput
                style={[styles.textInput, { marginBottom: 50 }]}
                selectionColor='#733FFF'
                placeholder={'인증번호를 입력하세요.'}
                onChangeText={(text) => setVerifyNum({ text })}
            />
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 18}}>추가 정보</Text>
            <Text style={styles.textTitle}>성별</Text>
            <TextInput
                style={styles.textInput}
                selectionColor='#733FFF'
                placeholder={'남자,여자'}
                ChangeText={(text) => setSex({ text })}
            />
            <Text style={styles.textTitle}>생년월일</Text>
            <TextInput
                style={styles.textInput}
                selectionColor='#733FFF'
                placeholder={'생년월일을 입력하세요. ex)19901231'}
                onChangeText={(text) => setBirth({ text })}
            />
            <BigButtonColor     
                onPress={_register}
                title='회원가입' 
                disabled = {false}/>
            </View>
        </ScrollView>
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textTitle: {
        fontSize: 14,
        marginBottom: 12,
    },
    textInput: {
        fontSize: 16,
        marginBottom: 29,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    }
})