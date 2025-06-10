import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// A linha abaixo foi corrigida para importar o arquivo certo da forma correta.
import auth from './services/credenciaisFirebaseAuth';
import { ActivityIndicator, View } from 'react-native';

// Importe todas as suas telas
import LoginScreen from './componentes/LoginScreen';
import RegisterScreen from './componentes/RegisterScreen';
import DashboardScreen from './componentes/DashboardScreen';
import FormAlunoScreen from './componentes/FormAlunoScreen';
import FormCursoScreen from './componentes/FormCursoScreen';
import FormProjetoScreen from './componentes/FormProjetoScreen';
import ListScreen from './componentes/ListScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

/**
 * Navegador para usuários NÃO autenticados.
 * Contém apenas as telas de Login e Cadastro.
 */
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
  </Stack.Navigator>
);

/**
 * Navegador para usuários AUTENTICADOS.
 * Contém as telas principais do app, como o Dashboard.
 */
const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="FormAluno" component={FormAlunoScreen} options={{ title: 'Cadastrar Aluno' }} />
    <Stack.Screen name="FormCurso" component={FormCursoScreen} options={{ title: 'Cadastrar Curso' }} />
    <Stack.Screen name="FormProjeto" component={FormProjetoScreen} options={{ title: 'Cadastrar Projeto' }} />
    <Stack.Screen name="List" component={ListScreen} options={{ title: 'Listagem' }} />
  </Stack.Navigator>
);

/**
 * Componente principal do navegador.
 * Ele verifica o estado de autenticação e renderiza o navegador correto.
 */
const AppNavigator = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Observa mudanças no estado de autenticação do Firebase.
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(user => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber; // Encerra o observador quando o componente é desmontado
  }, []);

  // Enquanto o estado de autenticação está sendo verificado, mostra uma tela de carregamento.
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;

