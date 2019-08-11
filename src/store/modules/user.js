import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const UPDATE_USERID = 'user/UPDATE_USERID';
const UPDATE_POINT = 'user/UPDATE_POINT';
const UPDATE_NICKNAME = 'user/UPDATE_NICKNAME';
const UPDATE_PHONE = 'user/UPDATE_PHONE';
const UPDATE_REVIEWCOUNT = 'user/UPDATE_REVIEWCOUNT';
const UPDATE_IMAGE = 'user/UPDATE_IMAGE';
const UPDATE_NAME = 'user/UPDATE_NAME';
//const UPDATE_EMAIL = 'user/UPDATE_EMAIL';

const REGISTER = 'user/REGISTER';
const REGISTER_VERIFY_CODE_TIMEOUT = 'user/REGISTER_VERIFY_CODE_TIMEOUT';
const REGISTER_VERIFY_CODE = 'user/REGISTER_VERIFY_CODE';
const REGISTER_VERIFY_CODE_REQUEST = 'user/REGISTER_VERIFY_CODE_REQUEST';

export const updateuserid = createAction(UPDATE_USERID);
export const updatepoint = createAction(UPDATE_POINT);
export const updatenickname = createAction(UPDATE_NICKNAME);
export const updatephone = createAction(UPDATE_PHONE);
export const updatereviewcount = createAction(UPDATE_REVIEWCOUNT);
export const updateimage = createAction(UPDATE_IMAGE);
export const upadtename = createAction(UPDATE_NAME);
//export const updateemail = createAction(UPDATE_EMAIL);

export const register = createAction(REGISTER);
export const registerVerifyCodeTimeout = createAction(REGISTER_VERIFY_CODE_TIMEOUT);
export const registerVerifyCode = createAction(REGISTER_VERIFY_CODE);
export const registerVerifyCodeRequest = createAction(REGISTER_VERIFY_CODE_REQUEST);

const initialState = Map({
   userid : '',
   point : '',
   nickname : '',
   phone : '',
   reviewcount : '',
   image : '',
//    verfifyCode : '',
//    error : '',
//    status : '',
//    //email : '',
});

export default handleActions({
    [UPDATE_USERID]: (state, {payload : userid}) => {return state.set('userid',userid)},
    [UPDATE_POINT]: (state, {payload : point}) => {return state.set('point',point)},
    [UPDATE_NICKNAME]: (state, {payload : nickname}) => {return state.set('nickname',nickname)},
    [UPDATE_PHONE]: (state, {payload : phone}) => {return state.set('phone',phone)},
    [UPDATE_REVIEWCOUNT]: (state, {payload : reviewcount}) => {return state.set('reviewcount',reviewcount)},
    [UPDATE_IMAGE]: (state, {payload : image}) => {return state.set('image',image)},
    [UPDATE_NAME] : (state, {payload : name}) => { return state.set('name',name)},
    //[UPDATE_EMAIL] : (state, {payload : email}) => {return state.set('email',email)},

    [REGISTER] : (state, action) =>  state.set('status', 'register')
    .set('error', null),
    [REGISTER_VERIFY_CODE_REQUEST] : (state, action) =>  state.set('status', 'registerVerifyCodeRequest')
    .set('error', null),
    [REGISTER_VERIFY_CODE] : (state, {payload}) => {
        const verifycode = state.get('verifyCode');
        if (verifycode == payload) 
            return state.set('status', 'registerVerifyCodeSuccess') 
                        .set('error', '유효한 코드');
        else 
            return state.set('status', 'registerVerifyCodeFail') 
                        .set('error', '유효하지 않은 코드입니다.');
    },
    [REGISTER_VERIFY_CODE_TIMEOUT] :  (state, {payload}) => state.set('status', 'registerVerifyCodeTimeout')
                                                                 .set('error', action.payload),
},initialState);