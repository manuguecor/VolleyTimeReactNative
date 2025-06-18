import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

const EventoCard = ({ evento, userId }) => {
  const [estadoEvento, setEstadoEvento] = useState(evento);

  const { apuntados, suplentes, plazasMaximas } = estadoEvento;
  const yaApuntado = apuntados.includes(userId);
  const esSuplente = suplentes.includes(userId);

  const handleApuntarse = async () => {
    try {
      let nuevosApuntados = [...apuntados];
      let nuevosSuplentes = [...suplentes];

      if (apuntados.length < plazasMaximas) {
        nuevosApuntados.push(userId);
      } else {
        nuevosSuplentes.push(userId);
      }

      const res = await axios.put(
        `https://mock.apidog.com/m1/878633-860097-default/events/${evento.id}`,
        {
          ...estadoEvento,
          apuntados: nuevosApuntados,
          suplentes: nuevosSuplentes,
        }
      );

      setEstadoEvento(res.data);
      Alert.alert('✅ Inscripción', '¡Te has apuntado correctamente!');
    } catch (err) {
      console.error(err);
      Alert.alert('❌ Error', 'No se pudo completar la inscripción.');
    }
  };

  const handleCancelar = async () => {
    try {
      const nuevosApuntados = apuntados.filter((id) => id !== userId);
      const nuevosSuplentes = suplentes.filter((id) => id !== userId);

      const res = await axios.put(
        `https://mock.apidog.com/m1/878633-860097-default/events/${evento.id}`,
        {
          ...estadoEvento,
          apuntados: nuevosApuntados,
          suplentes: nuevosSuplentes,
        }
      );

      setEstadoEvento(res.data);
      Alert.alert('🔔 Cancelado', 'Te has dado de baja del evento');
    } catch (err) {
      console.error(err);
      Alert.alert('❌ Error', 'No se pudo cancelar la inscripción.');
    }
  };

  return (
    <View className="bg-white rounded-xl shadow p-4 mb-4">
      <Text className="text-lg font-bold mb-2">🏐 Partido en {estadoEvento.lugar}</Text>
      <Text><Text className="font-semibold">Fecha:</Text> {estadoEvento.fecha}</Text>
      <Text><Text className="font-semibold">Hora:</Text> {estadoEvento.hora}</Text>
      <Text><Text className="font-semibold">Plazas:</Text> {plazasMaximas}</Text>
      <Text><Text className="font-semibold">Apuntados:</Text> {apuntados.length}</Text>
      <Text><Text className="font-semibold">Suplentes:</Text> {suplentes.length}</Text>

      {yaApuntado || esSuplente ? (
        <TouchableOpacity
          className="bg-red-600 rounded-lg p-2 mt-3"
          onPress={handleCancelar}
        >
          <Text className="text-white text-center font-semibold">Cancelar inscripción</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="bg-yellow-500 rounded-lg p-2 mt-3"
          onPress={handleApuntarse}
        >
          <Text className="text-white text-center font-semibold">Apuntarse</Text>
        </TouchableOpacity>
      )}

      {esSuplente && (
        <Text className="text-orange-500 italic mt-2">
          🕓 Estás en la lista de suplentes
        </Text>
      )}
    </View>
  );
};

export default EventoCard;
