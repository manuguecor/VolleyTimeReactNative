import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <View className="flex-1 items-center justify-center bg-orange-500 px-6">
      <Text className="text-4xl font-bold text-white mb-4">VolleyTime</Text>
      <Text className="text-lg text-white text-center mb-8">
        Bienvenido a la app de voleibol definitiva.
      </Text>

      <Link href="/dashboard" asChild>
        <Pressable className="bg-white px-6 py-3 rounded-full">
          <Text className="text-orange-500 font-semibold">Ir al Dashboard</Text>
        </Pressable>
      </Link>
    </View>
  )
};

export default Home;
