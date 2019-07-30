import {BackHandler} from 'react-native';

//안드로이드 기본 하드웨어 뒤로가기 버튼 

const handleAndroidBackButton = callback => {
    BackHandler.addEventListener('hardwareBackPress', () => {
        callback();
        return true;
    });
};
const removeAndroidBackButtonHandler = () => {
    BackHandler.removeEventListener('hardwareBackPress', () => {});
}
export {handleAndroidBackButton, removeAndroidBackButtonHandler};