import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useUsers } from '../../../hooks/useUsers';
import { Link } from 'expo-router';

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
          user.contrasena === contrasena 
      );

      if (usuarioEncontrado) {
        await guardarUsuario(usuarioEncontrado);
        router.replace('/tabs');
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
 <View className="flex-1 bg-orange-500 px-6 pt-24 py-8 justify-between">

      <View className="items-center gap-y-4">
      <Text className="text-white text-3xl font-extrabold mb-6">Iniciar Sesión</Text>

      <TextInput
        placeholder="Usuario"
        placeholderTextColor="#fff"
        value={nombreUsuario}
        onChangeText={setNombreUsuario}
        className="bg-white/20 text-white px-4 py-3 rounded-full w-full"
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#fff"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
        className="bg-white/20 text-white px-4 py-3 rounded-full w-full mb-6"
      />

      <Pressable
        onPress={handleLogin}
        className="bg-white px-6 py-3 rounded-full w-full items-center"
        disabled={cargando}
      >
        {cargando ? (
          <ActivityIndicator color="#f97316" />
        ) : (
          <Text className="text-orange-500 font-bold ">Entrar</Text>
        )}
      </Pressable>
      </View>
<View className="pb-12" >
      <Link href="/dashboard" asChild>
        <Pressable className="border border-white rounded-full px-8 py-3 w-full max-w-xs self-center">
          <Text className="text-white font-semibold text-lg text-center">Volver a inicio</Text>
        </Pressable>
      </Link>
      </View>
    </View>
  );
};

export default Login;
