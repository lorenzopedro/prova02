import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Importações atualizadas
import { signOut } from 'firebase/auth';
import auth from '../services/credenciaisFirebaseAuth';
import useFirebase from '../hooks/useFirebase';

const ListScreen = ({ navigation }) => {
  const { fetchUsers, loading } = useFirebase(); // Usando o hook
  const [rentals, setRentals] = useState([]);

  // useFocusEffect é um hook do React Navigation que roda toda vez
  // que o usuário entra nesta tela. Isso garante que a lista seja atualizada.
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        try {
          // A função do seu hook agora é a fonte dos dados
          const data = await fetchUsers();
          // NOTA: Seu hook usa a coleção 'pessoa'. Seus campos (carName, etc.)
          // parecem ser de aluguéis, então está tudo bem.
          setRentals(data);
        } catch (error) {
          console.error("Erro ao buscar aluguéis: ", error);
          Alert.alert("Erro", "Não foi possível carregar a lista de aluguéis.");
        }
      };
      
      loadData();
    }, [])
  );

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Logout', 'Ocorreu um erro ao sair.');
      });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Carregando aluguéis...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aluguéis Registrados</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={rentals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}><Text style={styles.bold}>Carro:</Text> {item.carName}</Text>
            <Text style={styles.itemText}><Text style={styles.bold}>Cliente:</Text> {item.clientName}</Text>
            <Text style={styles.itemText}><Text style={styles.bold}>Valor:</Text> R$ {item.rentValue ? item.rentValue.toFixed(2) : '0.00'}</Text>
            <Text style={styles.itemText}><Text style={styles.bold}>Data:</Text> {item.rentDate}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>Nenhum aluguel registrado.</Text>
          </View>
        }
      />
    </View>
  );
};

// ... (os styles permanecem os mesmos, com a adição do 'center')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutText: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  }
});

export default ListScreen;