import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';           
import Events from './events';
import HomeScreen from './home';
import Reservations from './reservations';
import Users from './users';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="Reservations" component={Reservations} />
      <Stack.Screen name="Users" component={Users} />
    </Stack.Navigator>
  );
}
