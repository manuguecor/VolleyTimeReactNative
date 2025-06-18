import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerLeft: () => <DrawerToggleButton />, // Mostrar el ícono del drawer
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Inicio", tabBarIcon: () => <Text>🏐</Text> }}
      />
       <Tabs.Screen
        name="userProfile"
        options={{ title: "Profile", tabBarIcon: () => <Text>🏠</Text> }}
      /> 
     
    </Tabs>
  );
}
