// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCbxm6xGwX9Wp59zkmGKKdnY4f5IgUplSo",
  authDomain: "learnbasic-2a4af.firebaseapp.com",
  projectId: "learnbasic-2a4af",
  storageBucket: "learnbasic-2a4af.appspot.com",
  messagingSenderId: "1034239554357",
  appId: "1:1034239554357:web:5aafba97c5e052d215527c",
  measurementId: "G-Y007N1DGVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider=new GoogleAuthProvider()
export default auth;
export {auth, provider};

