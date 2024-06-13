import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDrawerStatus} from '@react-navigation/drawer';
import MapView, {
  Callout,
  LatLng,
  MapPressEvent,
  MapType,
  Marker,
  MarkerDragStartEndEvent,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {retrieveAllData} from '../localStorage';
import {useMMKV, useMMKVListener} from 'react-native-mmkv';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

function MapScreen({navigation, route}: {navigation: any; route: any}) {
  const [dataArray, setDataArray] = useState<any[]>([]);
  const [region, setRegion] = useState<any>(undefined);
  // const dataArray = retrieveAllData();
  const isDrawerOpen = useDrawerStatus() === 'open';
  useMMKVListener(key => {
    setDataArray(retrieveAllData());
    if (dataArray[dataArray.length - 1] != undefined)
      setRegion({
        latitude: dataArray[dataArray.length - 1]?.latitude,
        longitude: dataArray[dataArray.length - 1]?.longitude,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015,
      });
    else setRegion(undefined);
  });
  useEffect(() => {
    setDataArray(retrieveAllData());
    if (dataArray[dataArray.length - 1] != undefined)
      setRegion({
        latitude: dataArray[dataArray.length - 1]?.latitude,
        longitude: dataArray[dataArray.length - 1]?.longitude,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015,
      });
    else setRegion(undefined);
  }, [isDrawerOpen]);
  console.log(isDrawerOpen, route.name, 'IS THE TITLE');
  if (route.name == 'mapplotting')
    return (
      <View style={styles.container}>
        <MapView
          mapType={'satellite'}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={region}
          loadingEnabled={true}
          loadingIndicatorColor={'grey'}
          showsUserLocation={true}
          onMapReady={() => {
            setDataArray(retrieveAllData());
            if (dataArray[dataArray.length - 1] != undefined)
              setRegion({
                latitude: dataArray[dataArray.length - 1]?.latitude,
                longitude: dataArray[dataArray.length - 1]?.longitude,
                latitudeDelta: 0.0015,
                longitudeDelta: 0.0015,
              });
            else setRegion(undefined);
          }}
          showsMyLocationButton={true}>
          {dataArray.map((value, id) => {
            return (
              <>
                <Marker
                  key={id}
                  coordinate={{
                    latitude: value.latitude,
                    longitude: value.longitude,
                  }}
                  tappable>
                  <Callout tooltip={false} style={{borderRadius: 10}}>
                    <Text style={{color: 'blue'}}>{value.landCoverType}</Text>
                  </Callout>
                </Marker>
              </>
            );
          })}
        </MapView>
      </View>
    );
  else return null;
}

export default MapScreen;
