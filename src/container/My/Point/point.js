import React , { useState} from 'react';
import { View, StyleSheet } from 'react-native';
import {NavSwitchHead,Button,Text,CustomAlert1} from '../../../component/common';
import {handleAndroidBackButton} from '../../../component/common/hardwareBackButton';
import {useSelector, useDispatch, connect} from 'react-redux'
import * as Utill from '../../../utill'
import Toast from 'react-native-simple-toast';
import Point1 from './5000point';
import Point2 from './10000point';

const Point = (props) =>{
    const {navigation, point, phone} = props;
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const _onPressAlertOk = () => {
        setIsAlertVisible(false);
    }
    
    console.log(props);
    const [page, setPage] = useState(1);
    const Screen =(props)=> {
        if(props.page == 1) return <Point1 data={props.data} phone = {phone} point = {point}/>
        return <Point2 data={props.data} phone = {phone} point = {point}/>
    }

    _goBack = () => {
        navigation.navigate('myPoint')
    }

    handleAndroidBackButton(_goBack);
    return(
        <View style ={styles.container}>
            <NavSwitchHead navigation={navigation} navtitle = {'myPoint'} title={`디나포인트`}/>
            {/* <LoadingModal visible={isLoadingVisible} /> */}
            
            <View style={styles.tabArea}>
                <Button 
                    style={page==1 ? styles.button : styles.buttonUnSelected} 
                    onPress={()=>setPage(1)}>
                    <Text
                        style={page==1 ? styles.buttonTitle : styles.buttonTitleUnSelected}
                    >
                        {`5,000포인트`}
                    </Text>
                </Button>

                <Button 
                    style={page==2 ? styles.button : styles.buttonUnSelected} 
                    onPress={()=>setPage(2)}>
                    <Text
                        style={page==2 ? styles.buttonTitle : styles.buttonTitleUnSelected}
                    >
                        {`10,000포인트`}
                    </Text>
                </Button>
                
            </View>
            <Screen page={page} data={page==1 ? Point1 : Point2}/>
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        phone : state.User._root.entries[3][1],
        point : state.User._root.entries[1][1],
    }
}

export default connect(mapStateToProps)(Point);

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : Utill.color.white,
    },
    tabArea : {
        flexDirection : 'row',
        width : Utill.screen.screenWidth,
        paddingHorizontal : 22.5,
        justifyContent : 'center',
        alignItems : 'center',
    },
    screen : {
        flex : 1,
    },
    button : {
        flex : 1,
        borderBottomWidth : 2,
        justifyContent : 'center',
        alignItems : 'center',
        height : 39,
    },
    buttonUnSelected : {
        flex : 1,
        top : -0.25,
        borderBottomWidth : 1,
        borderBottomColor : Utill.color.defaultColor,
        justifyContent : 'center',
        alignItems : 'center',
        height : 39.25,
    },
    buttonTitle : {
        color : Utill.color.textBlack,
        fontSize : 16,
    },
    buttonTitleUnSelected : {
        color : Utill.color.border,
        fontSize : 16,
    },
    
})