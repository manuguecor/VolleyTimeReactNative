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
            <Stack.Screen name="tabs/index" options={{
                title: ""
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
            <Stack.Screen name="tabs/HomeStack/users/index" options={{
                title: "Usuarios"
            }}>
            </Stack.Screen>
            <Stack.Screen name="tabs/usersProfile/index" options={{
                title: "Mi perfil"
            }}>
                 </Stack.Screen>
                 <Stack.Screen name="tabs/HomeStack/reservations/index" options={{
                title: "Reservas"
            }}>
                 </Stack.Screen>
                 <Stack.Screen name="tabs/HomeStack/events/index" options={{
                title: "Eventos"
            }}></Stack.Screen>
        
        </Stack>
    )
}

export default StackLayout;