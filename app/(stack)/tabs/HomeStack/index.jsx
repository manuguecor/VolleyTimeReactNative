import { View, Text, Pressable, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUsers } from '../../../../hooks/useUsers';
import PrivateRoute from '../../../PrivateRoute';

const HomeScreen = () => {
  const { usuario } = useUsers();

  return (
    <PrivateRoute>
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#f97316',
        paddingHorizontal: 24,
        paddingVertical: 32,
        justifyContent: 'space-between',
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="items-center">
        <Text className="text-white text-3xl font-bold text-center mb-6">
          ¡Hola, {usuario?.nombre_usuario || 'jugador'}!
        </Text>

        <Text className="text-white text-center text-lg mb-10 leading-relaxed">
          Elige tu próxima jugada
        </Text>

        <View className="space-y-4 w-full">
          <Link href="tabs/HomeStack/events" asChild>
            <Pressable className="bg-white flex-row items-center justify-between px-6 py-4 rounded-xl shadow-md mt-10">
              <Text className="text-orange-500 font-semibold text-lg">Ver Eventos</Text>
              <Ionicons name="calendar-outline" size={24} color="#f97316" />
            </Pressable>
          </Link>

          <Link href="tabs/HomeStack/reservations" asChild>
            <Pressable className="bg-white flex-row items-center justify-between px-6 py-4 rounded-xl shadow-md mt-10">
              <Text className="text-orange-500 font-semibold text-lg">Mis Reservas</Text>
              <Ionicons name="bookmark-outline" size={24} color="#f97316" />
            </Pressable>
          </Link>

          <Link href="tabs/HomeStack/users" asChild>
            <Pressable className="bg-white flex-row items-center justify-between px-6 py-4 rounded-xl shadow-md mt-10">
              <Text className="text-orange-500 font-semibold text-lg">Usuarios</Text>
              <Ionicons name="people-outline" size={24} color="#f97316" />
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
    </PrivateRoute>
  );
};

export default HomeScreen;