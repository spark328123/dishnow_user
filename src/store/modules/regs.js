import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';


const UPDATE_EMAIL = 'user/UPDATE_EMAIL';

export const updateemail = createAction(UPDATE_EMAIL);


const initialState = Map({
    email : '',
});

export default handleActions({

    [UPDATE_EMAIL] : (state, {payload : email}) => {return state.set('email',email)},

},initialState);