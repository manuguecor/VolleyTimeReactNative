import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useUsers } from '../../hooks/useUsers';

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);
  const router = useRouter();
  const { guardarUsuario } = useUsers();

  const handleLogin = async () => {
    if (!nombreUsuario || !contrasena) {
      Alert.alert('Campos incompletos', 'Por favor, completa todos los campos.');
      return;
    }

    setCargando(true);

    try {
      const res = await fetch('https://mock.apidog.com/m1/878633-860097-default/users');
      const data = await res.json();

      const usuarioEncontrado = data.find(
        (user) =>
          user.nombre_usuario === nombreUsuario &&
          user.contrasena === contrasena // ← Asegúrate de que la API devuelve este campo
      );

      if (usuarioEncontrado) {
        await guardarUsuario(usuarioEncontrado);
        router.replace('/dashboard');
      } else {
        Alert.alert('Credenciales incorrectas', 'Usuario o contraseña no válidos.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <View className="flex-1 bg-orange-500 items-center justify-center px-6">
      <Text className="text-white text-3xl font-bold mb-6">Iniciar Sesión</Text>

      <TextInput
        placeholder="Usuario"
        placeholderTextColor="#fff"
        value={nombreUsuario}
        onChangeText={setNombreUsuario}
        className="bg-white/20 text-white px-4 py-2 rounded-full w-full mb-4"
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#fff"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
        className="bg-white/20 text-white px-4 py-2 rounded-full w-full mb-6"
      />

      <Pressable
        onPress={handleLogin}
        className="bg-white px-6 py-3 rounded-full w-full items-center"
        disabled={cargando}
      >
        {cargando ? (
          <ActivityIndicator color="#f97316" />
        ) : (
          <Text className="text-orange-500 font-semibold">Entrar</Text>
        )}
      </Pressable>
    </View>
  );
};

export default Login;
