// componentes/AppNavigator.js

/*import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import FormScreen from './FormScreen';
import ListScreen from './ListScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* O Login continua sendo a tela inicial }
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro de Usuário' }} />
        
        {/* ALTERAÇÃO AQUI: Mudando os títulos das telas de formulário e lista }
        <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Cadastrar Projeto Integrador' }} />
        <Stack.Screen name="List" component={ListScreen} options={{ title: 'Projetos Cadastrados' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;*/

// componentes/AppNavigator.js

// componentes/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import DashboardScreen from './DashboardScreen';
import ListScreen from './ListScreen';

// 1. Importa as novas telas de formulário
import FormProjetoScreen from './FormProjetoScreen';
import FormCursoScreen from './FormCursoScreen';
import FormAlunoScreen from './FormAlunoScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro de Usuário' }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen 
          name="List" 
          component={ListScreen} 
          options={({ route }) => ({ title: `Gerenciar ${route.params.title}` })}
        />
        
        {/* 2. Registra as rotas para cada formulário específico */}
        <Stack.Screen name="FormProjeto" component={FormProjetoScreen} options={{ title: 'Adicionar Projeto' }} />
        <Stack.Screen name="FormCurso" component={FormCursoScreen} options={{ title: 'Adicionar Curso' }} />
        <Stack.Screen name="FormAluno" component={FormAlunoScreen} options={{ title: 'Adicionar Aluno' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;