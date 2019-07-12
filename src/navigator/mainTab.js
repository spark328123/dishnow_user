import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  View,
} from "react-native";

export default () => {
  /*
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    });
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  */
    return (
      <View style = {{flex:1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          region = { 
            {latitude: 37.5514642,
            longitude: 126.9250106,
            latitudeDelta: 0.00722,
            longitudeDelta: 0.0021
        }}
          showsUserLocation
        >
        </MapView>        
      </View>
    );
}