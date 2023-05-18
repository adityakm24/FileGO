// renderer/home.js
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider, db } from "../firebase";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      const userRef = db.ref(`users/${user.uid}`);
      userRef.set({
        displayName: user.displayName,
        email: user.email,
      });
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      setErrorMessage("An error occurred during sign-in.");
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      setErrorMessage("An error occurred during sign-out.");
      console.error(error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>Sign up using:</p>
          <button onClick={handleGoogleSignIn}>Google</button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
}
