import { initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


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


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore();
const storage = getStorage();

export {auth, provider, app, db, storage};

