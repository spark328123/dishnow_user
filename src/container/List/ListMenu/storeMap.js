import React ,{ useState, useEffect, useStore }from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout } from "react-native-maps";
import { connect } from 'react-redux';
import { 
    View,
    Dimensions,
    StyleSheet,
    Image, 
    TouchableOpacity, 
    BackHandler,
    Animated,
} from "react-native";

import { Text,NavSwitchHead, } from '../../../component/common';
import { handleAndroidBackButton,removeAndroidBackButtonHandler} from '../../../component/common/hardwareBackButton';
import CustomCallout from '../../../component/common/customCallout';

const StoreMap = (props) => {
    const { navigation } = props;   //뒤로가기 isReservation == false ? TabBooked : ListMenu
    const latitude = navigation.getParam('latitude');
    const longitude = navigation.getParam('longitude');
    const name = navigation.getParam('name');
    const theme = navigation.getParam('theme');
    const isReservation = navigation.getParam('isReservation');
    const data = navigation.getParam('resDetail');

    useEffect(()=>{
        console.log(navigation);
        console.log(latitude);
        console.log(longitude,isReservation);
        console.log(data);
    },[])

    const _goBack= () => {
        navigation.navigate('ListMenu',{data});
    }
    handleAndroidBackButton(_goBack);
    return(
        <View style ={{flex :1}}>
            <Image source = {{uri : 'icon_back_button'}} style = {{position : 'absolute',top : 24,left : 24,height : 9.5,width:16}}/>
           <MapView 
           style = {{flex :1}}
           initialRegion = {{latitude,longitude,latitudeDelta: 0.0162,longitudeDelta: 0.00421}}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            showsMyLocationButton 
            >
          <Marker
                coordinate={{
                    latitude : latitude,
                    longitude : longitude
                }}
                image = {{uri : 'icon_pin'}}
            >
            <Callout
                alphaHitTest
                tooltip
                onPress={e => {
                if (
                    e.nativeEvent.action === 'marker-inside-overlay-press' ||
                    e.nativeEvent.action === 'callout-inside-press'
                ) {
                    return;
                }
                }
            }   style = {{height : 80}}
            >
                <CustomCallout>
                <Text style={{fontSize: 16, marginBottom: 5}}>{name}</Text>
                <View style={{flexDirection: 'row', justifyContent:"space-between", width:126}}>
                <Text style={{fontSize: 12}}>{theme}</Text>
                </View>
                </CustomCallout>
                </Callout>
            </Marker>
           </MapView>
       
           </View>
    )
}

const mapStateToProps = (state) => {
    return {
        latitude : state.Maps._root.entries[0][1].latitude,
        longitude : state.Maps._root.entries[0][1].longitude,
    }
}

export default connect(mapStateToProps)(StoreMap);