import {Dimensions, Platform, StatusBar} from 'react-native';
import { getInset } from 'react-native-safe-area-view';

const {width, height} = Dimensions.get('screen');

export const landScape = width > height;
export const topSafe = getInset('top',landScape);
export const bottomSafe = getInset('bottom', landScape);
export const statusbarHeight = StatusBar.currentHeight;
export const topBarHeight = 56;
export const bottomTabHeight = 60;
export const paddingSide = 20;
export const screenWidth = width; 
export const screenHeight = Platform.OS === 'ios' ? height - topSafe - bottomSafe : height - statusbarHeight; 
export const keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 0;

export const BaseWidth = 480;
const navh = width/BaseWidth * 75;

export const Screen = {

    width, 
    height,
    topBarHeight,
    bottomTabHeight,
    navBarHeight: navh,
    excludeHeight : Platform.OS === 'ios' ? height - topSafe : height - statusbarHeight,
    
    
    //제플린 480 기준 대입용
    Dp: (x) => {
        return width/BaseWidth * x;
    },


    // 백분율
    PerWidth: (x) => {
        return  x==0 ? 0 : width * (x/100);
    },

    PerHeight: (x) => {
        return  x==0 ? 0 : Height * (x/100);
    }
};