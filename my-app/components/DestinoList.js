import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { DestinoContext } from '../context/DestinoContext';
import { updateDestinos } from '../services/api';
import { Platform } from 'react-native';

const { width } = Dimensions.get('window');


const DestinoList = ({ navigation }) => {
  const { destinos, loadDestinos, loading } = useContext(DestinoContext);

  const toggleFavorite = async (destino) => {
    try {
      await updateDestinos(destino.id, { isFavorite: !destino.isFavorite });
      await loadDestinos();
    } catch (error) {
      console.error('Error al cambiar favorito:', error);
    }
  };

  useEffect(() => {
    loadDestinos();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  if (!destinos.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No hay destinos disponibles</Text>
      </View>
    );
  }

  const renderDestino = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { width: width * 0.85 }]} 
      onPress={() => navigation.navigate('DestinoDetails', { destino: item })}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          {Platform.OS === 'android' ? (
            <Text style={[styles.favorite, item.isFavorite && styles.favoriteActive]}>
              ★
            </Text>
          ) : (
            <Text style={[styles.favorite, item.isFavorite && styles.favoriteActive]}>
              ❤
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <Text>{item.description}</Text>
        {item.difficulty}
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={destinos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderDestino}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 18, fontWeight: 'bold' },
  favorite: { fontSize: 18, color: 'gray' },
  favoriteActive: { color: Platform.OS === 'android' ? 'yellow' : 'pink' },
  difficulty: { marginTop: 10, fontWeight: 'bold' },
  facil: { color: 'green' },
  moderada: { color: 'yellow' },
  dificil: { color: 'purple' },
});

export default DestinoList;
