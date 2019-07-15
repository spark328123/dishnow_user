import React ,{ useState, useEffect }from "react";
import MapView, { PROVIDER_GOOGLE, Marker, } from "react-native-maps";
import { View, Dimensions, StyleSheet, Image, TouchableOpacity } from "react-native";

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default ({isPressed,toggle,navigation}) => {
    let watchID;
    let mounted = true;

    const _getPosition = (event)=>{
        if(mounted){
            setRegion({
                latitude : event.coords.latitude,
                longitude : event.coords.longitude,
                latitudeDelta : LATITUDE_DELTA,
                longitudeDelta : LONGITUDE_DELTA,
            })
        }
     }
    const [region,setRegion] = useState({
        latitude : null,
        longitude : null,
        latitudeDelta : LATITUDE_DELTA,
        longitudeDelta : LONGITUDE_DELTA,
    });


    useEffect(() => {
       navigator.geolocation.getCurrentPosition(_getPosition);
       watchId = navigator.geolocation.watchPosition(_getPosition);
        return () =>{
            mounted = false;
            navigator.geolocation.clearWatch(watchID);
        }
    }, []);

    onRegionChange = region =>{
        setRegion({region});
    }    

    return (
        region.latitude !== null && (
        <View style = {{flex:1}}>
            <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion = {region}
            onRegionChangeComplete = {region=>{setRegion({region})}}
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
                        onPress = {()=>{navigation.pop()}}
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
      }
})