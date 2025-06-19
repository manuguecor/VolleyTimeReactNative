import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useUsers } from '../hooks/useUsers';

const PrivateRoute = ({ children }) => {
  const { usuario, cargando } = useUsers();
  const router = useRouter();

  useEffect(() => {
    if (!cargando && !usuario) {
      Alert.alert('Acceso denegado', 'Debes iniciar sesión para acceder a esta sección');
      router.replace('/login');
    }
  }, [cargando, usuario]);

  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#f97316" />
        <Text style={{ marginTop: 16, color: '#f97316' }}>Validando sesión...</Text>
      </View>
    );
  }

  if (!usuario) {
    // Mientras redirige después del alert, no renderiza nada.
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
