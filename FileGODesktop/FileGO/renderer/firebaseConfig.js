import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-T0tizFtocDcN6-OZePrhb8xc7QvzuRo",
  authDomain: "filego-2a55a.firebaseapp.com",
  databaseURL: "https://filego-2a55a-default-rtdb.firebaseio.com",
  projectId: "filego-2a55a",
  storageBucket: "filego-2a55a.appspot.com",
  messagingSenderId: "854746320681",
  appId: "1:854746320681:web:6fd07cce42ba1468fbf138",
  measurementId: "G-6BW5V4PLNM",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, db, googleProvider };
