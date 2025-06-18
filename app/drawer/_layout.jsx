import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="users" options={{ drawerLabel: 'Usuarios' }} />
      <Drawer.Screen name="events" options={{ drawerLabel: 'Eventos' }} />
      <Drawer.Screen name="reservations" options={{ drawerLabel: 'Reservas' }} />
    </Drawer>
  );
}