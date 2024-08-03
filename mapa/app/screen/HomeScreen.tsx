// screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../index';
import { RouteProp } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export default function HomeScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleNext = () => {
    navigation.navigate('Map', {
      name,
      surname,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
  };

  return (
    <View style={styles.container}>
      <Text>Nombre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      <Text>Apellido:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSurname}
        value={surname}
      />
      <Text>Latitud:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setLatitude}
        value={latitude}
        keyboardType="numeric"
      />
      <Text>Longitud:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setLongitude}
        value={longitude}
        keyboardType="numeric"
      />
      <Button
        title="Siguiente"
        onPress={handleNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
