// componentes/FormAlunoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import useFirebase from '../hooks/useFirebase';

const FormAlunoScreen = ({ navigation, route }) => {
  const { collectionName } = route.params;
  const { addData, loading } = useFirebase();

  const [nomeAluno, setNomeAluno] = useState('');
  const [email, setEmail] = useState('');
  const [periodo, setPeriodo] = useState('');

  const handleSave = async () => {
    if (!nomeAluno.trim() || !email.trim() || !periodo.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    try {
      await addData(collectionName, { nome: nomeAluno, email: email, periodo: parseInt(periodo) });
      Alert.alert('Sucesso', 'Aluno salvo!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o aluno.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Aluno</Text>
      <TextInput style={styles.input} placeholder="Nome do Aluno" value={nomeAluno} onChangeText={setNomeAluno} />
      <TextInput style={styles.input} placeholder="E-mail do Aluno" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Período" value={periodo} onChangeText={setPeriodo} keyboardType="numeric" />
      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Salvar</Text>}
      </TouchableOpacity>
    </View>
  );
};

// Reutilizando os mesmos estilos
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5'},
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'},
    input: { width: '100%', minHeight: 50, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, fontSize: 16 },
    button: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});

export default FormAlunoScreen;