import React from 'react';
import {TouchableHighlight, Image} from 'react-native';

export default ({ onPress }) => (
    <TouchableHighlight onPress={onPress}>
      <Image
        source={{uri: 'icon_back_button'}}
      />
    </TouchableHighlight>
  );
  