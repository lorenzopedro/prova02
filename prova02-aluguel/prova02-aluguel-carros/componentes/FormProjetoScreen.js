// componentes/FormProjetoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import useFirebase from '../hooks/useFirebase';

const FormProjetoScreen = ({ navigation, route }) => {
  const { collectionName } = route.params; // Recebe o nome da coleção ('projetos')

  console.log('[FormProjetoScreen] Recebeu a coleção:', collectionName);

  const { addData, loading } = useFirebase();

  const [tema, setTema] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSave = async () => {
    if (!tema.trim() || !descricao.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    try {
      await addData(collectionName, { tema, descricao, dataCadastro: new Date() });
      Alert.alert('Sucesso', 'Projeto salvo!');
      navigation.goBack(); // Volta para a lista
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o projeto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Projeto</Text>
      <TextInput style={styles.input} placeholder="Tema do Projeto" value={tema} onChangeText={setTema} />
      <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} multiline />
      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Salvar</Text>}
      </TouchableOpacity>
    </View>
  );
};

// Estilos podem ser os mesmos
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5'},
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'},
    input: { width: '100%', minHeight: 50, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, fontSize: 16 },
    button: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});

export default FormProjetoScreen;