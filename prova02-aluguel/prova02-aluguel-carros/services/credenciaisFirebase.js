// src/services/credenciaisFirebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-fKi5F0qcSP6gU74ZwIkejGig8SMynUc",
  authDomain: "prova02-aluguel-carros-1cef3.firebaseapp.com",
  projectId: "prova02-aluguel-carros-1cef3",
  storageBucket: "prova02-aluguel-carros-1cef3.firebasestorage.app",
  messagingSenderId: "1019560013609",
  appId: "1:1019560013609:web:c89c7bf0a85f7b22791138"
};

// Inicializa o App
const appFirebase = initializeApp(firebaseConfig);

// **NOVO**: inicializa e exporta o Firestore
export const db = getFirestore(appFirebase);

// Mantém export default do App (útil caso queira)
export default appFirebase;