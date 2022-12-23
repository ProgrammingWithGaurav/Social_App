// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "reactprojects-12bbe.firebaseapp.com",
  databaseURL: "https://reactprojects-12bbe-default-rtdb.firebaseio.com",
  projectId: "reactprojects-12bbe",
  storageBucket: "reactprojects-12bbe.appspot.com",
  messagingSenderId: "742066518833",
  appId: "1:742066518833:web:3888ed6e037d5e279d4e10",
  measurementId: "G-04G000B98R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);