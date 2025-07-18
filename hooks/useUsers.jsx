import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const CLAVE_USUARIO = 'usuario';

export const useUsers = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarUsuario();
  }, []);

  const cargarUsuario = async () => {
    try {
      const data = await SecureStore.getItemAsync(CLAVE_USUARIO);
      if (data) {
        setUsuario(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error cargando usuario:', error);
    } finally {
      setCargando(false);
    }
  };

  const guardarUsuario = async (usuarioObj) => {
    try {
      await SecureStore.setItemAsync(CLAVE_USUARIO, JSON.stringify(usuarioObj));
      setUsuario(usuarioObj);
    } catch (error) {
      console.error('Error guardando usuario:', error);
    }
  };

  const actualizarUsuario = async (datosActualizados) => {
    try {
      const data = await SecureStore.getItemAsync(CLAVE_USUARIO);
      if (data) {
        const usuarioActual = JSON.parse(data);
        const usuarioActualizado = { ...usuarioActual, ...datosActualizados };
        await SecureStore.setItemAsync(CLAVE_USUARIO, JSON.stringify(usuarioActualizado));
        setUsuario(usuarioActualizado);
      } else {
        console.warn('No hay usuario guardado para actualizar');
      }
    } catch (error) {
      console.error('Error actualizando usuario:', error);
    }
  };

  const borrarUsuario = async () => {
    try {
      await SecureStore.deleteItemAsync(CLAVE_USUARIO);
      setUsuario(null);
    } catch (error) {
      console.error('Error eliminando usuario:', error);
    }
  };

  return {
    usuario,
    cargando,
    guardarUsuario,
    actualizarUsuario,
    borrarUsuario,
    recargarUsuario: cargarUsuario,
  };
};

