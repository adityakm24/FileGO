import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/home");
    }
  }, [user, router]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push("/home");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>User: {user && user.displayName}</p>
      <button onClick={handleSignOut}>Sign Out</button>
      <Link href="/home">
        <a>Go to Home</a>
      </Link>
    </div>
  );
}
