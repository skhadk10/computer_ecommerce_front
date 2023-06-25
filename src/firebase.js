import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-2vDBqcEwC6MaXmC7gKzdChiaPlhh3z4",
  authDomain: "e-commerce-52a38.firebaseapp.com",
  projectId: "e-commerce-52a38",
  storageBucket: "e-commerce-52a38.appspot.com",
  messagingSenderId: "238482229044",
  appId: "1:238482229044:web:438864ca316cfff7090761"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 