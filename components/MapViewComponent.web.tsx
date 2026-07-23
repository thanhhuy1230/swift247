import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function MapViewComponent() {
  return (
    <View style={styles.container}>
      {/* Sử dụng thẻ iframe nhúng Google Maps chuẩn cho web */}
      {/* @ts-ignore */}
      <iframe
        src="https://maps.google.com/maps?q=10.7984,106.6667&z=15&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%' },
});