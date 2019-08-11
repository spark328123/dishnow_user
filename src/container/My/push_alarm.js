import React from 'react';
import {View,Switch,StyleSheet} from 'react-native';
import * as Utill from '../../utill'
export default Push = ({title,source,style,onPress}) => {
    return(
        <Switch
                thumbColor={Utill.color.onColorBackground}
                trackColor={{false: Utill.color.defaultColor, true: Utill.color.primary1}}
                ios_backgroundColor={{false: Utill.color.defaultColor, true: Utill.color.primary1}}
                // onValueChange={()=>onPressCheckBox(i)} 
                // value={!item.isHoliday}
        />
            
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center'        
    },
})