import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const FormScreen = ({ navigation }) => {
  const [carName, setCarName] = useState('');
  const [clientName, setClientName] = useState('');
  const [rentValue, setRentValue] = useState('');
  const [rentDate, setRentDate] = useState('');

  const handleSaveRental = () => {
    if (!carName.trim() || !clientName.trim() || !rentValue.trim() || !rentDate.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    firestore()
      .collection('rentals') // O nome da sua coleção no Firestore
      .add({
        carName: carName,
        clientName: clientName,
        rentValue: parseFloat(rentValue), // Salva como número
        rentDate: rentDate,
        createdAt: firestore.FieldValue.serverTimestamp(), // Data de criação
      })
      .then(() => {
        Alert.alert('Sucesso', 'Aluguel registrado com sucesso!');
        // Limpa os campos após salvar
        setCarName('');
        setClientName('');
        setRentValue('');
        setRentDate('');
      })
      .catch((error) => {
        console.error("Erro ao registrar aluguel: ", error);
        Alert.alert('Erro', 'Não foi possível registrar o aluguel.');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Novo Aluguel</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome do Carro"
        value={carName}
        onChangeText={setCarName}
        placeholderTextColor="#888"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nome do Cliente"
        value={clientName}
        onChangeText={setClientName}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Valor do Aluguel"
        value={rentValue}
        onChangeText={setRentValue}
        keyboardType="numeric"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Data do Aluguel (DD/MM/AAAA)"
        value={rentDate}
        onChangeText={setRentDate}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveRental}>
        <Text style={styles.buttonText}>Salvar Aluguel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('List')}>
        <Text style={styles.navButtonText}>Ver Aluguéis Registrados</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navButton: {
    marginTop: 20,
  },
  navButtonText: {
    color: '#3498db',
    fontSize: 16,
  },
});

export default FormScreen;