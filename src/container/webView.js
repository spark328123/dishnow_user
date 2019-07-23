import React from 'react';
import {WebView} from 'react-native-webview';

export default webView = () => {
    return(
        <WebView
            source={{ uri: "http://dishnow.kr/Terms.html" }}
            style={{ flex: 1 }}
            //onNavigationStateChange={(navEvent) => console.log(navEvent.jsEvaluationValue)}
        />
    )
}