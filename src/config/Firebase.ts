// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATG_xKFAwdrctX_4kJtWvLQ8ufZxYQ3xk",
  authDomain: "social-media-c6d85.firebaseapp.com",
  projectId: "social-media-c6d85",
  storageBucket: "social-media-c6d85.appspot.com",
  messagingSenderId: "304073299033",
  appId: "1:304073299033:web:ee1bca315a343c2a884d48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth(app);
export const provider= new GoogleAuthProvider();
export const db= getFirestore(app);