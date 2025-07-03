// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOJcoHobF3ynvVCMjL2keX0FHjOB4eQKw",
  authDomain: "reactjs-a4da5.firebaseapp.com",
  projectId: "reactjs-a4da5",
  storageBucket: "reactjs-a4da5.firebasestorage.app",
  messagingSenderId: "937507845214",
  appId: "1:937507845214:web:43f0f9037da38fb206f0cf",
  measurementId: "G-T0SBFL6QTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);