import React from 'react';
import { View, Text, FlatList } from 'react-native';
// import useReservas from '../hooks/useReservas';
// import useAuth from '../hooks/useAuth';

const Reservas = () => {
//   const { usuario } = useAuth();
//   const { reservas, loading, error } = useReservas(usuario?.id);

//   if (loading) {
    return (
      <View className="p-4 mt-8">
        <Text className="text-base">Cargando reservas...</Text>
      </View>
    );
//   }

//   if (error) {
//     return (
//       <View className="p-4 mt-8">
//         <Text className="text-base text-red-600">Error: {error}</Text>
//       </View>
//     );
//   }

//   const renderItem = ({ item: evento }) => (
//     <View className="bg-gray-100 rounded-xl p-4 mb-4">
//       <Text className="text-lg font-bold mb-1">Partido en {evento.lugar}</Text>
//       <Text><Text className="font-semibold">Fecha:</Text> {evento.fecha}</Text>
//       <Text><Text className="font-semibold">Hora:</Text> {evento.hora}</Text>
//       <Text>
//         <Text className="font-semibold">Apuntados:</Text> {evento.apuntados.length} / {evento.plazasMaximas}
//       </Text>
//       {evento.suplentes.includes(usuario.id) && (
//         <Text className="text-orange-500 italic mt-2">Estás en la lista de suplentes</Text>
//       )}
//     </View>
//   );

//   return (
//     <View className="p-4 mt-8">
//       <Text className="text-xl font-bold mb-4">MIS RESERVAS</Text>
//       {reservas.length === 0 ? (
//         <Text className="text-base">No tienes reservas activas.</Text>
//       ) : (
//         <FlatList
//           data={reservas}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderItem}
//         />
//       )}
//     </View>
//   );
};

export default Reservas;
