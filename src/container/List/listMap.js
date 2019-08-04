import React ,{ useState, useEffect, useStore }from "react";
import MapView, { PROVIDER_GOOGLE, Marker, } from "react-native-maps";
import { connect } from 'react-redux';
import { 
    View,
    Dimensions,
    StyleSheet,
    Image, 
    TouchableOpacity, 
    BackHandler,
    Text,
} from "react-native";

const ListMap = (props) => {
    const { navigation, latitude, longitude } = props;
    const data = navigation.getParam('data');
    const [ markers, setMarkers ] = useState(data);
    useEffect(()=>{
        markers.map(marker=>(
            console.log(marker)
        ));
    },[])
    

    return(
        <View style ={{flex :1}}>
           <MapView 
           style = {{flex :1}}
           initialRegion = {{latitude,longitude,latitudeDelta: 0.0162,longitudeDelta: 0.00421}}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            showsMyLocationButton 
            >
            {markers.map(marker => <Marker
                coordinate={{
                    latitude : marker.latitude,
                    longitude : marker.longitude,
                }}
                title={marker.name}
                description={marker.theme}
                image = {{uri : 'icon_pin'}}
            >   
                </Marker>)}

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

export default connect(mapStateToProps)(ListMap);


