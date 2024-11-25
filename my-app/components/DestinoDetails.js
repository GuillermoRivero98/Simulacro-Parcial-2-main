import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import DeleteDestino from './DeleteDestino';


const DestinoDetails = ({ route, navigation }) => {
  const { destino: initialDestino } = route.params;
  const [destino, setDestino] = useState(initialDestino);

  useEffect(() => {
    setDestino(initialDestino);
  }, [initialDestino]);

  if (!destino) {
    return <Text>Destino no encontrado.</Text>;
  }

  const handleDeleteSuccess = () => {
    navigation.goBack();
  };

  const handleDeleteError = () => {
    Alert.alert('Error', 'No se pudo eliminar el destino. Intenta nuevamente.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{destino.name}</Text>
      <Text style={styles.description}>{destino.description}</Text>
      <Button
        title="Editar"
        onPress={() => navigation.navigate('EditDestino', { destino })}
      />
      <DeleteDestino
        destinoId={destino.id}
        onDeleteSuccess={handleDeleteSuccess}
        onDeleteError={handleDeleteError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },

});

export default DestinoDetails;
