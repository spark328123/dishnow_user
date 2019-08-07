import {Dimensions, Platform, StatusBar} from 'react-native';
import { getInset } from 'react-native-safe-area-view';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');
const width  = Math.max(window.width, screen.width);
const height = Math.max(window.height, screen.height);

export const landScape = width > height;
// export const topSafe = getInset('top',landScape);
export const topSafe = getInset('top',landScape);
export const bottomSafe = getInset('bottom', landScape);
export const statusbarHeight = StatusBar.currentHeight;
export const topBarHeight = 56;
export const bottomTabHeight = 60;
export const paddingSide = 20;
export const screenWidth = width; 
export const screenHeight = (Platform.OS === 'ios' ? height : (height - statusbarHeight)) 
export const keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 0;

export const BaseWidth = 360;
export const screenRatio = width/BaseWidth;

export const Screen = {
    excludeHeight : Platform.OS === 'ios' ? height - topSafe : height - statusbarHeight,
    
    //제플린 480 기준 대입용
    Dp: (x) => {
        return width/BaseWidth * x;
    },


    // 백분율
    PerWidth: (x) => {
        return  x==0 ? 0 : width * (x/100);
    },

    customWidth: (x) => {
        return x== 0 ? 0 : width * (x/360);
    },

    PerHeight: (x) => {
        return  x==0 ? 0 : height * (x/100);
    },

    customHeight: (x) => {
        return x== 0 ? 0 : height * (x/640);
    },

    customHomeHeight: (x) => {
        return x== 0 ? 0 : height * (x/590);
    },

};