// componentes/ListScreen.js

/*import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import auth from '../services/credenciaisFirebaseAuth';
import useFirebase from '../hooks/useFirebase';

const ListScreen = ({ navigation }) => {
  // O hook nos fornece a função de busca e o estado de loading
  const { fetchUsers, loading } = useFirebase(); 
  const [projetos, setProjetos] = useState([]);

  // Atualiza a lista sempre que a tela recebe o foco
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        try {
          // A função fetchUsers busca dados da coleção "pessoa"
          const data = await fetchUsers();
          setProjetos(data);
        } catch (error) {
          console.error("Erro ao buscar projetos: ", error);
          Alert.alert("Erro", "Não foi possível carregar a lista de projetos.");
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

  if (loading && projetos.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Carregando projetos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* ALTERAÇÃO: Novo título }
        <Text style={styles.title}>Projetos Cadastrados</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={projetos}
        keyExtractor={(item) => item.id}
        // ALTERAÇÃO: Renderização dos itens da lista para mostrar dados do projeto
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}><Text style={styles.bold}>Tema:</Text> {item.tema}</Text>
            <Text style={styles.itemText}><Text style={styles.bold}>Descrição:</Text> {item.descricao}</Text>
            <Text style={styles.itemText}><Text style={styles.bold}>Curso:</Text> {item.curso}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>Nenhum projeto registrado.</Text>
          </View>
        }
      />
    </View>
  );
};

// Estilos podem ser mantidos.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
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
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  }
});

export default ListScreen;*/

// componentes/ListScreen.js

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useFirebase from '../hooks/useFirebase';

const ListScreen = ({ navigation, route }) => {
  // Pega os parâmetros passados pelo Dashboard para saber o que buscar
  const { collectionName, title } = route.params;
  
  const { fetchData, loading } = useFirebase();
  const [items, setItems] = useState([]);

  // Hook que executa o código toda vez que a tela entra em foco
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        try {
          // Usa o collectionName ('projetos', 'cursos', etc.) para buscar os dados corretos
          const data = await fetchData(collectionName);
          setItems(data);
        } catch (error) {
          Alert.alert("Erro", `Não foi possível carregar ${title}.`);
        }
      };
      
      loadData();
    }, [collectionName]) // A lista é recarregada se o nome da coleção mudar
  );
  
  // Função que decide para qual formulário navegar baseado na coleção
  const handleAddNew = () => {
    let formScreenName = '';
    switch (collectionName) {
      case 'projetos':
        formScreenName = 'FormProjeto';
        break;
      case 'cursos':
        formScreenName = 'FormCurso';
        break;
      case 'alunos':
        formScreenName = 'FormAluno';
        break;
      default:
        Alert.alert("Erro", "Tipo de formulário não reconhecido.");
        return;
    }
    // Navega para a tela de formulário correta, passando o nome da coleção
    navigation.navigate(formScreenName, { collectionName });
  };
  
  // Componente que renderiza cada item da lista
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Mapeia e exibe todos os campos do documento, exceto o 'id' */}
      {Object.entries(item).map(([key, value]) => key !== 'id' && (
        <Text key={key} style={styles.itemText}>
          {/* Deixa a chave com a primeira letra maiúscula */}
          <Text style={styles.bold}>{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</Text> {String(value)}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Botão para adicionar um novo item, chama a função inteligente handleAddNew */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
        <Text style={styles.addButtonText}>Adicionar Novo {title}</Text>
      </TouchableOpacity>

      {/* Exibe um indicador de carregamento enquanto busca os dados */}
      {loading && items.length === 0 ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text>Nenhum item encontrado em {title}.</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

// Estilos para os componentes
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  addButton: { 
    backgroundColor: '#2ecc71', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 20 
  },
  addButtonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  itemContainer: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: '#ddd' 
  },
  itemText: { 
    fontSize: 16, 
    marginBottom: 4,
    color: '#333'
  },
  bold: { 
    fontWeight: 'bold',
    color: '#000'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  }
});

export default ListScreen;