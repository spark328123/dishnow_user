import * as fetch from '../../utill/fetch'

export const apiUrl = 'http://54.180.6.107:8001/api/host/'; 


export function importTest(temp) {
    console.log(temp);
    return true;
}

export const requestGetServer = (token, data) => {
    const url = `${apiUrl}reservation/request`;
    return fetch.getAuthServer(url, token, data)
    .then(res => res.json())
    .then(res => ({data : res}))
    .catch(error => ({error})); 
}

export const requestAccept = (token, payload) => {
    const url = `${apiUrl}reservation/accept`;
    return fetch.putAuthServer(url, token, payload)
    .then(res => ({data : true}))
    .catch(error => ({error})); 
}

export const requestReject = (token, payload) => {
    const url = `${apiUrl}reservation/reject`;
    return fetch.putAuthServer(url, token, payload)
    .then(res => ({data : true}))
    .catch(error => ({error})); 
}
