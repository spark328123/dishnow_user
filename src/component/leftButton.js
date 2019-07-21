import React from 'react';
import {TouchableHighlight, Image} from 'react-native';

export default ({ onPress }) => (
    <TouchableHighlight onPress={onPress}>
      <Image
        source={require('../assets/icon_squareBracket.png')}
      />
    </TouchableHighlight>
  );
  