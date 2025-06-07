import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// Importações atualizadas
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import auth from '../services/credenciaisFirebaseAuth'; // Nosso novo serviço

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // A sintaxe da função muda um pouco
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // A função updateProfile também muda
        updateProfile(userCredential.user, {
          displayName: name,
        }).then(() => {
           Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
            { text: 'OK', onPress: () => navigation.navigate('Login') },
          ]);
        });
      })
      .catch(error => {
        let errorMessage = 'Ocorreu um erro ao cadastrar.';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Este e-mail já está em uso.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'O formato do e-mail é inválido.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'A senha deve ter no mínimo 6 caracteres.';
        }
        console.error(error);
        Alert.alert('Erro no Cadastro', errorMessage);
      });
  };

  // ... (o resto do código com a View e os Styles permanece o mesmo)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua Conta</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#888"
      />
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha (mínimo 6 caracteres)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
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
    backgroundColor: '#3498db',
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
});

export default RegisterScreen;