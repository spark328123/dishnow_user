import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import {NavHead} from '../component/common'
export default webView = ({navigation}) => {
    const [source] = useState(navigation.getParam('source'));
    return(
        <WebView
            
            source={source}
            style={{ flex: 1,marginTop : 50, }}
            //onNavigationStateChange={(navEvent) => console.log(navEvent.jsEvaluationValue)}
        />
    )
}