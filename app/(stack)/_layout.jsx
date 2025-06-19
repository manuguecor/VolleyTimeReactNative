import {Stack} from "expo-router";

const StackLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerShadowVisible: false,

                headerStyle: {
                    backgroundColor: "#fff",
                },
                headerTintColor: "#f97314",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen name="tabs/home/index" options={{
                title: "Home"
            }}>
            </Stack.Screen>
            <Stack.Screen name="dashboard/index" options={{
                title: "Inicio"
            }}>
            </Stack.Screen>
            <Stack.Screen name="login/index" options={{
                title: "Iniciar sesión"
            }}>
            </Stack.Screen>
            <Stack.Screen name="users/index" options={{
                title: "Jugadores"
            }}>
            </Stack.Screen>
            <Stack.Screen name="tabs/usersProfile/index" options={{
                title: "Mi perfil"
            }}>
                 </Stack.Screen>
                 <Stack.Screen name="reservations/index" options={{
                title: "Reservas"
            }}>
                 </Stack.Screen>
                 <Stack.Screen name="events/index" options={{
                title: "Eventos"
            }}></Stack.Screen>
        
        </Stack>
    )
}

export default StackLayout;