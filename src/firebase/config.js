import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBATq9ks9SuSmT2fWt_Z7s70d68qz1dOOw",
  authDomain: "olx-app-6244c.firebaseapp.com",
  projectId: "olx-app-6244c",
  storageBucket: "olx-app-6244c.appspot.com",
  messagingSenderId: "355662449872",
  appId: "1:355662449872:web:98b39811855b50df1d22d5",
  measurementId: "G-PD6S215MZP"
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export {auth,db,storage}
