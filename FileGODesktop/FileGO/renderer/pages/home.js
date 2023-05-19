import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import { auth, googleProvider, db } from "../firebase";
import { useRouter } from "next/router";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" }); // Force account selection
      await auth.signInWithPopup(provider);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user ? (
        <p>Redirecting...</p>
      ) : (
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
}
