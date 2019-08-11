// import {createAction, handleActions } from 'redux-actions'
// import {Map, List} from 'immutable';


// export const pointGet5000Server = createAction(POINT_GET_5000_SERVER);
// export const pointGet5000ServerFail = createAction(POINT_GET_5000_SERVER_FAIL);
// export const pointGet5000ServerSuccess = createAction(POINT_GET_5000_SERVER_SUCCESS);

// export const pointGet10000Server = createAction(POINT_GET_10000_SERVER);
// export const pointGet10000ServerFail = createAction(POINT_GET_10000_SERVER_FAIL);
// export const pointGet10000ServerSuccess = createAction(POINT_GET_10000_SERVER_SUCCESS);

// const initialState = Map({
//     status : '',
//     page5000 : [],
//     page10000 : [],
// });
// export default handleActions ({
//     [POINT_STATUS_RESET] : (state, action) => state.set(initialState),
//     [POINT_GET_5000_SERVER_SUCCESS] : (state, action) =>  {
//         return state.set('status', 'pointGet5000ServerSuccess')
//                     .set('page5000', action.payload.page5000)
//                     .update('page5000', state => state.concat(action.payload))
//     },
//     [POINT_GET_10000_SERVER_SUCCESS] : (state, action) =>  {
//         return state.set('status', 'pointGet10000ServerSuccess')
//                     .set('page10000', action.payload.page10000)
//                     .update('noAnswer', state => state.concat(action.payload))
//     },
// },initialState);