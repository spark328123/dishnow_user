import React ,{ useState, useEffect, useStore }from "react";
import MapView, { PROVIDER_GOOGLE, Marker, } from "react-native-maps";
import { 
    View,
    Dimensions,
    StyleSheet,
    Image, 
    TouchableOpacity, 
    Text,
    BackHandler,
} from "react-native";
import * as Utill from '../utill';
import { connect, useDispatch } from 'react-redux';
import { updateLocation } from '../store/modules/maps';


const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

const google_url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
const GOOGLE_API_KEY = 'AIzaSyAFU82_JAporZ8W7FhWdBatmP9Qr-JdOUc';

const GoogleMaps =  ({isPressed, toggle, navigation, latitudeDelta, latitude, longitude}) => {

    const LATITUDE_DELTA = latitudeDelta;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const dispatch = useDispatch();

    const [region,setRegion] = useState({
        latitude,
        longitude,
        latitudeDelta : LATITUDE_DELTA,
        longitudeDelta : LONGITUDE_DELTA,
    });

    const [address, setAddress] = useState('출발지 : 찾는 중...');
    const [flex, setFlex] = useState(0.9997);

    const _goBack = ()=>{
        navigation.navigate('TabHome');
    }

    const _getPosition = async () => {
        await navigator.geolocation.getCurrentPosition((position) => {
        setRegion ({
            ...region,
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        });
    })}

    const _getAddress = async (lat,lon) =>{
        const url = `${google_url}${lat},${lon}&key=${GOOGLE_API_KEY}&language=ko`
        fetch(url)
            .then((res)=>{
                return res.json()
            })
            .then((json)=>{
                let address = JSON.stringify(json.results[0].formatted_address);
                address = address.substring(5,address.length-1);    //"대한민국"
                setAddress(address)
            })
    }

    const _updateLocation = ()=>{
        dispatch(updateLocation({
            latitude : region.region.latitude,      
            longitude : region.region.longitude,  
        }));
        _goBack(); 
    }

    const _setFlex =()=>{
        setFlex(1);
    }

    useEffect(()=>{
        setTimeout(()=>{
            _setFlex();
        _getPosition();
        }, 200);
    }, [])
    

    return (
       
        <View style = {{flex:1}}>
            <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: flex }}
            initialRegion = {region}
            onRegionChange = {region=>{setRegion({region})}}
            onRegionChangeComplete = {
                region=>{
                    setRegion({region})
                    _getAddress(region.latitude,region.longitude)   
                }}
            showsUserLocation = {isPressed}
            showsMyLocationButton = {isPressed}
            onPress = {toggle}
            scrollEnabled = {isPressed}
            zoomEnabled = {isPressed}
            followsUserLocation = {isPressed}
            >
            </MapView>
            {isPressed? (

                <View style = {styles.backFixed}>
                    <TouchableOpacity 
                        onPressIn = {_goBack}>
                        <Image source = {
                            {uri: 'icon_back_button'}
                        } />
                    </TouchableOpacity>
                </View>

            )
            :null
            }
            <View style={styles.markerFixed}>
                <Image style = {styles.marker} source = {
                    {uri: 'icon_departure'}
                }></Image>
            </View>
            <View style = {styles.address}>
                <Text style ={{fontSize:15,padding:10}}>{address}</Text>
            </View>
            {isPressed? (
                <TouchableOpacity
                onPress = {_updateLocation}>
            <View style = {styles.departure}>
                <Text style = {styles.departureText}>
                    출발지로 설정
                </Text>
            </View>
            </TouchableOpacity>
            ): null}
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        latitude : state.Maps._root.entries[0][1].latitude,
        longitude : state.Maps._root.entries[0][1].longitude,
    }
}

export default connect(mapStateToProps)(GoogleMaps);

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