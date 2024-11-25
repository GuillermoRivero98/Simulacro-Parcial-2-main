const IP = "161.35.143.238";

export const fetchDestinos = async () => {
    try {
      const response = await fetch(`http://${IP}:8000/grivero`);
      if (!response.ok) throw new Error('Error al obtener los destinos');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const postDestinos = async (name, description) => {
    try {
      const response = await fetch(`http://${IP}:8000/grivero`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ 
          name, 
          description, 
        }), 
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al realizar el POST:', error);
      throw error;
    }
  };

  export const updateDestinos = async (id, updatedData) => {
    try {
      const response = await fetch(`http://${IP}:8000/grivero/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) throw new Error('Error al actualizar el destino');
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar el destino:', error);
      throw error;
    }
  };
  
  export const deleteDestino = async (id) => {
    try {
      const response = await fetch(`http://${IP}:8000/grivero/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar el destino');
      }
    } catch (error) {
      console.error('Error al eliminar el destino:', error);
      throw error;
    }
  };