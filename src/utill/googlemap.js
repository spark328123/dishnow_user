import React ,{ useState, useEffect }from "react";
import MapView, { PROVIDER_GOOGLE, Marker, } from "react-native-maps";
import { View, Dimensions, StyleSheet, Image, TouchableOpacity } from "react-native";

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0012;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default ({toggle}) => {
    const [region,setRegion] = useState({
       
    });

    onRegionChange = region =>{
        setRegion({region});
        alert(JSON.stringify(region));
       
    }
    useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        position => {
        setRegion({
            latitude : position.coords.latitude,
            longitude : position.coords.longitude,
            latitudeDelta : LATITUDE_DELTA,
            longitudeDelta : LONGITUDE_DELTA,
            });
        },
        error=>{
            // handle error
        });
    }, []);
  
    return (
      <View style = {{flex:1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion = {region}
          showsMyLocationButton
          showsUserLocation
          showsCompass = {false}
          onPress= {toggle}
          onRegionChangeComplete ={onRegionChange}
        >
        </MapView>        
        <View style={styles.markerFixed}>
            <Image style = {styles.marker} source = {
                require('../assets/f_logo.png')
            }></Image>
        
        </View>
      </View>
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
        height: 48,
        width: 48
      },
})