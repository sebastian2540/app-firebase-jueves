import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBv4MyP2lTIl1CkKwWdoHAJqjgkVeLZtLU",
  authDomain: "app-firebase-d0d5e.firebaseapp.com",
  projectId: "app-firebase-d0d5e",
  storageBucket: "app-firebase-d0d5e.appspot.com",
  messagingSenderId: "813769172898",
  appId: "1:813769172898:web:14724fc3eb48863c1e34fb",
};

const app = initializeApp(firebaseConfig);

// Conexión a la base de datos
export const connDatabases = getFirestore(app);
export const initStorage = getStorage(app);
export const initAuth = getAuth(app);
