import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import "./global.css";
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded, error] = useFonts({
    'Rasa-VariableFont': require('./assets/fonts/Rasa-VariableFont.ttf'),
  });

  if (!fontsLoaded && !error) return null;

  return (
    <View className="flex-1 bg-orange-500 items-center justify-center px-6">
      <Text className="text-5xl text-white mb-6" style={{ fontFamily: 'Rasa-VariableFont' }}>
        VolleyTime
      </Text>

      <TouchableOpacity
        className="bg-white rounded-full px-8 py-3"
        activeOpacity={0.8}
        onPress={() => alert('Login button pressed')}
      >
        <Text className="text-orange-500 font-semibold text-lg">Login</Text>
      </TouchableOpacity>

      <StatusBar style="light" />
    </View>
  );
}
