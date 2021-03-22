import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, StatusBar, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
//import { Header, Button, Input, ListItem } from 'react-native-elements';

export default function PlaceOnMap({navigation, route}) {
  const address=route.params.address;
  const apiKey='V0bFrAggtQNE8XoCG1a5Em0Pse4vfyLk';
  const [lat, setLat]= useState(0);  
   const [lng, setLng]= useState(0);  

  useEffect(() => {findAddress();}, []);


  const findAddress = async () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key='+apiKey+'&location='+address;
    console.log(url);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLng(Number(data.results[0].locations[0].latLng.lng));
      setLat(Number(data.results[0].locations[0].latLng.lat));
      console.log(address);
    }
    catch(error) {
      Alert.alert('Error' , error);
    }
  };

 const map = () => {
  state = { 
    region: {
     latitude: lat,
     longitude: lng,
     latitudeDelta: 0.32,
     longitudeDelta: 0.22,
  }
  };
  return (
 <MapView style={styles.mapStyle}
           region={state.region}>
             <Marker
            coordinate={{
              latitude:lat, 
              longitude: lng}}/>
          </MapView>   
   ) };

   return (
    <View  style={styles.container}>
 {map()}
     <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  margin:20,
  backgroundColor:'#F5F5F5',
 },
 mapStyle: { width: (Dimensions.get('window').width), 
 height: (Dimensions.get('window').height),},
});
