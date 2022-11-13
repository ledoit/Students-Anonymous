// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBITNoj6QfTnW2mumukkj0Be3rwD0LF0g4",
  authDomain: "bhacks2022table52.firebaseapp.com",
  databaseURL: "https://bhacks2022table52.firebaseio.com",
  projectId: "bhacks2022table52",
  storageBucket: "bhacks2022table52.appspot.com",
  messagingSenderId: "976236952823",
  appId: "1:976236952823:web:92d1745f3be2be079b67f2",
  measurementId: "G-CNRRYVNCVH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {
  db,
  auth,
  storage
};
