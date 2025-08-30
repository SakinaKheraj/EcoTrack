import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBP2gUIVb761WA8SPvdGCv7GuCHDjHJT6o",
  authDomain: "ecotrack-99c44.firebaseapp.com",
  projectId: "ecotrack-99c44",
  storageBucket: "ecotrack-99c44.firebasestorage.app",
  messagingSenderId: "953322620510",
  appId: "1:953322620510:web:487be46dfb62c84f2396cf",
  measurementId: "G-VYS9RZRWLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);