import { initializeApp } from "firebase/app";
import {getAuth}from "firebase/auth";
import{getFirestore}from'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAKSAarGOZuJySOhK3d4Oi02v1lquBE9XY",
  authDomain: "fir-db-learning2gether.firebaseapp.com",
  projectId: "fir-db-learning2gether",
  storageBucket: "fir-db-learning2gether.firebasestorage.app",
  messagingSenderId: "570282889450",
  appId: "1:570282889450:web:9ee4a0f3d5905d93c28793"
};
// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db= getFirestore();

export{auth,db};
