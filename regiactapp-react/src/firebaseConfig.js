// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2h601M9xXW2cxWpQTFHSN430eGWc9btA",
  authDomain: "regiactapp.firebaseapp.com",
  projectId: "regiactapp",
  storageBucket: "regiactapp.appspot.com",
  messagingSenderId: "737339124671",
  appId: "1:737339124671:web:9c3d27506b32eb12e78f0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };