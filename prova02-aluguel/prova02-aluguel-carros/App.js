import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigator from './componentes/AppNavigator';
import * as SplashScreen from 'expo-splash-screen';

// Isso impede que a tela de splash se esconda automaticamente
// antes que o nosso app esteja pronto.
SplashScreen.preventAutoHideAsync();

export default function App() {

  // Nós criamos uma função que será chamada quando o layout principal do nosso app
  // estiver pronto para ser desenhado na tela.
  const onLayoutRootView = useCallback(async () => {
    // A única coisa que essa função faz é esconder a splash screen.
    await SplashScreen.hideAsync();
  }, []);

  // O onLayout é um evento que nos avisa: "Ok, a View está pronta!".
  // Nesse momento, chamamos nossa função para esconder a splash screen,
  // resultando em uma transição suave.
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});