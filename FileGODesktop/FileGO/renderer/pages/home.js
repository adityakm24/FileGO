import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, googleProvider } from "../firebaseConfig";
import { useRouter } from "next/router";
import styles from "./styles/Home.module.css";
import firebase from "firebase/app";
import "firebase/database";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const database = firebase.database();
    const rootRef = database.ref();

    rootRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        console.log("Connected to the database");
      } else {
        console.log("Failed to connect to the database");
      }
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await auth.signInWithPopup(provider);

      const { uid, displayName, email, photoURL } = result.user;

      const timestamp = firebase.database.ServerValue.TIMESTAMP;

      const userSnapshot = await db.ref(`users/${uid}`).once("value");

      if (!userSnapshot.exists()) {
        await db.ref(`users/${uid}`).set({
          displayName,
          email,
          photoURL,
          createdOn: timestamp,
          lastLoggedIn: timestamp,
        });
      } else {
        await db.ref(`users/${uid}`).update({
          lastLoggedIn: timestamp,
        });
      }

      router.push("/dashboard"); // Redirect the user to the dashboard
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setIsDropdownOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      {!user && (
        <button className={styles.button} onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      )}
    </div>
  );
}
