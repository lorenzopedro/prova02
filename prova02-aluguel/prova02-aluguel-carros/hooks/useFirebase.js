/*import { useState } from 'react';
import { collection, addDoc, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../services/credenciaisFirebase';

const useFirebase = () => {
  const [loading, setLoading] = useState(false);

  const addUser = async (data) => {
    setLoading(true);
    try { 
      await addDoc(collection(db, 'pessoa'), data);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, 'pessoa'));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, 'pessoa', id));
  };

  const getUserById = async (id) => {
    const document = await getDoc(doc(db, 'pessoa', id));
    return document.data();
  };

  return { addUser, fetchUsers, deleteUser, getUserById, loading };
};

export default useFirebase;*/

// hooks/useFirebase.js

import { useState } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../services/credenciaisFirebase';

// O hook agora é um gerenciador de coleções genérico
const useFirebase = () => {
  const [loading, setLoading] = useState(false);

  /**
   * Função genérica para adicionar um documento a qualquer coleção.
   * @param {string} collectionName - O nome da coleção (ex: 'projetos', 'cursos').
   * @param {object} data - O objeto com os dados a serem salvos.
   */
  const addData = async (collectionName, data) => {
    setLoading(true);
    try {
      // Usa o collectionName para saber onde salvar
      const docRef = await addDoc(collection(db, collectionName), data);
      console.log('Documento escrito com ID: ', docRef.id);
      setLoading(false);
      return docRef.id;
    } catch (e) {
      console.error('Erro ao adicionar documento: ', e);
      setLoading(false);
      throw e;
    }
  };

  /**
   * Função genérica para buscar todos os documentos de qualquer coleção.
   * @param {string} collectionName - O nome da coleção a ser buscada.
   */
  const fetchData = async (collectionName) => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const dataList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLoading(false);
      return dataList;
    } catch (e) {
      console.error('Erro ao buscar documentos: ', e);
      setLoading(false);
      throw e;
    }
  };

  // Futuramente, para implementar o CRUD completo, você adicionaria estas funções:
  /*
  const updateData = async (collectionName, id, data) => {
    setLoading(true);
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
      setLoading(false);
    } catch (e) {
      console.error("Erro ao atualizar documento: ", e);
      setLoading(false);
      throw e;
    }
  };

  const deleteData = async (collectionName, id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, collectionName, id));
      setLoading(false);
    } catch (e) {
      console.error("Erro ao deletar documento: ", e);
      setLoading(false);
      throw e;
    }
  };
  */

  return { loading, addData, fetchData };
};

export default useFirebase;
