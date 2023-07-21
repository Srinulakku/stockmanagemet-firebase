// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDG7Wx96PjrA508eXbcLQU195SOyX6QsbQ",
  authDomain: "stock-cred.firebaseapp.com",
  projectId: "stock-cred",
  storageBucket: "stock-cred.appspot.com",
  messagingSenderId: "564319192211",
  appId: "1:564319192211:web:ca3fa4176ca70d292a3966"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth()