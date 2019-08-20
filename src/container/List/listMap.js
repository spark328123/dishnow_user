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
} from "react-native";
import CustomCallout from '../../component/common/customCallout';
import { Text } from '../../component/common';

const ListMap = (props) => {
    const { navigation, latitude, longitude } = props;
    const data = navigation.getParam('data');
    const [ markers, setMarkers ] = useState(data);
    const _goBack = ()=>{
        navigation.navigate('List');
    }
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

                }}
               style = {{height : 80}}
            >
                <CustomCallout>
                <Text style={{fontSize: 16, marginBottom: 5}}>{marker.name}</Text>
                <View style={{flexDirection: 'row', justifyContent:"space-between", width:126}}>
                <Text style={{fontSize: 12}}>{marker.theme}</Text>
                <Text style={{fontSize: 12, color: '#733FFF'}}>{`${marker.distance}m`}</Text>
                </View>
                </CustomCallout>
                </Callout>
                </Marker>)}

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
        latitude : state.Maps._root.entries[0][1].latitude,
        longitude : state.Maps._root.entries[0][1].longitude,
    }
}

export default connect(mapStateToProps)(ListMap);

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