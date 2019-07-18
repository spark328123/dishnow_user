import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const UPDATE_LOCATION = 'maps/UPDATE_LOCATION';
const UPDATE_ADDRESS = 'maps/ADDRESS';


export const updateLocation = createAction(UPDATE_LOCATION);
export const updateaddress = createAction(UPDATE_ADDRESS);


const initialState = Map({
    region : {
     
    },
    address : '',
});

export default handleActions({
    [UPDATE_LOCATION]: (state, {payload : region}) => {return state.set('region',region)},
    [UPDATE_ADDRESS] : (state, {payload : address}) => {return state.set('address',address)}
},initialState);