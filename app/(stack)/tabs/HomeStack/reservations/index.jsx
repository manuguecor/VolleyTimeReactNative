import React from 'react';
import { View, Text, FlatList } from 'react-native';
import {useReservas} from '../../../../../hooks/useReservas';
import { useUsers } from '../../../../../hooks/useUsers';

const Reservas = () => {
  const { usuario} = useUsers();
  const { reservas, loading, error } = useReservas(usuario?.id);

  if (loading) {
    return (
      <View className="p-4 mt-8">
        <Text className="text-base" style={{ fontFamily: 'Rasa-VariableFont' }}>Cargando reservas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="p-4 mt-8">
        <Text className="text-base text-red-600" style={{ fontFamily: 'Rasa-VariableFont' }}>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item: evento }) => (
    <View className="bg-white rounded-xl shadow-md w-full p-4 mb-4">
      <Text className="text-orange-500 font-semibold">Partido en {evento.lugar}</Text>
      <Text><Text className="text-orange-500 font-semibold">Fecha:</Text> {evento.fecha}</Text>
      <Text><Text className="text-orange-500 font-semibold">Hora:</Text> {evento.hora}</Text>
      <Text>
        <Text className="text-orange-500 font-semibold">Apuntados:</Text> {evento.apuntados.length} / {evento.plazasMaximas}
      </Text>
      {evento.suplentes.includes(usuario.id) && (
        <Text className="text-orange-500 italic mt-2">Estás en la lista de suplentes</Text>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-orange-500 px-6 pt-12">
      {reservas.length === 0 ? (
        <Text className="text-base" style={{ fontFamily: 'Rasa-VariableFont' }}>No tienes reservas activas.</Text>
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Reservas;
