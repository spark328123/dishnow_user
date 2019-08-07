import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

const TabButton = (props) => {
    const {isFocus, title, onPress} = props;
    return (
    <TouchableOpacity   
          style={{ 
            flex : 1,
            alignItems : 'center',
            justifyContent : 'center',
            paddingTop : 13,
            paddingBottom : isFocus?12:14,
            borderBottomColor : '#000000',
            borderBottomWidth : isFocus?2:0,
          }} 
          onPress={onPress}
        > 
            <Text style={{color : isFocus ? '#000000' : '#cccccc',}}> {title} </Text>
        </TouchableOpacity> 
    )
}

export default TabButton;