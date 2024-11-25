import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { updateDestinos } from '../services/api';

const EditDestino = ({ route, navigation }) => {
  const { destino } = route.params;
  const [name, setName] = useState(destino.name);
  const [description, setDescription] = useState(destino.description);

  const handleUpdate = async () => {
    if (!name || !description) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      await updateDestinos(destino.id, { name, description});
      navigation.navigate('DestinoList'); 
    } catch (error) {
      console.error('Error al actualizar destino:', error);
      Alert.alert('Error', 'No se pudo actualizar el destino.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del destino"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Guardar Cambios" onPress={handleUpdate} color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default EditDestino;
