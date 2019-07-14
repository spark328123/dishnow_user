import React ,{ useState, useEffect }from "react";
import MapView, { PROVIDER_GOOGLE, Marker, } from "react-native-maps";
import { View, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.12;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let watchID;

export default ({toggle}) => {
    const [region,setRegion] = useState({
        latitude : 0,
        longitude : 0,
        latitudeDelta : 0,
        longitudeDelta : 0,
    });

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            position => {
            setRegion({
                latitude : position.coords.latitude,
                longitude : position.coords.longitude,
                latitudeDelta : LATITUDE_DELTA,
                longitudeDelta : LONGITUDE_DELTA,
            })
        },{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });

        
        watchID = navigator.geolocation.watchPosition(
            position => {
            setRegion({
                latitude : position.coords.latitude,
                longitude : position.coords.longitude,
                latitudeDelta : LATITUDE_DELTA,
                longitudeDelta : LONGITUDE_DELTA,
            })
        })
    },[])

    useEffect(()=>{
        return () =>{
            navigator.geolocation.clearWatch(watchID);
        }
    },[])
  
    return (
      <View style = {{flex:1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          region = {region}
          showsMyLocationButton
          showsUserLocation
          onPress= {toggle}
        >
        </MapView>        
      </View>
    );
}