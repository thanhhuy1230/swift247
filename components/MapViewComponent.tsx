import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapViewComponent() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 10.7984,
        longitude: 106.6667,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker
        coordinate={{ latitude: 10.7984, longitude: 106.6667 }}
        title="Bưu cục Trường Sơn"
        description="60A Trường Sơn, Phường 2, Tân Bình, TP.HCM"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { width: '100%', height: '100%' },
});