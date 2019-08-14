import * as fetch from './fetch'
import AsyncStorage from '@react-native-community/async-storage';

export const apiUrl = 'http://54.180.6.107:8001/api/user/'; 

export const LOCALKEY_TOKEN = 'LOC_STORE_KEY_TOKEN'
export const PUSH_TOKEN = 'PUSH_TOKEN';

export const getLocal =  async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch(e) {
        console.log(e);
    }
}

export const setLocal = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, data);
    } catch(e) {
        console.log(e);
    }
}

export const getPush = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch(e) {
        console.log(e);
    }
}

export const setPush = async (key ,data) => {
    try {
        await AsyncStorage.setItem(key,data);
    } catch(e) {
        console.log(e);
    }
}

export const uploadPhoto = (image) => {
    const url = `http://54.180.6.107:8001/api/upload`;
    return fetch.postMultipartServer(url, image)
    .then(res => res.json())
    .then(res => {return {data: res.location}}) // res 을 data 로
    .catch(error => ({error})); 
}

export const register = (data) => {
    const url = `${apiUrl}user/register`;
    return fetch.postServer(url, data)
    .then(res => res.json())
    .catch(error => ({error})); 
}

export const login = (data) => {
    const url = `${apiUrl}user/login`;
    return fetch.postServer(url, data)
    .then(res => res.json())
    .catch(error => ({error})); 
}

export const me = (token) => {
    const url =`${apiUrl}user/me`;
    return fetch.getAuthServer(url, token)
    .then(res => res.json())
    .catch(error => ({error}));   
}

export const phoneAuth = (phone) => {
    const url = `${apiUrl}user/phoneAuth`;
    return fetch.getServer(url, phone)
    .then(res=> res.json())
    .catch(error => ({error}));  
}

export const setPushToken = (token, data) => {
    const url = `${apiUrl}user/pushToken`;
    return fetch.putAuthServer(url,token,data)
    .then(res => ({isSuccess : res? true: false}))
    .catch(error=>({error}));
}

export const reservation = (token, data) => {
    const url = `${apiUrl}reservation`;
    return fetch.postAuthServer(url,token,data)
    .then(res => res.json())
    .catch(error=>({error}));
}

export const reservation_confirm = (token, data) => {
    const url = `${apiUrl}reservation/confirm`;
    return fetch.putAuthServer(url,token,data)
    .then(res => ({isSuccess : res?true : false}))
    .catch(error=>{error});
}

export const reservation_cancel = (token, data) => {
    const url = `${apiUrl}reservation/cancel`;
    return fetch.putAuthServer(url,token,data)
    .then(res => ({isSuccess : res?true : false}))
    .catch(error=>{error});
}

export const showRes = (token) => {
    const url = `${apiUrl}review`;
    return fetch.getAuthServer(url, token)
    .then(res=> res.json())
    .catch(error => ({error}));  
}

export const reviewWirte = (token, data) => {
    const url = `${apiUrl}review`;
    return fetch.putAuthServer(url,token,data)
    .then(res => ({isSuccess : res ? true: false}))
    .catch(error=>({error}));
}

export const reviewDelete = (token, data) => {
    const url = `${apiUrl}review/`
    return fetch.deleteAuthServer(url,token,data)
    .then(res => ({isSuccess : res ? true : false}))
    .catch(error=>({error}));
}

export const reviewMe = (token) => {
    const url = `${apiUrl}review/me`;
    return fetch.getAuthServer(url,token)
    .then(res=>res.json())
    .catch(error=>({error}));
}

export const noticeTitle = (token,data) => {
    const url = `${apiUrl}notice`;
    return fetch.getAuthServer(url,token,data)
    .then(res=>res.json())
    .catch(error=>({error}));
}

export const noticeContent = (token,data) => {
    const url = `${apiUrl}notice/detail`;
    return fetch.getAuthServer(url,token,data)
    .then(res=>res.json())
    .catch(error=>({error}));
}

export const showStoreDetail = (token,data) => {
    const url = `${apiUrl}store/detail`;
    return fetch.getAuthServer(url,token,data)
    .then(res=>res.json())
    .catch(error=>({error}));
}

export const showStoreReview = (token,data) => {
    const url = `${apiUrl}store/review`;
    return fetch.getAuthServer(url,token,data)
    .then(res=>res.json())
    .catch(error=>({error}));
}

export const changenick = (token,data) => {
    const url = `${apiUrl}user/nickname`;
    return fetch.putAuthServer(url,token,data)
    .then(res => ({isSuccess : res? true : false}))
    .catch(error => ({error})); 
}

export const changeprofile = (token,data) => {
    const url = `${apiUrl}user/profile`;
    return fetch.putAuthServer(url,token,data)
    .then(res => ({isSuccess : res? true : false}))
    .catch(error => ({error})); 
}

export const getDNpoint = (token) => {
    const url = `${apiUrl}user/dishnowPoint`;
    return fetch.getAuthServer(url,token)
    .then(res=>res.json())
    .catch(error => ({error})); 
}

export const postDNpoint = (token,data) =>{
    const url = `${apiUrl}user/dishnowPoint`;
    return fetch.postAuthServer(url,token,data)
    .then(res =>res.json())
    .catch(error => ({error})); 
}