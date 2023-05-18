import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyC-T0tizFtocDcN6-OZePrhb8xc7QvzuRo",
  authDomain: "filego-2a55a.firebaseapp.com",
  projectId: "filego-2a55a",
  storageBucket: "filego-2a55a.appspot.com",
  messagingSenderId: "854746320681",
  appId: "1:854746320681:web:6fd07cce42ba1468fbf138",
  measurementId: "G-6BW5V4PLNM",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app(); // If Firebase app is already initialized, reuse the existing instance
}

export const auth = app.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = app.database();
