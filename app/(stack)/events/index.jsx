import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useUsers } from '../../../hooks/useUsers';

const EventoItem = ({ evento, userId }) => {
  const [estadoEvento, setEstadoEvento] = useState(evento);
  const { apuntados, suplentes, plazasMaximas } = estadoEvento;

  const yaApuntado = apuntados.includes(userId);
  const esSuplente = suplentes.includes(userId);

  const actualizarEvento = async (nuevosApuntados, nuevosSuplentes) => {
    try {
      const res = await fetch(`https://mock.apidog.com/m1/878633-860097-default/events/${evento.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...evento,
          apuntados: nuevosApuntados,
          suplentes: nuevosSuplentes,
        }),
      });

      if (!res.ok) throw new Error('Error al actualizar el evento');

      const data = await res.json();
      setEstadoEvento(data);
      return true;
    } catch (error) {
      console.error(error);
      Alert.alert('❌ Error', 'No se pudo actualizar el evento.');
      return false;
    }
  };

  const handleApuntarse = async () => {
    let nuevosApuntados = [...apuntados];
    let nuevosSuplentes = [...suplentes];

    if (apuntados.length < plazasMaximas) {
      nuevosApuntados.push(userId);
    } else {
      nuevosSuplentes.push(userId);
    }

    const exito = await actualizarEvento(nuevosApuntados, nuevosSuplentes);
    if (exito) {
      Alert.alert('✅ Inscripción', '¡Te has apuntado correctamente!');
    }
  };

  const handleCancelar = async () => {
    const nuevosApuntados = apuntados.filter((id) => id !== userId);
    const nuevosSuplentes = suplentes.filter((id) => id !== userId);

    const exito = await actualizarEvento(nuevosApuntados, nuevosSuplentes);
    if (exito) {
      Alert.alert('🔔 Cancelado', 'Te has dado de baja del evento');
    }
  };

  return (
    <View className="bg-white rounded-xl shadow-md w-full p-4 mb-4">
      <Text className="text-lg font-bold mb-2">🏐 Partido en {estadoEvento.lugar}</Text>
      <Text><Text className="text-orange-500 font-semibold">Fecha:</Text> {estadoEvento.fecha}</Text>
      <Text><Text className="text-orange-500 font-semibold">Hora:</Text> {estadoEvento.hora}</Text>
      <Text><Text className="text-orange-500 font-semibold">Plazas:</Text> {plazasMaximas}</Text>
      <Text><Text className="text-orange-500 font-semibold">Apuntados:</Text> {apuntados.length}</Text>
      <Text><Text className="text-orange-500 font-semibold">Suplentes:</Text> {suplentes.length}</Text>

      {yaApuntado || esSuplente ? (
        <TouchableOpacity className="bg-red-600 rounded-lg p-2 mt-3" onPress={handleCancelar}>
          <Text className="text-white text-center font-semibold">Cancelar inscripción</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity className="bg-green-500 rounded-lg p-2 mt-3" onPress={handleApuntarse}>
          <Text className="text-white text-center font-semibold">Apuntarse</Text>
        </TouchableOpacity>
      )}

      {esSuplente && (
        <Text className="text-orange-500 italic mt-2">🕓 Estás en la lista de suplentes</Text>
      )}
    </View>
  );
};

const Eventos = () => {
  const { usuario } = useUsers();
  const userId = usuario?.id;

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://mock.apidog.com/m1/878633-860097-default/events')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener los eventos');
        return res.json();
      })
      .then(data => {
        setEventos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="mt-4 text-orange-500">Cargando eventos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-600">{error}</Text>
      </View>
    );
  }

  if (!userId) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-gray-500">Inicia sesión para ver los eventos.</Text>
      </View>
    );
  }

  if (eventos.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-gray-500">No hay eventos disponibles.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-orange-500 px-6 pt-12">
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EventoItem evento={item} userId={userId} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Eventos;
