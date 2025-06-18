import React from 'react';
import { View, Text, ScrollView, Image, Pressable, Dimensions } from 'react-native';
import { Link } from 'expo-router';

const Dashboard = () => {
  const screenHeight = Dimensions.get('window').height;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#f97316', // orange-500
        paddingHorizontal: 24,
        paddingVertical: 32,
        justifyContent: 'space-between',
        minHeight: screenHeight,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="items-center gap-y-6">
      <Text className="text-4xl font-extrabold text-white text-center leading-tight">
          Bienvenido a VolleyTime
        </Text>
        <Text className="text-lg text-white text-center mb-8 leading-relaxed px-4">
        Organiza y reserva partidos y eventos de voley de forma rápida y sencilla.
        </Text>

        {/* Carousel simulado con scroll horizontal */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
          contentContainerStyle={{ gap: 16 }}
        >
          <Image
            source={{ uri: 'https://imgs.search.brave.com/46FLN9SCnApahDHSauyWNlyVam5phGkJDT3NR-Xk7BA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcy/LnJ0dmUuZXMvcC8x/MDAwNTQ3L2ltZ3Bv/cnRhZGEvP2g9NDAw' }}
            className="w-72 h-44 rounded-xl"
            resizeMode="cover"
          />
          <Image
            source={{ uri: 'https://imgs.search.brave.com/2rJZhiXdD2sFksYmazLMlIl3BwCMlCVJR02exL29bao/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/LzhjL0V1cm9wZWlf/ZGlfcGFsbGF2b2xv/XzIwMDVfLV9JdGFs/aWEtUnVzc2lhLmpw/Zw' }}
            className="w-72 h-44 rounded-xl"
            resizeMode="cover"
          />
          <Image
            source={{ uri: 'https://imgs.search.brave.com/oWMqRL-DtwhRBsu0300SYUylwDbl2TYDgy-AN1E-BSA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zcG9y/dGdhcnJpZG8uY29t/L2Nkbi9zaG9wL3By/b2R1Y3RzL00xMTE5/NTBUUklCQUxMRlVO/Vk9MRVlQTEFZQS5q/cGc_dj0xNjU4MjI3/MTQ4JndpZHRoPTEy/ODA' }}
            className="w-72 h-44 rounded-xl"
            resizeMode="cover"
          />
        </ScrollView>

        <Text className="text-white text-center mb-10 leading-relaxed px-4 mb-6">
          Nuestra plataforma conecta a jugadores y organizadores para crear una comunidad activa de voley.
          Ya sea que busques un partido amistoso o un torneo competitivo, aquí es donde empieza el juego. 
        </Text>

        <Link href="/login" asChild>
        <Pressable className="border border-white rounded-full px-8 py-3 w-full max-w-xs self-center">
          <Text className="text-white font-semibold text-lg text-center">Acceder</Text>
        </Pressable>
      </Link>
      </View>
     
    </ScrollView>
  )
};

export default Dashboard;
