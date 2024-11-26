import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { DestinoContext } from '../context/DestinoContext';
import { postDestinos } from '../services/api';

const addDestino = ({ navigation }) => {
  const [destinoName, setDestinoName] = useState('');
  const { addDestino, loading } = useContext(DestinoContext);
  const [destinoDescription, setDestinoDescription] = useState('');
  //const [destinoDifficulty, setDestinoDifficulty]= useState ("")


  const handleSubmit = async () => {
    const newDestino = {
      name: destinoName,
      description: destinoDescription,
      //dificultad: destinoDifficulty
    };

    try {
      await postDestinos(newDestino.name, newDestino.description);// newDestino.difficulty   dificultad no me funciono a tiempo
      await addDestino(newDestino); 
      navigation.navigate('Destinos');
    } catch (error) {
      console.error('Error al agregar destino:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Destino</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Destino"
        value={destinoName}
        onChangeText={setDestinoName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={destinoDescription}
        onChangeText={setDestinoDescription}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Dificultad"
        value={destinoDifficulty}
        onChangeText={setDestinoName}
      />  */}

      <Button title="Crear Destino" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default addDestino;