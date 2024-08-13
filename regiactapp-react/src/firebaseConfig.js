// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDlCVJr4dXfL_kldpAQw_Y5tJgk4Fk3Ng",
  authDomain: "regiactapp-48209.firebaseapp.com",
  projectId: "regiactapp-48209",
  storageBucket: "regiactapp-48209.appspot.com",
  messagingSenderId: "452830201142",
  appId: "1:452830201142:web:af0d9c2aef1fa043979f97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };