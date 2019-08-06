import React, {useState} from 'react';
import {WebView} from 'react-native-webview';

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