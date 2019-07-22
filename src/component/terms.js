//component에 들어갈 파일 : 겉으로 보이는 뷰들
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, Button, Dimensionsm, WebView, TouchableOpacity
} from 'react-native';
const Terms = (props) => {
    const { navigation } = props;
    const [type] = useState(navigation.getParam('type'));
    const [token] = useState(navigation.getParam('token'));
    console.log(type, token);


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btnWebView}
                onPress={() => navigation.push('Register', {
                    type,
                    token
                })}
            >
                <View><Text>Click mE!!</Text></View>
            </TouchableOpacity>
        </View>
    )
}
export default Terms;

//눌렀을 때 웹뷰로 이용약관 띄우기
const webview = () => {
    <WebView
        source={{ uri: "http://dishnow.kr/Terms.html" }}
        style={{ flex: 1 }}
        onNavigationStateChange={(navEvent) => console.log(navEvent.jsEvaluationValue)}
    />
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    btnWebView: {
        height: 100,
        width: 100,
        backgroundColor: "#bbb",
        borderRadius: 0,
        borderWidth: 0,
        marginBottom: 50,
    },
})