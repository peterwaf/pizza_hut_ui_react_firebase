import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD8okOoZGD1IWumo34VrF7WzaLsuX6gHUo",
  authDomain: "pizzahut-ui.firebaseapp.com",
  projectId: "pizzahut-ui",
  storageBucket: "pizzahut-ui.appspot.com",
  messagingSenderId: "868855389965",
  appId: "1:868855389965:web:5a515bfa59025eac1f1a44"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)
const provider = new GoogleAuthProvider();

export {db,auth,storage,provider};