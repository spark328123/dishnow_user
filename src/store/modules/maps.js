import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const UPDATE_LOCATION = 'maps/UPDATE_LOCATION';

export const updateLocation = createAction(UPDATE_LOCATION);

const initialState = Map({
    region : {
     
    },
});

export default handleActions({
    [UPDATE_LOCATION]: (state, {payload : region}) => {return state.set('region',region)},
},initialState);