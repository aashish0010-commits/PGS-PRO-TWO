import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdeBdwgiLV6cK3KVB4iNcxL74J1zgQIHo",
  authDomain: "smart-care-connect.firebaseapp.com",
  projectId: "smart-care-connect",
  storageBucket: "smart-care-connect.appspot.com", // Corrected value
  messagingSenderId: "206081517185",
  appId: "1:206081517185:web:d69f390d5b5abdab164f80",
  measurementId: "G-973LSW95H4",
};

const app = initializeApp(firebaseConfig); // Initialize Firebase app

const auth = getAuth(app); // Get Firebase Auth
const db = getFirestore(app); // Get Firestore
const storage = getStorage(app); // Get Firebase Storage

export { auth, db, storage };
