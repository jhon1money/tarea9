// screens/MapScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '..//index';
import { RouteProp } from '@react-navigation/native';
import * as Location from 'expo-location';

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;
type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;

type Props = {
  navigation: MapScreenNavigationProp;
  route: MapScreenRouteProp;
};

export default function MapScreen({ route }: Props) {
  const { name, surname, latitude, longitude } = route.params;
  const [locationDetails, setLocationDetails] = useState('');

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        let [location] = await Location.reverseGeocodeAsync({ latitude, longitude });
        setLocationDetails(`${location.city}, ${location.country}`);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocationDetails();
  }, [latitude, longitude]);

  const handleMarkerPress = () => {
    Alert.alert(
      'Información del Marcador',
      `Nombre: ${name}\nApellido: ${surname}\nUbicación: ${locationDetails}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={`${name} ${surname}`}
          description={locationDetails}
          onPress={handleMarkerPress}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
