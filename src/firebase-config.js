// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";  // Corrected import statement
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBKZYoT90xN9h1VtIfjj30TjiMgt6Jrp9I",
  authDomain: "e-book2024.firebaseapp.com",
  projectId: "e-book2024",
  storageBucket: "e-book2024.appspot.com",
  messagingSenderId: "214330583585",
  appId: "1:214330583585:web:1f6210fc8549a08fa25160"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export { db, storage}; 

