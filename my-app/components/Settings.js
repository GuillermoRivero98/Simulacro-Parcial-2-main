import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Switch,
  Button,
  useWindowDimensions, 
  Platform, 
} from 'react-native';
import { DestinoContext } from '../context/DestinoContext';

const Settings = ({ navigation }) => {
  const { sortDestinos } = useContext(DestinoContext); 
  const { width, height } = useWindowDimensions(); 
  const [sortOrder, setSortOrder] = useState(null); 
  const [darkMode, setDarkMode] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false); 

  const sortOptions = [
    { label: 'Por nombre', value: 'name' },
  ];

  const handleSelect = (value) => {
    setSortOrder(value);
    sortDestinos(value); 
    setModalVisible(false); 
  };

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal: width * 0.05 }, 
        darkMode && styles.darkContainer, 
      ]}
    >
      <Text style={[styles.title, darkMode && styles.darkText]}>Configuraciones</Text>

      <Text style={[styles.label, darkMode && styles.darkText]}>Ordenar destinos:</Text>
      <TouchableOpacity
        style={[
          styles.selectButton,
          { width: width * 0.85 }, 
          darkMode && styles.darkSelectButton,
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.selectText, darkMode && styles.darkText]}>
          {sortOrder
            ? sortOrder === 'name'
              ? 'Por nombre'
              : 'Por cantidad de lunas'
            : 'Selecciona un orden...'}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              {
                width: width * 0.85, 
                maxHeight: height * 0.85, 
              },
            ]}
          >
            <Text style={styles.modalTitle}>Selecciona un orden</Text>
            <FlatList
              data={sortOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    { width: width * 0.85 }, 
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={[styles.closeButton, { width: width * 0.4 }]} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.switchContainer}>
        <Text style={[styles.label, darkMode && styles.darkText]}>Modo oscuro:</Text>
        <Switch
          value={darkMode}
          onValueChange={(value) => setDarkMode(value)}
          trackColor={{ false: 'gray', true: 'tomato' }}
          thumbColor={darkMode ? 'white' : 'blue'}
        />
      </View>

      <Button
        title="Volver a la lista de destinos"
        onPress={() => navigation.navigate('Destinos')}
        color={darkMode ? 'lightgreen' : 'blue'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  darkSelectButton: {
    backgroundColor: '#333',
    borderColor: '#666',
  },
  selectText: {
    fontSize: 16,
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Settings;