import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9nTEeLoUzkXWiG4laZMcH_pVq4iiG3LQ",
  authDomain: "afirmacjednia.firebaseapp.com",
  projectId: "afirmacjednia",
  storageBucket: "afirmacjednia.appspot.com",
  messagingSenderId: "1062435291258",
  appId: "1:1062435291258:web:87440614a09be560e6fbc3",
  measurementId: "G-1EFM349C23"
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs };