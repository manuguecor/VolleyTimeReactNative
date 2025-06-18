import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useUsers } from '../../../../hooks/useUsers';

const UsersProfile = () => {
  const router = useRouter();
  const { usuario, actualizarUsuario, borrarUsuario } = useUsers();

  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    nombre_usuario: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        nombre_usuario: usuario.nombre_usuario,
      });
      setLoading(false);
    }
  }, [usuario]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleGuardar = async () => {
    try {
      const res = await fetch(
        `https://mock.apidog.com/m1/878633-860097-default/users/edit/${usuario.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error('Error al guardar los cambios');
      const dataActualizado = await res.json();
      await actualizarUsuario(dataActualizado);
      setEditando(false);
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleBorrar = async () => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que deseas borrar tu perfil?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: async () => {
            try {
              const res = await fetch(
                `https://mock.apidog.com/m1/878633-860097-default/users/delete/${usuario.id}`,
                {
                  method: 'DELETE',
                }
              );
              if (!res.ok) throw new Error('Error al borrar el perfil');
              await borrarUsuario();
              router.replace('/home');
            } catch (err) {
              Alert.alert('Error', err.message);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-orange-500">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View className="flex-1 items-center justify-center bg-orange-500 px-6">
        <Text className="text-white text-lg">No se encontró el usuario.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-orange-500 px-6 pt-12">
      <Text className="text-3xl font-bold text-white mb-6 text-center">Mi Perfil</Text>

      {editando ? (
        <>
          {['nombre', 'apellidos', 'correo', 'nombre_usuario'].map((field) => (
            <TextInput
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChangeText={(value) => handleChange(field, value)}
              className="bg-white/20 text-white px-4 py-3 rounded-full mb-4"
              placeholderTextColor="#fff"
            />
          ))}

          <View className="flex-row justify-between space-x-3 mt-2">
            <Pressable onPress={handleGuardar} className="flex-1 bg-white px-4 py-3 rounded-full items-center">
              <Text className="text-orange-500 font-semibold">Guardar</Text>
            </Pressable>
            <Pressable onPress={() => setEditando(false)} className="flex-1 bg-white/20 px-4 py-3 rounded-full items-center">
              <Text className="text-white font-semibold">Cancelar</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Text className="text-white mb-2"><Text className="font-bold">Nombre:</Text> {usuario.nombre}</Text>
          <Text className="text-white mb-2"><Text className="font-bold">Apellidos:</Text> {usuario.apellidos}</Text>
          <Text className="text-white mb-2"><Text className="font-bold">Email:</Text> {usuario.correo}</Text>
          <Text className="text-white mb-6"><Text className="font-bold">Usuario:</Text> {usuario.nombre_usuario}</Text>

          <View className="flex-row justify-between space-x-3">
            <Pressable onPress={() => setEditando(true)} className="flex-1 bg-white px-4 py-3 rounded-full items-center">
              <Text className="text-orange-500 font-semibold">Modificar</Text>
            </Pressable>
            <Pressable onPress={handleBorrar} className="flex-1 bg-red-600 px-4 py-3 rounded-full items-center">
              <Text className="text-white font-semibold">Borrar Perfil</Text>
            </Pressable>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default UsersProfile;
