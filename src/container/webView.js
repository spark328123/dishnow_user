import React, {useState} from 'react';
import {View,StyleSheet,TouchableOpacity,Image} from 'react-native';
import {WebView} from 'react-native-webview';
import {NavSwitchHead,NavHead} from '../component/common'
import {handleAndroidBackButton, removeAndroidBackButtonHandler} from '../component/common/hardwareBackButton'
export default webView = ({navigation,navtitle,title}) => {
    console.log(navtitle,title);
    const [source] = useState(navigation.getParam('source'));
    const _goBack = ()=>{
        navigation.navigate(navigation.getParam('navtitle'));
    }
    handleAndroidBackButton(_goBack);
    
    return(
        <View style = {{flex : 1}}>
            <NavSwitchHead navigation={navigation} navtitle = {navigation.getParam('navtitle')} title={navigation.getParam('title')}/>
        <WebView
            source={source}
            //navigation = {navigation}
            onNavigationStateChange={(navEvent) => console.log(navEvent.jsEvaluationValue)}
        
        />
        </View>
    )
}

const styles = StyleSheet.create ({
    backFixed : {
        width : 40,
        height : 40,
        left : 25,
        marginLeft: -12,
        marginTop: -12,
        position: 'absolute',
        top : 50,
      },
})