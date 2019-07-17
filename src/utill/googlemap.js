import React ,{ useState, useEffect }from "react";
import MapView, { PROVIDER_GOOGLE, Marker, } from "react-native-maps";
import { View, Dimensions, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import * as Utill from '../utill';

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

export default ({isPressed, toggle, navigation, latitudeDelta}) => {
    let watchID;
    let mounted = true;
    const LATITUDE_DELTA = latitudeDelta;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const prevRegion = navigation.getParam('region',{
        latitude :null,
        longitude : null,
        latitudeDelta : LATITUDE_DELTA,
        longitudeDelta : LONGITUDE_DELTA,
     });

    const _getPosition = (event)=>{
        if(mounted && prevRegion.latitude===null){
            setRegion({
                latitude : event.coords.latitude,
                longitude : event.coords.longitude,
                latitudeDelta : LATITUDE_DELTA,
                longitudeDelta : LONGITUDE_DELTA,
            })
        }
     }
    
    const [region,setRegion] = useState(prevRegion);

    useEffect(() => {
       navigator.geolocation.getCurrentPosition(_getPosition);
       //watchId = navigator.geolocation.watchPosition(_getPosition);
        return () =>{
        alert(JSON.stringify(prevRegion));

            mounted = false;
            //navigator.geolocation.clearWatch(watchID);
        }
    }, []);
   
  const _goBack = ()=>{
        navigation.setParams({region : region});
        navigation.navigate('TabHome');
    }

    return (
        region.latitude !== null && (
        <View style = {{flex:1}}>
            <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion = {region}
            onRegionChangeComplete = {region=>{setRegion({region});alert(JSON.stringify(region))}}
            showsMyLocationButton = {isPressed}
            showsUserLocation
            onPress = {toggle}
            scrollEnabled = {isPressed}
            zoomEnabled = {isPressed}
            >
            </MapView>
            {isPressed? (
                <View style = {styles.backFixed}>
                    <TouchableOpacity
                        onPressIn = {()=>{navigation.navigate('TabHome')}}
                    >
                        <Image source = {require('../assets/icon_squareBracket.png')} />
                    </TouchableOpacity>
                </View>
            ):null
            }
            <View style={styles.markerFixed}>
                <Image style = {styles.marker} source = {
                    require('../assets/f_logo.png')
                }></Image>
            </View>
            <View style = {styles.address}>
                <Text style ={{fontSize:15,padding:10}}>출발지 : 찾는 중 ...</Text>
            </View>
            {isPressed? (
                <TouchableOpacity
                onPress = {_goBack}>
            <View style = {styles.departure}>
                <Text style = {styles.departureText}>
                    출발지로 설정
                </Text>
            </View>
            </TouchableOpacity>
            ): null}
        </View>
        
        )
    );
}

const styles = StyleSheet.create({
    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
      },
      marker: {
        height: 40,
        width: 40
      },
      backFixed : {
        left : '12%',
        marginLeft: -24,
        marginTop: -24,
        position: 'absolute',
        top : '12%'
      },
      back :{
          height : 80,
          width : 80,
      },
      address : {
        justifyContent : 'center',
        },
      departure : {
        height : Utill.screen.bottomTabHeight,
        backgroundColor : '#000',
        alignItems : 'center',
        justifyContent : 'center'
    },
    departureText : {
        fontSize : 20,
        color : 'white',
    }
})