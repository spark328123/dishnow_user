import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const UPDATE_USERID = 'user/UPDATE_USERID';
const UPDATE_POINT = 'user/UPDATE_POINT';
const UPDATE_NICKNAME = 'user/UPDATE_NICKNAME';
const UPDATE_PHONE = 'user/UPDATE_PHONE';
const UPDATE_REVIEWCOUNT = 'user/UPDATE_REVIEWCOUNT';
const UPDATE_IMAGE = 'user/UPDATE_IMAGE';
const UPDATE_NAME = 'user/UPDATE_NAME';

export const updateuserid = createAction(UPDATE_USERID);
export const updatepoint = createAction(UPDATE_POINT);
export const updatenickname = createAction(UPDATE_NICKNAME);
export const updatephone = createAction(UPDATE_PHONE);
export const updatereviewcount = createAction(UPDATE_REVIEWCOUNT);
export const updateimage = createAction(UPDATE_IMAGE);
export const upadtename = createAction(UPDATE_NAME);

const initialState = Map({
   userid : '',
   point : '',
   nickname : '',
   phone : '',
   reviewcount : '',
   image : ''
});

export default handleActions({
    [UPDATE_USERID]: (state, {payload : userid}) => {return state.set('userid',userid)},
    [UPDATE_POINT]: (state, {payload : point}) => {return state.set('point',point)},
    [UPDATE_NICKNAME]: (state, {payload : nickname}) => {return state.set('nickname',nickname)},
    [UPDATE_PHONE]: (state, {payload : phone}) => {return state.set('phone',phone)},
    [UPDATE_REVIEWCOUNT]: (state, {payload : reviewcount}) => {return state.set('reviewcount',reviewcount)},
    [UPDATE_IMAGE]: (state, {payload : image}) => {return state.set('image',image)},
    [UPDATE_NAME] : (state, {payload : name}) => { return state.set('name',name)},
},initialState);