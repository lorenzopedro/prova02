import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ListScreen = ({ navigation }) => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('rentals')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const rentalsData = [];
        querySnapshot.forEach(documentSnapshot => {
          rentalsData.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setRentals(rentalsData);
        setLoading(false);
      });

    // Encerra a escuta quando o componente é desmontado
    return () => subscriber();
  }, []);

  const handleLogout = () => {
    auth()
      .signOut()
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
      <View style={styles.container}>
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
            <Text style={styles.itemText}><Text style={styles.bold}>Valor:</Text> R$ {item.rentValue.toFixed(2)}</Text>
            <Text style={styles.itemText}><Text style={styles.bold}>Data:</Text> {item.rentDate}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum aluguel registrado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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