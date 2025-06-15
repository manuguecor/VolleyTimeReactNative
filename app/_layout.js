import '../global.css';
import { Slot, SplashScreen } from 'expo-router';
import {useFonts} from "expo-font";
import React, {useEffect} from "react";

// Ocultamos el SplashScreen hasta que las fuentes estén cargadas
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    // Cargamos las fuentes necesarias para la aplicación

    const [fontsLoaded, error] = useFonts({
        'Rasa-VariableFont': require('../assets/fonts/Rasa-VariableFont.ttf')
    });

    // Ocultamos el SplashScreen cuando las fuentes estén cargadas
    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) return null;

    return (
            <Slot/>
    );
};
export default RootLayout;