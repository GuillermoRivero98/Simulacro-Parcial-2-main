import React, { createContext, useState } from 'react';
import { fetchDestinos } from '../services/api';

export const DestinoContext = createContext();

export const DestinoProvider = ({ children }) => {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDestinos = async () => {
    try {
      setLoading(true);
      const data = await fetchDestinos();
      setDestinos(data);
    } catch (error) {
      console.error('Error al cargar destinos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addDestino = async (newDestino) => {
    try {
      setLoading(true);
      setDestinos((prevDestinos) => [...prevDestinos, newDestino]);
      await loadDestinos();
    } catch (error) {
      console.error('Error al agregar destino:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateDestino = (id, updatedData) => {
    setDestinos((prevDestinos) =>
      prevDestinos.map((destino) =>
        destino.id === id ? { ...destino, ...updatedData } : destino
      )
    );
  };

  const sortDestinos = (order) => {
    if (order === 'name') {
      setDestinos((prevDestinos) =>
        [...prevDestinos].sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  };

  return (
    <DestinoContext.Provider
      value={{
        destinos,
        loading,
        setDestinos,
        addDestino,
        loadDestinos,
        updateDestino,
        sortDestinos, 
      }}
    >
      {children}
    </DestinoContext.Provider>
  );
};