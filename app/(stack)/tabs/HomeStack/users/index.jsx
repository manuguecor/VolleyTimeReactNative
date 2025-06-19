import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';

const Users = () => {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://mock.apidog.com/m1/878633-860097-default/users')
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener los jugadores');
        return res.json();
      })
      .then((data) => {
        setJugadores(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);


  const renderItem = ({ item }) => (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-md w-full">
      <Text className="text-orange-500 font-semibold">Usuario:  <Text className="mb-2 text-gray-700">{item.nombre_usuario}</Text></Text>
      <Text className="text-orange-500 font-semibold">Nombre:  <Text className="text-gray-700">{item.nombre} {item.apellidos}</Text></Text>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-orange-500 px-4">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="mt-4 text-white text-lg">Cargando jugadores...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-orange-500 px-4">
        <Text className="text-white font-semibold text-lg text-center">
          Error: {error}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-orange-500 px-6 pt-12">
      <FlatList
        data={jugadores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Users;
