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
    const { navigation, mylat, mylon } = props;   //뒤로가기 isReservation == false ? TabBooked : ListMenu
    const latitude = navigation.getParam('latitude');
    const longitude = navigation.getParam('longitude');
    const name = navigation.getParam('name');
    const theme = navigation.getParam('theme');
    const isReservation = navigation.getParam('isReservation');
    const distance = navigation.getParam('distance');
    const [flex, setFlex] = useState(0.9997);

    useEffect(()=>{
        setTimeout(()=>{
            _setFlex();
        }, 10);

    },[])

    const _setFlex =()=>{
        setFlex(1);
    }

    const _goBack = () => {
        navigation.navigate('ListMenu');
    }
    handleAndroidBackButton(_goBack);
    return(
        <View style ={{flex :1}}>
           <MapView 
           style = {{flex :flex}}
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
                <Text style={{fontSize: 12, color : '#733FFF'}}>{distance && `${distance}m`}</Text>
                </View>
                </CustomCallout>
                </Callout>
            </Marker>
           </MapView>
           <View style = {styles.backFixed}>
                <TouchableOpacity 
                        onPress = {_goBack}>
                        <Image source = {
                            {uri: 'icon_back_button'}
                        }
                        style = {styles.backimg} />
                </TouchableOpacity>
            </View>
           </View>
    )
}

const mapStateToProps = (state) => {
    return {
        mylat : state.Maps._root.entries[0][1].latitude,
        mylon : state.Maps._root.entries[0][1].longitude,
    }
}

export default connect(mapStateToProps)(StoreMap);

const styles = StyleSheet.create({
    backFixed : {
        width : 40,
        height : 40,
        left : 25,
        marginLeft: -12,
        marginTop: -12,
        position: 'absolute',
        top : 50,
      },
    backimg : {
        width : 15,
        height : 20,
      },

})