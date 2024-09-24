
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBOwUxDIRQ3PmsS6WRWzVsKTcMnL9yDcf8",
  authDomain: "ecommerce-dae1e.firebaseapp.com",
  projectId: "ecommerce-dae1e",
  storageBucket: "ecommerce-dae1e.appspot.com",
  messagingSenderId: "947397872422",
  appId: "1:947397872422:web:ce4206db1ec108e0c90fe7",
  measurementId: "G-V1K5TWYEYL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
