import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const UPDATE_LOCATION = 'maps/UPDATE_LOCATION';
const UPDATE_ADDRESS = 'maps/UPDATE_ADDRESS';

export const updateLocation = createAction(UPDATE_LOCATION);
export const updateAddress = createAction(UPDATE_ADDRESS);


const initialState = Map({
    region : {
        latitude : 37.5514642,
        longitude : 126.9250106
    },
    address : '찾는 중...',
});

export default handleActions({
    [UPDATE_LOCATION]: (state, {payload : region}) => {return state.set('region',region)},
    [UPDATE_ADDRESS]: (state, {payload : address}) => {return state.set('address',address)},
},initialState);