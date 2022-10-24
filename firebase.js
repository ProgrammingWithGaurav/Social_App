import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCn_AIoIGDpuoROIe3Ba8li33heu4FQ0Rw",
  authDomain: "nextjsapps-366215.firebaseapp.com",
  projectId: "nextjsapps-366215",
  storageBucket: "nextjsapps-366215.appspot.com",
  messagingSenderId: "895482855029",
  appId: "1:895482855029:web:4aeffc1b8c74ac057d823c",
  measurementId: "G-EZQJW34W4D"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};