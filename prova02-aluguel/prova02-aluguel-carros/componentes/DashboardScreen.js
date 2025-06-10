// componentes/DashboardScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import auth from '../services/credenciaisFirebaseAuth';

const DashboardScreen = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth).then(() => navigation.replace('Login')).catch(error => Alert.alert("Erro", "Não foi possível sair."));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel de Controle</Text>
      <Text style={styles.subtitle}>Selecione o que deseja gerenciar:</Text>

      {/* Navega para a Lista, informando que queremos ver a coleção 'projetos' */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('List', { collectionName: 'projetos', title: 'Projetos' })}>
        <Text style={styles.buttonText}>Gerenciar Projetos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('List', { collectionName: 'cursos', title: 'Cursos' })}>
        <Text style={styles.buttonText}>Gerenciar Cursos</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('List', { collectionName: 'alunos', title: 'Alunos' })}>
        <Text style={styles.buttonText}>Gerenciar Alunos</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 40, color: 'gray' },
  button: { backgroundColor: '#3498db', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  logoutButton: { position: 'absolute', bottom: 40, alignSelf: 'center' },
  logoutText: { color: '#e74c3c', fontSize: 16 }
});

export default DashboardScreen;