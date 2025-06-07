import React from 'react';
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
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Registrar Aluguel' }} />
        <Stack.Screen name="List" component={ListScreen} options={{ title: 'Aluguéis Registrados' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;