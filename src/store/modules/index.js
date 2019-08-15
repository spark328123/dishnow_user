import { combineReducers } from 'redux';
import Maps from './maps';
import User from './user';
import MyPoint from './myPoint';
export default combineReducers({
    Maps,  
    User,
    MyPoint,
})