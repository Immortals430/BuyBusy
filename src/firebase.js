// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdJG9k8QZaOPWn-iWnZz1U1vvJlhl8M2U",
  authDomain: "buy-busy-1a7a7.firebaseapp.com",
  projectId: "buy-busy-1a7a7",
  storageBucket: "buy-busy-1a7a7.appspot.com",
  messagingSenderId: "230708527946",
  appId: "1:230708527946:web:9a4a5db2ce6977d1b937b3",
  measurementId: "G-L7RT9N0T8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
