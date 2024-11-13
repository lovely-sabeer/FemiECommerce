import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpm8XM-K3qlI3pYZpKZyywOacb73BiWxY",
  authDomain: "trymyself-61f79.firebaseapp.com",
  projectId: "trymyself-61f79",
  storageBucket: "trymyself-61f79.firebasestorage.app",
  messagingSenderId: "354864548570",
  appId: "1:354864548570:web:e8dc748bc4098e90d873e3",
  measurementId: "G-ZQQL61K3V8"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);