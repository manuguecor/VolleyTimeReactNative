import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
// import EventoCard from '../components/EventoCard';
// import useAuth from '../hooks/useAuth';

const Eventos = () => {
//   const { usuario } = useAuth();

//   const [eventos, setEventos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('https://mock.apidog.com/m1/878633-860097-default/events')
//       .then((res) => {
//         if (!res.ok) throw new Error('Error al obtener los eventos');
//         return res.json();
//       })
//       .then((data) => {
//         setEventos(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <Text className="p-4 text-base">Cargando eventos...</Text>;
//   }

//   if (error) {
//     return <Text className="p-4 text-red-600">Error: {error}</Text>;
//   }

  return (
    <View className="p-4">
      <Text className="text-xl font-bold mb-4">PRÓXIMOS EVENTOS</Text>

      <Text className="text-lg font-montserrat">Texto en Montserrat</Text>
    </View>
  );
};

export default Eventos;
