import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View } from 'react-native';

const propTypes = {
 children: PropTypes.node.isRequired,
 style: PropTypes.object,
};

class CustomCallout extends React.Component {
 render() {
   return (
     <View style={[styles.container, this.props.style]}>
       <View style={styles.bubble}>
         <View style={styles.amount}>{this.props.children}</View>
       </View>
       <View style={styles.arrowBorder} />
       <View style={styles.arrow} />
     </View>
   );
 }
}

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
 container: {
   flexDirection: 'column',
   alignSelf: 'flex-start',
 },
 bubble: {
   width: 146,
   flexDirection: 'row',
   alignSelf: 'flex-start',
   backgroundColor: '#FFFFFF',
   paddingTop: 11,
   paddingBottom: 7,
   paddingLeft: 8,
   borderRadius: 6,
   borderColor: '#733FFF',
   borderWidth: 2,
 },
 amount: {
   flex: 1,
 },
 arrow: {
   backgroundColor: 'transparent',
   borderWidth: 10,
   borderColor: 'transparent',
   borderTopColor: '#FFFFFF',
   alignSelf: 'center',
   marginTop: -32,
 },
 arrowBorder: {
   backgroundColor: 'transparent',
   borderWidth: 7,
   borderColor: 'transparent',
   borderTopColor: '#733FFF',
   alignSelf: 'center'
 },
});

export default CustomCallout;