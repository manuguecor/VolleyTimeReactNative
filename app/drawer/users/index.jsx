import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { Link } from 'expo-router';

const PAGE_SIZE = 5;

const Users = () => {
  const [jugadores, setJugadores] = useState([]);
  const [visibleJugadores, setVisibleJugadores] = useState([]);
  const [page, setPage] = useState(1);
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
        setVisibleJugadores(data.slice(0, PAGE_SIZE));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const moreItems = jugadores.slice(start, end);

    if (moreItems.length > 0) {
      setVisibleJugadores(prev => [...prev, ...moreItems]);
      setPage(nextPage);
    }
  };

  const renderItem = ({ item }) => (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-md w-full">
      <Text className="text-orange-500 font-semibold">Usuario:</Text>
      <Text className="mb-2 text-gray-700">{item.nombre_usuario}</Text>
      <Text className="text-orange-500 font-semibold">Nombre:</Text>
      <Text className="text-gray-700">{item.nombre} {item.apellidos}</Text>
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
      <Text className="text-3xl font-bold text-white text-center mb-6">
        Listado de Jugadores
      </Text>

      <FlatList
        data={visibleJugadores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Users;
