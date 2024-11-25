import React, { useContext, useState } from 'react';
import { Alert, Button } from 'react-native';
import { deleteDestino} from '../services/api';
import { DestinoContext } from '../context/DestinoContext';

const DeleteDestino = ({ destinoId, destinoName, onDeleteSuccess, onDeleteError }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const {loadDestinos} = useContext(DestinoContext);

  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de que deseas eliminar el destino ${destinoName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true);
            try {
              await deleteDestino(destinoId);
              await loadDestinos();
              onDeleteSuccess(); 
            } catch (error) {
              console.error('Error al eliminar el destino:', error);
              onDeleteError(error); 
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <Button
      title={isDeleting ? 'Eliminando...' : 'Eliminar'}
      onPress={handleDelete}
      color="red"
      disabled={isDeleting}
    />
  );
};

export default DeleteDestino;