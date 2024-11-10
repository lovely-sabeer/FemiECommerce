// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDpm8XM-K3qlI3pYZpKZyywOacb73BiWxY",
  authDomain: "trymyself-61f79.firebaseapp.com",
  projectId: "trymyself-61f79",
  storageBucket: "trymyself-61f79.firebasestorage.app",
  messagingSenderId: "354864548570",
  appId: "1:354864548570:web:e8dc748bc4098e90d873e3",
  measurementId: "G-ZQQL61K3V8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider=new GoogleAuthProvider()
export default auth;
export {auth, provider};

