const HEADER_APPJSON = 'application/json';
const HEADER_WWWENCODED = 'application/x-www-form-urlencoded;charset=UTF-8';
const HEADER_MULTIPART = 'multipart/form-data';


const bodyEncoder = (data=null) => {
    let formBody = [];
    for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
}
const urlEncoder = (url, data) => {
    
    if(data){
        return url + '?' + bodyEncoder(data);
    }
    return url;
}



export const getServer = async (url, data = null) => {

    try{
        url = url + '?' + bodyEncoder(data);
        let res = await fetch(url, {

            method : 'GET',

            headers: {
                Accept: HEADER_APPJSON,
                'Content-Type' : HEADER_WWWENCODED,
            },

        });
        if(res.ok) return res;
        console.log(await res.json());
        return null;

        
    }catch(e){
        console.log('get' +e);
    }
    
}


export const getAuthServer = async (url, token, data = null) => {
    try{ 
        url = url + '?' + bodyEncoder(data);
        let res = await fetch(url, {
            method : 'GET',
            headers: {
                Accept: HEADER_APPJSON,
                'Content-Type' : HEADER_WWWENCODED,
                Authorization : `Bearer ${token}`
            },

        });
        // console.log(res);
        // console.log(token);
        if (res.ok) return res;
        console.log(await res.json());
        return null;
        
    }catch(e){
        console.log('getAuth' + e);
    }

}


export const putServer = async (url, data = null) => {
    try{
        const formBody = bodyEncoder(data);
        let res = await fetch(url, {
            method : 'PUT',
            headers: {
                Accept: HEADER_APPJSON,
                'Content-Type' : HEADER_WWWENCODED,
            },
            body : formBody
        });

        if (res.ok) return res;
        console.log(await res.json());
        return null;

    }
    catch(e){
        console.log('putServer' + e);
    }
}

export const putAuthServer = async (url, token, data = null) => {
    try{
        const formBody = bodyEncoder(data);
        let res = await fetch(url, {
            method : 'PUT',
            headers: {
                Accept: HEADER_APPJSON,
                'Content-Type' : HEADER_WWWENCODED,
                'Authorization' : `Bearer ${token}`
            }, 
            body : formBody
        });
        
        console.log(res);
        if (res.ok) return res;
        console.log(await res.json());
        return null;

    }
    catch(e){
        console.log('putAuth' + e);
        return e;
    }
}

export const postServer = async (url, data) => {

    try {
        const formBody = bodyEncoder(data);
        

        let res = await fetch(url, {
            method : 'POST',
            headers: {
                Accept: HEADER_APPJSON,
                'Content-Type' :HEADER_WWWENCODED,
            },
            body : formBody
        });
        
        if (res.ok) return res;
        console.log(res);
        return null;

    }
    catch(e){
        console.log('post' + e);
    }
}


export const postAuthServer = async (url, token, data = null) => {
    try{

        const formBody = bodyEncoder(data);
        let res = await fetch(url, {
            method : 'POST',
            headers: {
                Accept: HEADER_APPJSON,
                'Content-Type' : HEADER_WWWENCODED,
                'Authorization' : `Bearer ${token}`
            }, body: formBody
        });

        if(res.ok) return res;
        console.log(await res.json());
        return null;
        
    }
    catch(e){
        console.log('postAuth' + e);
    }
}

export const postMultipartServer = async (url, data=null) => {
    console.log(data);
    try{
        let formData = new FormData();
        const date = new Date();
        data.map((item,index) => {
            formData.append("file",{
                uri:item,
                type: 'image/jpg',
                name: date + index,
                filename:`${date}${index}${'storeImage'}.jpg`
            })
        })
        
        let res = await fetch(url, {
            method : 'POST',
            headers: {
                Accept: '*/*',
                'Content-Type' : HEADER_MULTIPART,
            },
            body : formData
        });
        console.log(res);
        if (res.ok) return res;
        return null
        
    }
    catch(e){
        console.log('post / Multipart : ' + e);
    }
}

export const postAuthMultipartServer = async (url, token, data) => {
    try{
        let res = await fetch(url, {
            method : 'POST',
            headers: {
                Accept: '*/*',
                'Content-Type' : HEADER_MULTIPART,
                'Authorization' : `Bearer ${token}`
            },
            body : data
        });
        
        if(res.ok) return res;
        
    }
    catch(e){
        console.log('postAuth / Multipart : ' + e);
    }
}


